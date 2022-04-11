function success(code: number, msg: string): unknown;
function success(code: number, msg: string, data: unknown): unknown;
function success(code = 200, msg, data?): unknown {
  if (data !== undefined) {
    return {
      code,
      msg,
      data,
    };
  } else {
    return {
      code,
      msg,
    };
  }
}

// function ApiResponse(code?: number, msg?: string, data?: unknown): unknown;
// function ApiResponse(code = 200, msg: '操作成功', data?: unknown): unknown {
//   return {
//     code,
//     msg,
//     data,
//   };
// }
export default success;
