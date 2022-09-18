/* Import types */
import type { HeadingBlockType } from './block-types';

/* Import ultils */
import { getClassNames } from '../../lib/utils';

/* Import styles */
import styles from './Heading.module.scss';

const HeadingBlock = ({ title }: HeadingBlockType) => {
  const printHeadingClass = (...classNames: string[]) => {
    return getClassNames(styles, ...classNames);
  };
  return (
    <h2 className={`${printHeadingClass('heading')} kilo`}>
      <span className={printHeadingClass('heading__bar')} aria-hidden='true'>/</span>
      <span className={printHeadingClass('heading__title')}>
        {title}
      </span>
    </h2>
  );
};

export default HeadingBlock;