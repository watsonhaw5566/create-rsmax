<% if (one) { -%>
const pages = ['pages/index/index'];
const color = '#282c34';

import type { AppConfig as WechatAppConfig } from 'rsmax/wechat';
import type { AppConfig as AliAppConfig } from 'rsmax/ali';
import type { AppConfig as ToutiaoAppConfig } from 'rsmax/toutiao';
import type{ AppConfig as WebAppConfig } from 'rsmax/web';

export const wechat: WechatAppConfig = {
  pages,
  window: {
    navigationBarBackgroundColor: color,
    navigationBarTitleText: 'Rsmax One Wechat',
  },
};

export const ali: AliAppConfig = {
  pages,
  window: {
    defaultTitle: 'Rsmax One Ali',
    titleBarColor: color,
  },
};

export const toutiao: ToutiaoAppConfig = {
  pages,
  window: {
    navigationBarTitleText: 'Rsmax One Toutiao',
    navigationBarBackgroundColor: color,
  },
};

export const web: WebAppConfig = {
  pages,
  window: {
    defaultTitle: 'Rsmax One Web',
  },
};
<% } else { -%>
import { AppConfig } from "rsmax/<%= platform %>";

const config: AppConfig = {
  pages: ['pages/index/index'],
  window: {
    navigationBarTitleText: 'Rsmax <%= platformTitle %> Template With TypeScript',
    navigationBarBackgroundColor: '#282c34'
  }
};

export default config;
<% } -%>
