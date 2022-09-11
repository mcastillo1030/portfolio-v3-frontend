/**
 * Get the kebab version of a string.
 *
 * @param input A string to convert to kebab case.
 * @returns The kebab case string.
 */
export const getKebabString = (input: string) => {
  return input.replace(/\s+/g, '-').toLowerCase();
};

type StylesProp = {
  [key: string]: string;
};

/**
 * Get a stringified version of a list of class names.
 *
 * @param {StylesProp} stylesArry - An class name map imported from SCSS.
 * @param {string[]} classNames - A list of class names to stringify.
 * @returns {string} A stringified class name list.
 */
export const getClassNames = (stylesArry: StylesProp, ...classNames: string[]) => {
  if (!classNames.length) {
    return '';
  }

  if (classNames.length === 1) {
    const className = stylesArry[classNames[0]];
    return className ? className.toString() : '';
  } else {
    return classNames
      .map(className => stylesArry[className])
      .filter(className => className) // if className is undefined, filter it out
      .join(' ');
  }
};