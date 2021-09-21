export function combineListsIntoObject<T>(keys: string[], values: string[]): T {
  let object = {} as T;
  keys.forEach((key, i) => {
    object[key] = values[i];
  });
  return object;
}
