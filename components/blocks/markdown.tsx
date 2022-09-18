/* Import Types */
import { MarkdownBlockType } from './block-types';

/* Import Utils */
import reactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getClassNames } from '../../lib/utils';

/* Import Styles */
import styles from './Markdown.module.scss';

const MarkdownBlock = ({ heading, content }: MarkdownBlockType) => {
  const printMarkdownBlockClass = (...classNames: string[]) => {
    return getClassNames(styles, ...classNames);
  };

  return (
    <>
      {heading && <h3 className={printMarkdownBlockClass('markdown-block__heading')}>
        <span className={printMarkdownBlockClass('markdown-block__heading-pre')}>~ </span>
        <span className={printMarkdownBlockClass('markdown-block__heding-text')}>{heading} </span>
        <span className={printMarkdownBlockClass('markdown-block__heading-cursor')}>|</span>
      </h3>}
      {reactMarkdown({
        className: printMarkdownBlockClass('markdown-block__content'),
        children: content,
        rehypePlugins: [rehypeRaw],
        remarkRehypeOptions: {
          allowDangerousHtml: true,
        },
      })}
    </>
  );
};

export default MarkdownBlock;