import {
  Controller,
  Files,
  Get,
  HttpStatus,
  Inject,
  Post,
  httpError,
} from '@midwayjs/core';
import { Context } from 'egg';
import { readFileSync, writeFileSync } from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import { mkdirp } from 'mkdirp';

@Controller('/v1/')
export class UploadController {
  @Inject()
  ctx: Context;

  @Get('/upload_test')
  async uploadTest() {
    await this.ctx.render('upload');
  }

  @Post('/upload')
  async upload(@Files() files) {
    // 声明存放资源的路径
    let uploadDir = 'public/upload';

    try {
      // files[0] 表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
      const file = await files[0];

      if (!file) {
        throw new httpError.BadRequestError(
          '文件为空或文件不合法、请重新选择文件'
        );
      }

      const f = readFileSync(file.data);
      // 1.获取当前日期
      const day = moment(new Date()).format('YYYYMMDD');

      // 2.创建图片保存的路径
      const dir = path.join(uploadDir, day);
      const date = Date.now(); // 毫秒数
      await mkdirp(dir);
      // 返回图片保存的路径
      uploadDir = path.join(dir, date + path.extname(file.filename));

      // 写入文件夹
      writeFileSync(uploadDir, f);
      // 处理windows分隔符问题
      uploadDir = uploadDir.split(path.sep).join('/');
    } finally {
      // 清除临时文件
      this.ctx.cleanupRequestFiles();
    }

    this.ctx.status = HttpStatus.OK;
    this.ctx.body = {
      data: uploadDir,
    };
  }
}
