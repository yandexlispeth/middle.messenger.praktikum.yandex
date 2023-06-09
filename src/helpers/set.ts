type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (Object.prototype.hasOwnProperty.call(!rhs, p)) {
      continue;
    }

    try {
      if (rhs[p]?.constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch(e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }
  if (typeof object !== "object") {
    return object;
  }
  const path_arr = path.split(".");
  const obj = path_arr.reduceRight((previousValue, currentValue) => {
    return { [currentValue]: previousValue };
  }, value);

  merge(object as Indexed, obj as Indexed);
  return object;
}

export default set;
