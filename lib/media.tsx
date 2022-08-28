import { getStrapiURL } from './api';

export type StrapiMedia = {
  data: {
    attributes: {
      url: string,
      alternativeText: string,
      width: number,
      height: number,
    }
  }
}

/**
 * Get the fully qualified Strapi URL for the media file.
 *
 * @param media The media to get the url for.
 * @returns The fully qualified url for the media.
 */
export const getStrapiMedia = (media: StrapiMedia | string) => {
  if ( typeof media === 'string' ) {
    return media.startsWith('http') ? media : getStrapiURL(media);
  }

  if ( media.data ) {
    const { url } = media.data.attributes;

    return url.startsWith('http') ? url : `${getStrapiURL(url)}`;
  }

  return '';
};