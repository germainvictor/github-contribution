#!/usr/bin/env node

const program = require('commander');
const fetchContributors = require('../src');

program
  .option('-o, --owner <string>', 'The owner of the repository', null)
  .option('-n, --name <string>', 'The name of the repository', null)
  .option('-t, --top-contributors-limit <int>', 'Return the top X users', -1)
  .parse(process.argv);

const { owner, name, topContributorsLimit } = program;

if (!owner || !name) {
  process.stderr.write('You must provide an owner and a repository name!');
  process.exit(1);
}

fetchContributors(owner, name, topContributorsLimit).then(result => process.stdout.write(`${JSON.stringify(result, null, 2)}\n`));
