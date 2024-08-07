import React, { useState } from 'react';
import css from './ListingPage.module.css';
import { Heading } from '../../components';
import { FormattedMessage } from 'react-intl';
import AzureImageDisplay from '../../components/AzureImageDisplay/AzureImageDisplay';
import ModalCertificationsSliderModal from '../../components/ModalCertificationsSliderModal/ModalCertificationsSliderModal';

const SectionCertificationsMaybe = props => {
  const { currentAuthor, intl, onManageDisableScrolling } = props;

  const [showCertificationsModal, setShowCertificationsModal] = useState(false);
  if (!currentAuthor) {
    return null;
  }

  const certifications = currentAuthor.attributes?.profile?.publicData?.certifications;

  return (
    <section className={css.sectionDetails}>

      <Heading as="h2" rootClassName={css.sectionHeadingWithExtraMargin}>
        <FormattedMessage id="ListingPage.certificationsTitle" values={{ count: certifications?.length }} />
      </Heading>

      <div className={css.certificationsContainer} onClick={() => { setShowCertificationsModal(true) }}>
        {certifications?.map((certification, index) => (
          <div key={index} className={css.certificateContainer}>

            <AzureImageDisplay
              value={certification.image}
              onManageDisableScrolling={onManageDisableScrolling}
              disableImageModal={true} />

          </div>
        ))
        }

        {showCertificationsModal &&
          <ModalCertificationsSliderModal
            certifications={certifications}
            isOpen={showCertificationsModal}
            onManageDisableScrolling={onManageDisableScrolling}
            onClose={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowCertificationsModal(false)
            }} />

        }
      </div>
    </section>
  )
};

export default SectionCertificationsMaybe;