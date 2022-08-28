import qs from 'qs';

/**
 * Get the fully qualified Strapi URL for the given path.
 *
 * @param path The optional path of a resource.
 * @returns Fully qualified path of the resource.
 */
export const getStrapiURL = (path: string = '') =>{
  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  return `${strapiURL}${path}`;
};

/**
 * Fetch data from the Strapi API.
 *
 * @param path The path of the resource.
 * @param urlParams Optional URL parameters.
 * @param options Optional fetch options.
 * @returns JSON response of the resource.
 */
export const fetchAPI = async (path: string, urlParams: any = {}, options: any = {}) => {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParams);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? '?'.concat(queryString) : ''}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error('An error occured please try again');
  }

  const data = await response.json();
  return data;
};