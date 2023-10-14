import imageUrlBuilder from '@sanity/image-url';
import type { SanityProjectDetails } from '@sanity/image-url/lib/types/types';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

export default defineNuxtPlugin(() => {
  const builder: ImageUrlBuilder = imageUrlBuilder(useSanity().config as SanityProjectDetails);
  const urlFor = (source: string|undefined) => {
    if (!source) {
      return builder;
    }

    return builder.image(source).auto('format')
  };

  return {
    provide: { urlFor }
  }
});
