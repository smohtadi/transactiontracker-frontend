import Big from "big.js";

export function averageDecimals(decimals: string[], digits = 2): string {
  const sum = decimals.reduce((prev, curr) => prev.plus(curr), new Big(0));
  const average = new Big(sum).div(new Big(decimals.length));
  const rounded = average.round(digits, Big.roundHalfEven);
  return rounded.toString();
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "Unknown error";
  }
}

export function groupBy<T, E extends string | number | symbol>(
  objs: T[],
  cb: (ele: T) => E
) {
  const res = {} as { [key in E]: T[] };
  for (const obj of objs) {
    const key = cb(obj);
    if (res[key] === undefined) res[key] = [];
    res[key].push(obj);
  }
  return res;
}

export function isStrInt(str: unknown) {
  return typeof str === "string" && Number.isInteger(+str);
}

export function isValidMonth(month: number) {
  return month >= 0 && month <= 11;
}

export function isBetween(num: number, min: number, max: number) {
  return min <= num && num <= max;
}

export function sumDecimals(decimals: string[], digits = 2): string {
  const sum = decimals.reduce((prev, curr) => prev.plus(curr), new Big(0));
  const rounded = sum.round(digits, Big.roundHalfEven);
  return rounded.toString();
}
