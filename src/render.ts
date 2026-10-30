import fs from 'fs';
import Metalsmith from 'metalsmith';
import chalk from 'chalk';
import ejs from 'ejs';
import path from 'path';
import prompts, { PromptObject } from 'prompts';
import user from './git-user';
import * as Config from './config';

export interface ArgvType {
  c: boolean;
  y: boolean;
  n?: string;
  a?: string;
  d?: string;
  projectDirectory: string;
}

function resolveDefaultValues(argv: ArgvType, fallbackDesc: string) {
  const skipPrompt = !!argv.y;
  return {
    skipPrompt,
    defaults: {
      name: argv.n ?? argv.projectDirectory,
      author: argv.a ?? (skipPrompt ? 'CI Bot' : user()),
      description: argv.d ?? fallbackDesc,
    },
  };
}

export default async (argv: ArgvType) => {
  const { projectDirectory } = argv;
  const templatePath = Config.templatePath;
  const fallbackDesc = Config.description;
  const destPath = path.join(process.cwd(), projectDirectory);

  if (fs.existsSync(destPath)) {
    console.log(chalk.red('此项目已存在，请变更名字后重试'));
    process.exit(1);
  }

  const { skipPrompt, defaults } = resolveDefaultValues(argv, fallbackDesc);

  if (skipPrompt) {
    console.log(chalk.gray(`[CI mode] Using defaults: name=${defaults.name}`));
  }

  Metalsmith(process.cwd())
    .metadata({
      name: projectDirectory,
      description: fallbackDesc,
    })
    .source(templatePath)
    .destination(destPath)
    .clean(false)
    .use(
      ask(
        [
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
            initial: fallbackDesc,
            type: 'text',
          },
        ],
        skipPrompt,
        defaults,
      ),
    )
    .use(renderTemplateFiles())
    .build((err: Error) => {
      if (!err) {
        const cd = chalk.cyan(` cd ${projectDirectory} && pnpm install`);
        const commands = [
          {
            command: chalk.cyan('pnpm dev'),
            description: '启动开发模式（监听源码变化）',
          },
          { command: chalk.cyan('pnpm build'), description: '构建生产版本' },
          { command: chalk.cyan('pnpm clean'), description: '清理 dist 目录' },
        ].map((item) => ` ${item.command} \t\n\t\n  ${item.description}`);

        console.log('\t');
        console.log(`创建 ${chalk.cyan('Rsmax 微信小程序')} 成功！`);
        console.log(
          `\t\n你可以进入 ${chalk.cyanBright(projectDirectory)} 执行以下命令: \t\n\t\n${cd}\t\n\t\n  进入项目目录并安装依赖\t\n\t\n${commands.join('\t\n\t\n')}`,
        );
        console.log(
          '\t\n随后用微信开发者工具打开项目根目录即可预览（根目录指向 dist/）。',
        );
      }
    });
};

const ask = (
  list: PromptObject[],
  skipPrompt: boolean,
  defaults: Record<string, any>,
) => {
  return async (_: any, metalsmith: any, done: any) => {
    const metadata = metalsmith.metadata();
    Object.keys(defaults).forEach((k) => {
      if (defaults[k] !== undefined) {
        metadata[k] = defaults[k];
      }
    });

    if (skipPrompt) {
      done();
      return;
    }

    const filteredList = list.filter((p) => {
      const promptName = (p as any).name;
      return defaults[promptName] === undefined;
    });

    if (filteredList.length === 0) {
      done();
      return;
    }

    const data = await prompts(filteredList);
    Object.keys(data).forEach((k) => {
      metadata[k] = data[k];
    });
    done();
  };
};

const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.ico',
  '.webp',
  '.bmp',
  '.svg',
  '.mp3',
  '.mp4',
  '.wav',
  '.ogg',
  '.avi',
  '.mov',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.otf',
  '.pdf',
  '.zip',
  '.tar',
  '.gz',
  '.rar',
  '.7z',
  '.exe',
  '.dll',
  '.so',
  '.dylib',
  '.bin',
]);

function isBinaryFile(filepath: string): boolean {
  const ext = path.extname(filepath).toLowerCase();
  return BINARY_EXTENSIONS.has(ext);
}

const renderTemplateFiles = () => {
  return (files: any, metalsmith: any, done: () => void) => {
    const keys = Object.keys(files);
    const metalsmithMetadata = metalsmith.metadata();
    Promise.all(
      keys.map((file) => {
        if (isBinaryFile(file)) {
          return;
        }
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
