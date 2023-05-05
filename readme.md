# Jira!

## Vad är det här då?

Låter dig välja en av de jira-issues du är assignad på, och skapar en branch på formen `ticketnummer/namn-du-valjer-sjalv`. För att du ska slippa leta upp ticketnummer själv. Använder sig av https://github.com/ankitpokhrel/jira-cli för att anropa jiras api.

## Instruktioner

1. Installera [jira-cli](https://github.com/ankitpokhrel/jira-cli) via homebrew, se instruktioner: https://github.com/ankitpokhrel/jira-cli/wiki/Installation#homebrew
   1. Konfigurera paketet enligt instruktionerna: https://github.com/ankitpokhrel/jira-cli#getting-started
2. Kör `yarn`/`npm` i den här foldern.
3. Nu bör du kunna köra `node jira.js`
4. För extra smidighet, lägg till ett alias in din `.bashrc` / `.zshrc`
   1. `alias gitcreate="node ~/path/till/denna/foldern/jira.js"`
   2. Nu kan du köra `gitcreate` varsomhelst i din terminal
