import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import css from './AzureImageDisplay.module.css';
import ModalShowImage from '../ModalShowImage/ModalShowImage';

const AzureImageDisplay = (props) => {
    const { value, className, isRounded, onManageDisableScrolling, disableImageModal } = props;

    const [showModalImage, setShowModalImage] = useState(false);
    if (!value) return null;

    useEffect(() => {
        axios
            .get(`${isDev ? 'http://localhost:3500' : ''}/api/azure-stream?fileName=` + value)
            .then(resp => {
                setImageUrl(resp.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [value]);

    const classes = classNames(className || isRounded ? css.imageRounded : css.image);

    const isDev = typeof window !== 'undefined' && window.location?.hostname === 'localhost';

    const [imageUrl, setImageUrl] = useState();

    return (
        <div className={css.root}>
            <img className={classes} src={imageUrl} alt="image file"
                onClick={() => {
                    if (!disableImageModal)
                        setShowModalImage(true)
                }} />

            {!disableImageModal &&
                <ModalShowImage
                    imageUrl={imageUrl}
                    isOpen={showModalImage}
                    onManageDisableScrolling={onManageDisableScrolling}

                    onClose={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowModalImage(false)
                    }} />
            }
        </div>
    )
}

export default React.memo(AzureImageDisplay);