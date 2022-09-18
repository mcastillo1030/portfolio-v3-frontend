/* Import Types */
import { IconListBlockType } from './block-types';

/* Import Utils */
import { getClassNames } from '../../lib/utils';

/* Import Styles */
import styles from './IconList.module.scss';

/* Import Blocks */
import ImageFrame from './image-frame';
import {
  AwsIcon,
  JavaScriptIcon,
  LaravelIcon,
  PhpIcon,
  ReactIcon,
  WordpressIcon,
}  from '../icons/icons';

const iconMap: {
  [key: string]: React.FC<any>;
} = {
  'aws': AwsIcon,
  'javascript': JavaScriptIcon,
  'laravel': LaravelIcon,
  'php': PhpIcon,
  'react': ReactIcon,
  'wordpress': WordpressIcon,
};

const IconListBlock = ({ heading, icon }: IconListBlockType) => {
  const printIconListBlockClass = (...classNames: string[]) => {
    return getClassNames(styles, ...classNames);
  };
  const iconsList = icon.map((item, idx) => {
    return (
      <li key={item.id + '-' + idx} className={printIconListBlockClass('icon-list-block__item')}>
        {iconMap[item.name] && iconMap[item.name]({
          className: printIconListBlockClass('icon-list-block__icon'),
        })}
      </li>
    );
  });
  return (
    <>
      {heading && <h3>{heading}</h3>}
      <ImageFrame className={printIconListBlockClass('icon-list-block__frame')}>
        <ul className={printIconListBlockClass('icon-list-block__list')}>
          {iconsList}
        </ul>
      </ImageFrame>
    </>
  );
};

export default IconListBlock;