import React from 'react';
import Field, { hasDataInFields } from '../../Field'; // Asegúrate de que esta importación esté correcta
import BlockBuilder from '../../BlockBuilder';
import SectionContainer from '../SectionContainer';
import {VideoHero} from '../../../LandingPage/VideoHero';
import classNames from 'classnames';
import css from './SectionFeatures.module.css';

const SectionFeatures = props => {
  const {
    sectionId,
    className,
    rootClassName,
    defaultClasses,
    title,
    description,
    appearance,
    callToAction,
    blocks,
    isInsideContainer,
    options,
  } = props;

  const fieldComponents = options?.fieldComponents;
  const fieldOptions = { fieldComponents };

  const hasHeaderFields = hasDataInFields([title, description, callToAction], fieldOptions);
  const hasBlocks = blocks?.length > 0;

  return (
    <div className={css.featuresSection}>
      <VideoHero />
      {/* <SectionContainer
        id={sectionId}
        className={className}
        rootClassName={rootClassName}
        appearance={appearance}
        options={fieldOptions}
      >
        {hasHeaderFields ? (
          <header className={defaultClasses.sectionDetails}>
            <Field data={title} className={defaultClasses.title} options={fieldOptions} />
            <Field data={description} className={defaultClasses.description} options={fieldOptions} />
            <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
          </header>
        ) : null}
        {hasBlocks ? (
          <div
            className={classNames(defaultClasses.blockContainer, css.featuresMain, {
              [css.noSidePaddings]: isInsideContainer,
            })}
          >
            <BlockBuilder
              rootClassName={css.block}
              ctaButtonClass={defaultClasses.ctaButton}
              blocks={blocks}
              sectionId={sectionId}
              responsiveImageSizes="(max-width: 767px) 100vw, 568px"
              options={options}
            />
          </div>
        ) : null}
      </SectionContainer> */}
    </div>
  );
};

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

SectionFeatures.defaultProps = {
  className: null,
  rootClassName: null,
  defaultClasses: null,
  textClassName: null,
  title: null,
  description: null,
  appearance: null,
  callToAction: null,
  blocks: [],
  isInsideContainer: false,
  options: null,
};

SectionFeatures.propTypes = {
  sectionId: string.isRequired,
  className: string,
  rootClassName: string,
  defaultClasses: shape({
    sectionDetails: string,
    title: string,
    description: string,
    ctaButton: string,
  }),
  title: object,
  description: object,
  appearance: object,
  callToAction: object,
  blocks: arrayOf(object),
  isInsideContainer: bool,
  options: propTypeOption,
};
export default SectionFeatures;