import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { uploadWhiteList } from '@midwayjs/upload';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1680781185005_5324',
    egg: {
      port: 6013,
      globalPrefix: '/apis', // 全局路由前缀
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
    jwt: {
      secret: 'tally-secret', // 密钥
      expiresIn: '2h', // 过期时间
    },
    upload: {
      // 扩展名白名单
      whitelist: uploadWhiteList,
      // 仅允许下面这些文件类型可以上传
      mimeTypeWhiteList: {
        '.jpg': 'image/jpeg',
        // 也可以设置多个 MIME type，比如下面的允许 .jpeg 后缀的文件是 jpg 或者是 png 两种类型
        '.jpeg': ['image/jpeg', 'image/png'],
        // 其他类型
        '.gif': 'image/gif',
        '.bmp': 'image/bmp',
        '.wbmp': 'image/vnd.wap.wbmp',
        '.webp': 'image/webp',
      },
    },
    cors: {
      credentials: false,
    },
  } as MidwayConfig;
};
