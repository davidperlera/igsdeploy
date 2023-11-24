export const generateId = (): string => {
  return crypto.randomUUID().replaceAll('-', '');
}

/**
 * Function to promote an inner object for the property key to the main object obj.
*/
export const promoteNestedObject = (obj: Object, key: string): Object => {
  if (!(key in obj)) {
    throw new Error(`Key "${key}" not found in the object.`);
  }

  // @ts-ignore
  const nestedObject = obj[key];
  // @ts-ignore
  delete obj[key];

  for (const nestedKey in nestedObject) {
    const finalKey = nestedKey;
    // @ts-ignore
    obj[finalKey] = nestedObject[nestedKey];
  }

  return obj;
};