/**
 * Get the kebab version of a string.
 *
 * @param input A string to convert to kebab case.
 * @returns The kebab case string.
 */
export const getKebabString = (input: string) =>{
  return input.replace(/\s+/g, '-').toLowerCase();
};