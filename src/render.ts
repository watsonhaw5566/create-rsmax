import fs from 'fs';
import Metalsmith from 'metalsmith';
import chalk from 'chalk';
import ejs from 'ejs';
import path from 'path';
import prompts, { PromptObject } from 'prompts';
import user from './git-user';
import * as Config from './config';

export interface ArgvType {
  projectDirectory: string;
  check: boolean;
}

export default async ({ projectDirectory }: ArgvType) => {
  const templatePath = path.join(Config.templatesPath, Config.templateDir);
  const destPath = path.join(process.cwd(), projectDirectory);

  if (fs.existsSync(destPath)) {
    console.log(chalk.red('此项目已存在，请变更名字后重试'));
    return;
  }

  Metalsmith(process.cwd())
    .metadata({
      name: projectDirectory,
      description: Config.description,
    })
    .source(templatePath)
    .destination(destPath)
    .clean(false)
    .use(
      ask([
        {
          name: 'name',
          message: 'name',
          initial: projectDirectory,
          type: 'text',
        },
        {
          name: 'author',
          message: 'author',
          initial: user(),
          type: 'text',
        },
        {
          name: 'description',
          message: 'description',
          initial: Config.description,
          type: 'text',
        },
      ]),
    )
    .use(renderTemplateFiles())
    .use(generatorOutputInfo())
    .build((err: Error) => {
      if (!err) {
        const cd = chalk.cyan(`cd ${projectDirectory} && npm install`);
        const devCommand = chalk.cyan('npm run dev');
        const buildCommand = chalk.cyan('npm run build');
        console.log('\t');
        console.log(chalk.green(`创建微信小程序项目成功！`));
        console.log('\t');
        console.log(
          `你可以进入 ${chalk.cyanBright(projectDirectory)} 执行以下命令:`,
        );
        console.log('\t');
        console.log(`  ${cd}`);
        console.log('    进入项目目录并安装依赖');
        console.log('\t');
        console.log(`  ${devCommand}`);
        console.log('    启动开发模式（监听文件变化）');
        console.log('\t');
        console.log(`  ${buildCommand}`);
        console.log('    构建生产版本');
        console.log('\t');
        console.log(
          '然后使用微信开发者工具打开项目目录，dist 为编译输出目录。',
        );
      }
    });
};

const generatorOutputInfo = () => {
  return (_: any, metalsmith: any, done: () => void): void => {
    done();
  };
};

const ask = (list: PromptObject[]) => {
  return async (_: any, metalsmith: any, done: any) => {
    const data = await prompts(list);
    Object.keys(data).forEach((k) => {
      metalsmith.metadata()[k] = data[k];
    });
    done();
  };
};

const renderTemplateFiles = () => {
  return (files: any, metalsmith: any, done: () => void) => {
    const keys = Object.keys(files);
    const metalsmithMetadata = metalsmith.metadata();
    Promise.all(
      keys.map((file) => {
        const str = files[file].contents.toString();
        try {
          const res = ejs.render(str, metalsmithMetadata);
          files[file].contents = Buffer.from(res, 'utf-8');
        } catch (err) {
          (err as Error).message = `[${file}] ${(err as Error).message}`;
          throw err;
        }
      }),
    )
      .then(() => done())
      .catch(done);
  };
};
