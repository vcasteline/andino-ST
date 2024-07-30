import React from 'react';

import css from './ModalCertificationsSliderModal.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import ArrowLeftIcon from './images/arrow_left.svg';
import ArrowRightIcon from './images/arrow_right.svg';
import AzureImageDisplay from '../AzureImageDisplay/AzureImageDisplay';
import { FormattedMessage } from 'react-intl';

let Slider;
if (typeof window !== 'undefined') {
    Slider = require('react-slick').default;
} else {
    Slider = () => null; // Dummy component for server-side rendering
}

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}>

            <img src={ArrowRightIcon} />
        </div>

    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <img src={ArrowLeftIcon} />
        </div>
    );
}

const options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
const formatDate = date => new Intl.DateTimeFormat('en-US', options).format(new Date(date));

const CertificationsSlider = (props) => {
    const { certifications, onManageDisableScrolling } = props;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('slick-carousel/slick/slick.css');
            require('slick-carousel/slick/slick-theme.css');
        }
    }, []);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    const settings = {
        // className: 'center',
        dots: true,
        infinite: true,
        speed: 500,
        // centerMode: true,
        slidesToShow: isMobile ? 1 : 2,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: dots => (
            <ul style={{ display: "flex", flexDirection: "row", gap: "4px", justifyContent: 'center' }}>{dots}</ul>
        ),

        beforeChange: (current, next) => setCurrentSlide(next)
    };


    return (
        <div className={css.sliderWrapper} >

            <div id="slider-wrapper">
                <Slider {...settings}>

                    {certifications?.map((certification, index) => (
                        <div key={index} className={css.certificateContainer}>


                            <div className={css.imageContainer}>
                                <AzureImageDisplay
                                    value={certification.image}
                                    disableImageModal={true}
                                    onManageDisableScrolling={onManageDisableScrolling} />
                            </div>

                            <div className={css.certificateInfo}>
                                <span className={css.detailLabel}>
                                    <FormattedMessage id="ProfilePage.certificationName" />
                                    <span className={css.detailInfo}>
                                        {certification.name}
                                    </span>
                                </span>

                                <span className={css.detailLabel}>
                                    <FormattedMessage id="ProfilePage.certificationDate" />
                                    <span className={css.detailInfo}>
                                        {formatDate(certification.date)}
                                    </span>
                                </span>

                                <span className={css.detailLabel}>
                                    <FormattedMessage id="ProfilePage.description" />
                                    <span className={css.detailInfo}>
                                        {certification.description}
                                    </span>
                                </span>

                            </div>

                        </div>
                    ))
                    }

                </Slider>
            </div>
        </div >
    );
    // }
}

export default CertificationsSlider;
