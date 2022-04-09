interface params {
  code?: 200 | number;
  msg?: string;
  data?: null;
}
export class Response {
  success(params) {
    return {};
  }
}
