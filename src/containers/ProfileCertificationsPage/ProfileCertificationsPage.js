import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { useConfiguration } from '../../context/configurationContext';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/ui.duck';

import { H3, Page, UserNav, NamedLink, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';

import ProfileCertificationsForm from './ProfileCertificationsForm/ProfileCertificationsForm';

import { updateProfile } from './ProfileCertificationsPage.duck';
import css from './ProfileCertificationsPage.module.css';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export const ProfileCertificationsPageComponent = props => {
  const config = useConfiguration();
  const {
    currentUser,
    onUpdateProfile,
    scrollingDisabled,
    updateInProgress,
    updateProfileError,
    intl,
  } = props;

  const { userFields } = config.user;
  const handleSubmit = values => {

    console.log(values);

    const { certifications } = values;

    const updatedValues = {
      publicData: {
        certifications
      }
    }

    onUpdateProfile(updatedValues);
  };

  const user = ensureCurrentUser(currentUser);
  const {
    publicData,
  } = user?.attributes.profile;
  const { userType } = publicData || {};
  const { certifications } = publicData || {};

  const profileCertificationsForm = user.id ? (
    <ProfileCertificationsForm
      className={css.form}
      currentUser={currentUser}
      initialValues={{
        certifications
      }}
      updateInProgress={updateInProgress}
      updateProfileError={updateProfileError}
      onSubmit={values => handleSubmit(values, userType)}
      marketplaceName={config.marketplaceName}
      userFields={userFields}
      userType={userType}
    />
  ) : null;

  const title = intl.formatMessage({ id: 'ProfileCertificationsPage.title' });

  return (
    <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSingleColumn
        topbar={
          <>
            <TopbarContainer />
            <UserNav currentPage="ProfileCertificationsPage" />
          </>
        }
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <div className={css.headingContainer}>
            <H3 as="h1" className={css.heading}>
              <FormattedMessage id="ProfileCertificationsPage.heading" />
            </H3>
            {user.id ? (
              <NamedLink
                className={css.profileLink}
                name="ProfilePage"
                params={{ id: user.id.uuid }}
              >
                <FormattedMessage id="ProfileCertificationsPage.viewProfileLink" />
              </NamedLink>
            ) : null}
          </div>
          {profileCertificationsForm}
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

ProfileCertificationsPageComponent.defaultProps = {
  currentUser: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
  config: null,
};

ProfileCertificationsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  // from useConfiguration()
  config: object,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    image,
    updateInProgress,
    updateProfileError,
  } = state.ProfileCertificationsPage;
  return {
    currentUser,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const ProfileCertificationsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ProfileCertificationsPageComponent);

export default ProfileCertificationsPage;
