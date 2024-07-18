import React from 'react';
import { bool, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';

import { FormattedMessage, injectIntl, intlShape } from '../../../util/reactIntl';
import { ensureCurrentUser } from '../../../util/data';
import { propTypes } from '../../../util/types';
import * as validators from '../../../util/validators';
import axios from 'axios';
import {
  Form, Button, FieldTextInput
} from '../../../components';

import css from './ProfileCertificationsForm.module.css';
import { FieldArray } from 'react-final-form-arrays';
import FieldAzureImageUpload from '../../../components/FieldAzureImageUpload/FieldAzureImageUpload';


export const ProfileCertificationsFormComponent = props => {

  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={fieldRenderProps => {
        const {
          className,
          currentUser,
          handleSubmit,
          intl,
          invalid,
          pristine,
          rootClassName,
          updateInProgress,
          updateProfileError,
          uploadInProgress,
          formId,
          form: formApi,
          form: {
            mutators: { push }
          },
          values,
        } = fieldRenderProps;

        const user = ensureCurrentUser(currentUser);

        const submitError = updateProfileError ? (
          <div className={css.error}>
            <FormattedMessage id="ProfileCertificationsForm.updateProfileFailed" />
          </div>
        ) : null;

        const classes = classNames(rootClassName || css.root, className);
        const submitInProgress = updateInProgress;
        const submitDisabled =
          invalid || pristine || uploadInProgress || submitInProgress;


        return (
          <Form
            className={classes}
            onSubmit={e => {
              handleSubmit(e);
            }}
          >

            <div className={css.certificationsContainer}>

              <FieldArray
                name="certifications"
              >
                {({ fields }) =>
                  fields.map((name, index) => (

                    <div className={css.certificationContainer} key={index}>

                      <div className={css.inputsContainer}>
                        <FieldTextInput
                          className={css.halfInput}
                          type="text"
                          id={`${name}name`}
                          name={`${name}name`}
                          label={intl.formatMessage({ id: 'ProfileCertificationsForm.name' })}
                          placeholder={intl.formatMessage({ id: 'ProfileCertificationsForm.namePlaceholder' })}
                          validate={validators.required(intl.formatMessage({ id: 'ProfileCertificationsForm.nameRequired' }))}
                        />

                        <FieldTextInput
                          className={css.halfInput}
                          type="date"
                          id={`${name}date`}
                          name={`${name}date`}
                          label={intl.formatMessage({ id: 'ProfileCertificationsForm.date' })}
                          placeholder={intl.formatMessage({ id: 'ProfileCertificationsForm.datePlaceholder' })}
                        />
                      </div>

                      <div style={{ marginTop: "20px" }}>
                        <label>
                          <FormattedMessage id="ProfileCertificationsForm.image" />
                        </label>

                        <div className={css.imageAndRemoveContainer}>
                          <div className={css.imageContainer}>
                            <FieldAzureImageUpload
                              key={index}
                              id={`${name}image`}
                              name={`${name}image`}
                            />
                          </div>

                          <p className={css.remove} onClick={() => {
                            const isDev = typeof window !== 'undefined' && window.location?.hostname === 'localhost';
                            const image = values.certifications[index].image;

                            if (image) {
                              axios.get(
                                `${isDev ? 'http://localhost:3500' : ''}/api/azure-delete?fileName=` + image,
                                {
                                  responseType: 'blob',
                                }
                              ).then(() => {
                                fields.remove(index);
                              }).catch(error => {
                                console.log(error);
                              });
                            } else {
                              fields.remove(index);
                            }

                          }}>
                            <FormattedMessage id="ProfileCertificationsForm.remove" />
                          </p>

                        </div>
                      </div>

                    </div>
                  ))
                }
              </FieldArray>

              <Button
                className={css.addButton}
                onClick={(e) => {
                  e.preventDefault();
                  push('certifications', '')
                }}
              >
                <FormattedMessage id="ProfileCertificationsForm.addCertification" />
              </Button>
            </div>

            {submitError}
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
            >
              <FormattedMessage id="ProfileCertificationsForm.saveChanges" />
            </Button>
          </Form>
        );
      }}
    />
  );
}

ProfileCertificationsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  formId: null,
  updateProfileReady: false,
};

ProfileCertificationsFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  formId: string,

  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ProfileCertificationsForm = compose(injectIntl)(ProfileCertificationsFormComponent);

ProfileCertificationsForm.displayName = 'ProfileCertificationsForm';

export default ProfileCertificationsForm;
