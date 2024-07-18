import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Field } from 'react-final-form';
import css from './FieldAzureImageUpload.module.css';
import classNames from 'classnames';
import { IconSpinner } from '..';
const fileDownload = require('js-file-download');

const RemoveImageButton = props => {
    const { className, rootClassName, onClick } = props;
    const classes = classNames(rootClassName || css.removeImage, className);
    return (
        <button className={classes} onClick={onClick}>

            <svg
                width="10px"
                height="10px"
                viewBox="0 0 10 10"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g strokeWidth="1" fillRule="evenodd">
                    <g transform="translate(-821.000000, -311.000000)">
                        <g transform="translate(809.000000, 299.000000)">
                            <path
                                d="M21.5833333,16.5833333 L17.4166667,16.5833333 L17.4166667,12.4170833 C17.4166667,12.1866667 17.2391667,12 17.00875,12 C16.77875,12 16.5920833,12.18625 16.5920833,12.41625 L16.5883333,16.5833333 L12.4166667,16.5833333 C12.18625,16.5833333 12,16.7695833 12,17 C12,17.23 12.18625,17.4166667 12.4166667,17.4166667 L16.5875,17.4166667 L16.5833333,21.5829167 C16.5829167,21.8129167 16.7691667,21.9995833 16.9991667,22 L16.9995833,22 C17.2295833,22 17.41625,21.81375 17.4166667,21.58375 L17.4166667,17.4166667 L21.5833333,17.4166667 C21.8133333,17.4166667 22,17.23 22,17 C22,16.7695833 21.8133333,16.5833333 21.5833333,16.5833333"
                                transform="translate(17.000000, 17.000000) rotate(-45.000000) translate(-17.000000, -17.000000) "
                            />
                        </g>
                    </g>
                </g>
            </svg>
        </button>
    );
};

const FieldAzureImageUpload = ({ name, id, addNewEmpty, remove, isRounded }) => {
    const isDev = typeof window !== 'undefined' && window.location?.hostname === 'localhost';
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState();
    const [isUploading, setIsUploading] = useState();

    const uploadField = ({ input: { onChange, value }, label, ...rest }) => {

        const onFileChange = event => {
            const formData = new FormData();

            formData.append('image', event.target.files[0], event.target.files[0].name);

            setIsUploading(true);

            return axios
                .post(`${isDev ? 'http://localhost:3500' : ''}/api/azure-upload`, formData)
                .then(resp => {
                    const file = resp?.data?.file;
                    onChange(file?.name);

                    if (addNewEmpty) {
                        addNewEmpty();
                    }

                    setIsUploading(false);
                })
                .catch(error => {
                    setIsUploading(false);
                    console.log(error);
                });
        };

        if (value) {

            axios
                .get(`${isDev ? 'http://localhost:3500' : ''}/api/azure-stream?fileName=` + value)
                .then(resp => {
                    setImageUrl(resp.data);
                })
                .catch(error => {
                    console.log(error);
                });

            const handleDeleteFile = e => {
                e.stopPropagation();
                e.preventDefault();

                setIsUploading(false);
                if (remove) {
                    remove();
                }

                return axios.get(
                    `${isDev ? 'http://localhost:3500' : ''}/api/azure-delete?fileName=` + value,
                    {
                        responseType: 'blob',
                    }
                ).then(() => {
                    setIsUploading(false);
                    onChange('');
                }).catch(error => {
                    setIsUploading(false);
                    console.log(error);
                });
            };

            return (
                <div className={css.fileContainer} title="download">

                    <img className={isRounded ? css.imageRounded : css.image} src={imageUrl} alt="image file"
                        onClick={() => window.open(imageUrl)} />

                    <RemoveImageButton onClick={handleDeleteFile} />

                </div>
            );
        }

        return (
            <div className={css.wrapper}>
                <input
                    type="file"
                    className={css.hiddenFileInput}
                    onChange={onFileChange}
                    ref={fileInputRef}
                />

                <div className={isRounded ? css.addFileContainerRounded : css.addFileContainer} onClick={() => fileInputRef.current.click()}>
                    + Add a photo…
                    {isUploading &&
                        <IconSpinner />
                    }

                </div>


            </div>
        );
    };

    return <Field id={id} name={name} component={uploadField} />
};

export default React.memo(FieldAzureImageUpload);