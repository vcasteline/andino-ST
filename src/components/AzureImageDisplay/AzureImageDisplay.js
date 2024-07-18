import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import css from './AzureImageDisplay.module.css';

const AzureImageDisplay = (props) => {
    const { value, className, isRounded } = props;

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
        <img className={classes} src={imageUrl} alt="image file"
            onClick={() => window.open(imageUrl)} />
    )
}

export default React.memo(AzureImageDisplay);