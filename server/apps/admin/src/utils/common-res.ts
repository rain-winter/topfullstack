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
export default success;
