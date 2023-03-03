# get my issues via jira-cli
ISSUES=$(jira issue list -q"status in ('Selected For Development', 'In Progress')" -a$(jira me) --plain)
# split by new lines
IFS=$'\n'; ALL_ROWS=($ISSUES)
# remove first line (is headers)
ROWS=("${ALL_ROWS[@]:1}")

# rewrite to [VKT-XXX]name format
CLEANED_ROWS=()
for row in $ROWS; do
  IFS=$'\t'; PARTS=($row)
  CLEANED_ROWS+=("[${PARTS[1]}]${PARTS[2]}")
done

select row in $CLEANED_ROWS
do
  # split on ]
  IFS=$']'; PARTS=($row)

  # get ticket number without "]"
  TICKET="${PARTS[0]//[}"

  # prompt for branch name after VKT-XXX/
  read -p "git switch -c $TICKET/" NAME

  # create git branch with nicely formatted name
  git switch -c "$TICKET/$NAME"
  exit;
done
