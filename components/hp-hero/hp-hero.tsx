/* Import ultils */
import { getClassNames } from '../../lib/utils';

/* Import styles */
import styles from './HpHero.module.scss';

type HeroProps = {
  content: {
    titleHeading: string,
    titleSubheading: string,
    subtitleHeading: string,
    subtitleSubheading: string,
  }
};


const HpHero = ({content}: HeroProps) => {
  const printHeroClass = (...classNames: string[]) => {
    return getClassNames(styles, ...classNames);
  };
  const { titleHeading, titleSubheading, subtitleHeading, subtitleSubheading } = content;

  return (
    <div className={printHeroClass('hp-hero')}>
      <div className={`${printHeroClass('hp-hero__container')} container`}>
        <div className={printHeroClass('hp-hero__outline')}>
          <h2 className={`${printHeroClass('hp-hero__title')} kilo`}>
            <span className={printHeroClass('hp-hero__title-bar')} aria-hidden='true'>/</span>
            Who
          </h2>
          <div className={printHeroClass('hp-hero__content')}>
            <div className={printHeroClass('hp-hero__row')}>
              <h3 className={`${printHeroClass('hp-hero__name')} alpha`}>{titleHeading}</h3>
              <p className={printHeroClass('hp-hero__sub')}>
                <span className={printHeroClass('hp-hero__sub-prefix')}>~</span>
                <span className={printHeroClass('hp-hero__sub-text')}>
                  {titleSubheading}
                </span>
                <span className={printHeroClass('hp-hero__sub-suffix')}>|</span>
              </p>
            </div>
            <div className={printHeroClass('hp-hero__row')}>
              <h3 className={`${printHeroClass('hp-hero__intro')} beta`}>
                <span className={printHeroClass('hp-hero__intro-text')}>
                  {subtitleHeading}
                </span>
              </h3>
              <p className={printHeroClass('hp-hero__sub')}>
                <span className={printHeroClass('hp-hero__sub-prefix')}>~</span>
                <span className={printHeroClass('hp-hero__sub-text')}>
                  {subtitleSubheading}
                </span>
                <span className={printHeroClass('hp-hero__sub-suffix')}>|</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HpHero;