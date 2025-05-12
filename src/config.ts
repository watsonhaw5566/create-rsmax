import path from 'path';
import { Choice } from 'prompts';

export const description = 'Rsmax Project';
export const descriptionTS = 'Rsmax Project With TypeScript';
export const templatesPath = path.join(__dirname, '..', 'templates');
export const templateDir = 'template';
export const choices: Choice[] = [
  { value: 'wechat', title: '微信小程序' },
  { value: 'toutiao', title: '头条小程序' },
  // { value: 'xhs', title: '小红书小程序(未完成)' },
  { value: 'ali', title: '阿里小程序' },
  { value: 'one', title: '跨平台小程序' },
];
