import cli from 'yargs';
import chalk from 'chalk';
import { checkCurrentRepoVersion } from './check-version';
import render, { ArgvType } from './render';

const scriptName = require('../package.json').name;
const placeholder = 'project-directory';

export function run(args: string[]) {
  cli
    .scriptName(scriptName)
    .usage<any>(
      `$0 <${placeholder}> [options]`,
      '创建 rsmax 项目',
      (yargs) => {
        return yargs.positional(placeholder, {
          describe: '项目目录',
          type: 'string',
        });
      },
      create,
    )
    .option('h', { alias: 'help' })
    .option('v', { alias: 'version' })
    .option('t', {
      alias: 'typescript',
      default: false,
      describe: 'create rsmax typescript app',
      type: 'boolean',
    })
    .option('c', {
      alias: 'check',
      default: true,
      describe: 'enable npm version check',
      type: 'boolean',
    })
    .option('y', {
      alias: 'yes',
      default: false,
      describe: 'skip interactive prompts and use default values (for CI)',
      type: 'boolean',
    })
    .option('n', {
      alias: 'name',
      describe: 'project name (defaults to project-directory)',
      type: 'string',
    })
    .option('a', {
      alias: 'author',
      describe: 'project author (defaults to git user)',
      type: 'string',
    })
    .option('d', {
      alias: 'description',
      describe: 'project description',
      type: 'string',
    })
    .option('p', {
      alias: 'platform',
      describe:
        'target platform: wechat | toutiao | ali | one (defaults to wechat when using -y)',
      type: 'string',
    })
    .fail((msg: string, err: Error) => {
      if (err) throw err;
      console.error('Please specify the project directory:');
      console.error(
        '  ',
        chalk.blue(scriptName),
        chalk.green(`<${placeholder}>`),
      );
      console.error('\t');
      console.error('For example:');
      console.error(
        '  ',
        chalk.blue(scriptName),
        chalk.green('first-rsmax-app'),
      );
      console.error('\t');
      console.error(
        'Run',
        chalk.blue(`${scriptName} --help`),
        'to see all options.',
      );
      process.exit(1);
    })
    .parse(args);
}

function create(argv: ArgvType) {
  if (argv.check) {
    try {
      checkCurrentRepoVersion(scriptName);
    } catch {}
  }

  render(argv);
}
