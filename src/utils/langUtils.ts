import Big from "big.js";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "Unknown error";
  }
}

export function groupBy<T>(objs: T[], cb: (ele: T) => string) {
  const res: { [key: string]: T[] } = {};
  for (const obj of objs) {
    const key = cb(obj);
    if (!(key in res)) {
      res[key] = [];
    }
    res[key].push(obj);
  }
  return res;
}

export function sumDecimals(decimals: string[], digits = 2): string {
  const sum = decimals.reduce((prev, curr) => prev.plus(curr), new Big(0));
  const rounded = sum.round(digits, Big.roundHalfEven);
  return rounded.toString();
}
