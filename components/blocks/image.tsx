/* Import Types */
import { ImageBlockType } from './block-types';

/* Import Utils */
import Image from 'next/image';
import { getStrapiMedia } from '../../lib/media';
import { getClassNames } from '../../lib/utils';

/* Import Block */
import ImageFrame from './image-frame';

/* Import Styles */
import styles from './Image.module.scss';

const ImageBlock = ({ heading, image }: ImageBlockType) => {
  const {alternativeText, width, height} = image.data.attributes;
  const url = getStrapiMedia(image);
  const printImageBlockClass = (...classNames: string[]) => {
    return getClassNames(styles, ...classNames);
  };

  return (
    <>
      {heading && <h3 className={printImageBlockClass('image-block__heading')}>
        <span className={printImageBlockClass('image-block__heading-pre')}>~ </span>
        <span className={printImageBlockClass('image-block__heding-text')}>{heading} </span>
        <span className={printImageBlockClass('image-block__heading-cursor')}>|</span>
      </h3>}
      <ImageFrame
        className={printImageBlockClass('image-block__frame')}
      >
        <Image
          className={printImageBlockClass('image-block__image')}
          src={url}
          alt={alternativeText}
          width={width}
          height={height}
        />
      </ImageFrame>
    </>
  );
};

export default ImageBlock;