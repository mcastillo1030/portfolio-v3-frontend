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
    <h2 className={`${printHeadingClass('heading')} beta`}>{title}</h2>
  );
};

export default HeadingBlock;