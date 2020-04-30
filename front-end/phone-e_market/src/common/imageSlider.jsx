import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import config from '../config.json';
function ImageSlider(props) {
    const [sliderImages, setSliderImages] = useState([]);
    const { images } = props;
    useEffect(() => {
        var imageArr = [];

        images.forEach((image) => {
            imageArr.push({ url: image.path });
        });
        if (imageArr.length === 0) {
            imageArr.push({
                url: config.imageUrl
            });
        }
        console.log('image array -', imageArr);
        setSliderImages(imageArr);
    }, [images]);
    return (
        <Carousel style={{ borderRadius: '25px' }}>
            {sliderImages.map((image, index) => (
                <Carousel.Item key={index} className="carouselItem">
                    <img
                        className="d-block w-100 h-70"
                        src={image.url}
                        alt={index}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ImageSlider;
