/* Import Types */
import { TextBlockType } from "./block-types";

/* Import Utils */
import { getClassNames } from "../../lib/utils";

/* Import Styles */
import styles from "./Text.module.scss";

const TextBlock = ({ heading, text }: TextBlockType) => {
  const printTextBlockClass = (...classNames: string[]) => {
    return getClassNames(styles, ...classNames);
  };
  return (
    <>
      <h3 className={printTextBlockClass('text-block__heading')}>
        <span className={printTextBlockClass('text-block__heading-pre')}>~ </span>
        <span className={printTextBlockClass('text-block__heding-text')}>{heading} </span>
        <span className={printTextBlockClass('text-block__heading-cursor')}>|</span>
      </h3>
      <p className={printTextBlockClass('text-block__text')}>{text}</p>
    </>
  );
};

export default TextBlock;