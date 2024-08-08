import React from 'react';
import PropTypes from 'prop-types'; // Asegúrate de importar `PropTypes`
import Field, { hasDataInFields } from '../../Field';
import BlockBuilder from '../../BlockBuilder';
import SectionContainer from '../SectionContainer';
import { VideoHero } from '../../../LandingPage/VideoHero';
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

const propTypeOption = PropTypes.shape({
  fieldComponents: PropTypes.shape({
    component: PropTypes.node,
    pickValidProps: PropTypes.func,
  }),
});

SectionFeatures.defaultProps = {
  className: null,
  rootClassName: null,
  defaultClasses: null,
  title: null,
  description: null,
  appearance: null,
  callToAction: null,
  blocks: [],
  isInsideContainer: false,
  options: null,
};

SectionFeatures.propTypes = {
  sectionId: PropTypes.string.isRequired,
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  defaultClasses: PropTypes.shape({
    sectionDetails: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    ctaButton: PropTypes.string,
  }),
  title: PropTypes.object,
  description: PropTypes.object,
  appearance: PropTypes.object,
  callToAction: PropTypes.object,
  blocks: PropTypes.arrayOf(PropTypes.object),
  isInsideContainer: PropTypes.bool,
  options: propTypeOption,
};

export default SectionFeatures;
