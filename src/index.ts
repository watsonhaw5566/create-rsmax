import { cac } from 'cac';
import chalk from 'chalk';
import { checkCurrentRepoVersion } from './check-version';
import render from './render';

const { version, name: scriptName } = require('../package.json');
const placeholder = 'project-directory';

export function run(args: string[]) {
  const cli = cac(scriptName);

  cli.usage(`<${placeholder}> [options]`);
  cli.option('-c, --check', 'ignore version check', { default: true });
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

  create(projectDirectory, parsed.options as { check: boolean });
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

function create(projectDirectory: string, options: { check: boolean }) {
  if (options.check) {
    try {
      checkCurrentRepoVersion(scriptName);
    } catch {}
  }

  render({ projectDirectory, check: options.check });
}
