<% if (one) { -%>
const pages = ['pages/index/index'];
const color = '#282c34';

import { AppConfig as WechatAppConfig } from 'rsmax/wechat';
import { AppConfig as AliAppConfig } from 'rsmax/ali';
import { AppConfig as ToutiaoAppConfig } from 'rsmax/toutiao';
import { AppConfig as WebAppConfig } from 'rsmax/web';

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
  title: 'Rsmax One Web',
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
