const util = require("util");
const exec = util.promisify(require("child_process").exec);
const inquirer = require("inquirer");

const toTicket = (line) => {
  const parts = line.split("\t").filter(Boolean);
  const [type, id, title, status] = parts;
  return {
    type,
    id,
    title,
    status,
  };
};

const toTicketChoice = ({ id, title }) => `[${id}] ${title}`;

const removeHeader = (lines) => [...lines.slice(1)].filter(Boolean);
const getTicketId = (answer) => answer.ticket.split("]")[0].substr(1);

const main = async () => {
  try {
    const { stdout } = await exec(
      "jira issue list -q\"status in ('Selected For Development', 'In Progress')\" -a$(jira me) --plain"
    );
    const allLines = stdout.split("\n");
    const lines = removeHeader(allLines);
    const tickets = lines.map(toTicket);

    const ticketChoice = await inquirer.prompt([
      {
        type: "list",
        name: "ticket",
        message: "Välj en ticket!?",
        choices: tickets.map(toTicketChoice),
      },
    ]);

    const id = getTicketId(ticketChoice);

    const branchName = await inquirer.prompt([
      {
        type: "input",
        name: "branch",
        message: `git switch -c ${id}/`,
      },
    ]);

    await exec(`git switch -c ${id}/${branchName.branch}`);
  } catch (error) {
    if (error?.stderr?.includes("No result found")) {
      return console.log("Du är inte assignad på någon ticket.");
    }
    throw new Error(error);
  }
};

main();
