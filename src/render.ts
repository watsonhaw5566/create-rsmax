import fs from 'fs';
import Metalsmith from 'metalsmith';
import chalk from 'chalk';
import ejs from 'ejs';
import path from 'path';
import type { Arguments } from 'yargs';
import prompts, { PromptObject } from 'prompts';
import user from './git-user';
import * as Config from './config';

export interface ArgvType extends Arguments {
  t: boolean;
  c: boolean;
  y: boolean;
  n?: string;
  a?: string;
  d?: string;
  p?: string;
  projectDirectory: string;
}

let currentPlatformName = '';
let currentPlatform = '';

function getConfig(isTS: boolean) {
  if (isTS) {
    return {
      description: Config.descriptionTS,
      templatePath: path.join(Config.templatesPath, 'ts', Config.templateDir),
    };
  }

  return {
    description: Config.description,
    templatePath: path.join(Config.templatesPath, 'js', Config.templateDir),
  };
}

const DEFAULT_PLATFORM = 'wechat';

function resolveDefaultValues(argv: ArgvType, fallbackDesc: string) {
  const skipPrompt = !!argv.y;
  return {
    skipPrompt,
    defaults: {
      name: argv.n ?? projectDirectoryFromArgv(argv),
      author: argv.a ?? (skipPrompt ? 'CI Bot' : user()),
      description: argv.d ?? fallbackDesc,
      platform: argv.p ?? (skipPrompt ? DEFAULT_PLATFORM : undefined),
    },
  };
}

function projectDirectoryFromArgv(argv: ArgvType): string {
  return argv.projectDirectory;
}

export default async (argv: ArgvType) => {
  const { projectDirectory, t } = argv;
  const { templatePath, description: fallbackDesc } = getConfig(t);
  const destPath = path.join(process.cwd(), projectDirectory);

  if (fs.existsSync(destPath)) {
    console.log(chalk.red('此项目已存在，请变更名字后重试'));
    process.exit(1);
  }

  const { skipPrompt, defaults } = resolveDefaultValues(argv, fallbackDesc);

  if (skipPrompt) {
    console.log(
      chalk.gray(
        `[CI mode] Using defaults: name=${defaults.name}, platform=${defaults.platform}`,
      ),
    );
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
          {
            name: 'platform',
            message: 'platform',
            type: 'select',
            choices: Config.choices,
          },
        ],
        skipPrompt,
        defaults,
      ),
    )
    .use(filterPlatform())
    .use(renderTemplateFiles())
    .use(removeFile())
    .use(generatorOutputInfo())
    .build((err: Error) => {
      if (!err) {
        const cd = chalk.cyan(` cd ${projectDirectory} && npm i`);
        const platformList = chalk.yellow('ali, wechat, toutiao, xhs, web');
        const oneCommandArray = [
          {
            command: chalk.cyan('npm run dev <platform>'),
            description: `根据传入平台进行调试，支持参数为: ${platformList}`,
          },
          {
            command: chalk.cyan('npm run dev ali'),
            description: '调试阿里小程序',
          },
          {
            command: chalk.cyan('npm run build <platform>'),
            description: `根据传入平台构建小程序，支持参数为: ${platformList}`,
          },
          {
            command: chalk.cyan('npm run build ali'),
            description: '构建阿里小程序',
          },
        ];
        const otherCommandArray = [
          {
            command: chalk.cyan('npm run dev'),
            description: `调试${currentPlatformName}`,
          },
          {
            command: chalk.cyan('npm run build'),
            description: `构建${currentPlatformName}`,
          },
        ];
        const newCommandArray = oneCommandArray.map((item) => {
          return ` ${item.command} \t\n\t\n  ${item.description}`;
        });
        const newOtherCommandArray = otherCommandArray.map((item) => {
          return ` ${item.command} \t\n\t\n  ${item.description}`;
        });
        const oneCommandInfo = `\t\n你可以进入 ${chalk.cyanBright(projectDirectory)} 执行以下命令: \t\n\t\n${cd}\t\n\t\n  进入项目目录并安装依赖\t\n\t\n${newCommandArray.join('\t\n\t\n')}`;
        const otherCommandInfo = `\t\n你可以进入 ${chalk.cyanBright(projectDirectory)} 执行以下命令: \t\n\t\n${cd}\t\n\t\n  进入项目目录并安装依赖\t\n\t\n${newOtherCommandArray.join('\t\n\t\n')}`;
        const currentCommandInfo =
          currentPlatform === 'one' ? oneCommandInfo : otherCommandInfo;
        console.log('\t');
        console.log(`创建 ${chalk.cyan(currentPlatformName)} 成功！`);
        console.log(currentCommandInfo);
        console.log(
          '\t\n欲了解更多请查阅官方文档：https://remaxjs.wdchiphop.cn/',
        );
      }
    });
};

const generatorOutputInfo = () => {
  return (_: any, metalsmith: any, done: () => void): void => {
    const { platform } = metalsmith._metadata;
    Config.choices.some((item: any) => {
      if (item.value === platform) {
        currentPlatformName = item.title;
        currentPlatform = item.value;
        return;
      }
    });
    done();
  };
};

const filterPlatform = () => {
  return (_: any, metalsmith: any, done: () => void): void => {
    const { platform } = metalsmith._metadata;
    metalsmith._metadata.platformTitle =
      platform[0].toUpperCase() + platform.slice(1).toLowerCase();
    Config.choices.forEach((item: any) => {
      metalsmith._metadata[item.value] = item.value === platform;
    });
    done();
  };
};

const removeFile = () => {
  const filesToRemove: Record<string, string[]> = {
    'mini.project.json': ['wechat', 'toutiao', 'xhs'],
    'project.config.json': ['ali'],
  };

  return (
    files: Record<string, any>,
    metalsmith: any,
    done: () => void,
  ): void => {
    const { platform } = metalsmith._metadata;
    for (const file of Object.keys(files)) {
      if (filesToRemove[file]?.includes(platform)) {
        delete files[file];
      }
    }
    done();
  };
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
