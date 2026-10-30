import { cac } from 'cac';
import chalk from 'chalk';
import { checkCurrentRepoVersion } from './check-version';
import render, { ArgvType } from './render';

const { version, name: scriptName } = require('../package.json');
const placeholder = 'project-directory';

export function run(args: string[]) {
  const cli = cac(scriptName);

  cli.usage(`<${placeholder}> [options]`);
  cli.option('-c, --check', 'enable npm version check', { default: true });
  cli.option(
    '-y, --yes',
    'skip interactive prompts and use default values (for CI)',
    {
      default: false,
    },
  );
  cli.option(
    '-n, --name <name>',
    'project name (defaults to project-directory)',
  );
  cli.option('-a, --author <author>', 'project author (defaults to git user)');
  cli.option('-d, --description <description>', 'project description');
  cli.help();
  cli.version(version);

  // cac.parse 内部使用 argv.slice(2)，需要模拟完整的 process.argv 格式
  // { run: false } 阻止自动执行命令 action，但 help/version 仍会自动输出
  const parsed = cli.parse(['', '', ...args], { run: false });

  // help 和 version 已由 cac 在 parse 中自动输出
  if (parsed.options.help || parsed.options.version) {
    return;
  }

  const projectDirectory = parsed.args[0];

  if (!projectDirectory) {
    printMissingDirError();
    process.exit(1);
  }

  create({
    projectDirectory,
    c: parsed.options.check,
    y: parsed.options.yes,
    n: parsed.options.name,
    a: parsed.options.author,
    d: parsed.options.description,
  } as ArgvType);
}

function printMissingDirError() {
  console.error('Please specify the project directory:');
  console.error('  ', chalk.blue(scriptName), chalk.green(`<${placeholder}>`));
  console.error('\t');
  console.error('For example:');
  console.error('  ', chalk.blue(scriptName), chalk.green('first-rsmax-app'));
  console.error('\t');
  console.error(
    'Run',
    chalk.blue(`${scriptName} --help`),
    'to see all options.',
  );
}

function create(argv: ArgvType) {
  if (argv.c) {
    try {
      checkCurrentRepoVersion(scriptName);
    } catch {}
  }

  render(argv);
}
