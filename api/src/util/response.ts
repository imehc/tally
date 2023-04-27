import { HttpStatus } from '@midwayjs/core';

interface IBasicHttpResponse {
  data: Record<string, any>;
}

export interface IHttpResponse extends IBasicHttpResponse {
  code: HttpStatus;
  message: string;
}

export const response = {
  send: ({
    code,
    message,
    data,
  }: Partial<IHttpResponse>): Partial<IHttpResponse> => {
    const res = {
      code: code ?? 200,
      message: message ?? '请求成功',
    } as Partial<IHttpResponse>;
    if (data) {
      res.data = data;
    }
    return res;
  },
};
