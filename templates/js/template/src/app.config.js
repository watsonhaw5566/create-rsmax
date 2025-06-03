<% if (one) { %>
const pages = ['pages/index/index'];

module.exports.ali = {
  pages,
  window: {
    defaultTitle: 'Rsmax Ali Template',
    titleBarColor: '#282c34',
  },
};

module.exports.wechat = {
  pages,
  window: {
    navigationBarTitleText: 'Rsmax Wechat Template',
    navigationBarBackgroundColor: '#282c34',
  },
};

module.exports.toutiao = {
  pages,
  window: {
    navigationBarTitleText: 'Rsmax Toutiao Template',
    navigationBarBackgroundColor: '#282c34',
  },
};

module.exports.web = {
  pages,
  window: {
    defaultTitle: 'Rsmax Web Template',
  },
};
<% } else { %>
module.exports = {
  pages: ['pages/index/index'],
  window: {
    navigationBarTitleText: 'Rsmax <%= platformTitle %> Template',
    navigationBarBackgroundColor: '#282c34'
  }
};
<% } %>
