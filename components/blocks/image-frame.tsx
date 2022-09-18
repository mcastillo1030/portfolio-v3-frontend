/* Import react & hooks */
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
  className?: string,
};

const ImageFrame = ({ children, className }: Props) => {
  return (
    <div className={`image-frame ${className ?? ''}`}>
      <div className="image-frame__toolbar">
        <span className="image-frame__btn"></span>
        <span className="image-frame__btn"></span>
        <span className="image-frame__btn"></span>
      </div>
      <div className="image-frame__img">
        {children}
      </div>
    </div>
  );
};

export default ImageFrame;