import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1680781185005_5324',
    egg: {
      port: 7001,
    },
    security: {
      csrf: false,
      domainWhiteList: ['*'], // 配置白名单
    },
    view: {
      // defaultExtension: '.ejs', // 默认为.html
      mapping: {
        '.html': 'ejs', // 左边写成.html,会自动渲染.html文件
      },
    },
  } as MidwayConfig;
};
