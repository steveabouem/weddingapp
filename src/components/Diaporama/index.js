import React, { useState } from 'react';
import hideFace from '../../assets/images/hide_face.jpeg';
import shootOne from '../../assets/images/shoot_1.jpeg';
import shootTwo from '../../assets/images/shoot_2.jpeg';
import loneSea from '../../assets/images/lone_sea_he.jpeg';
import loneTree from '../../assets/images/lone_tree_she_cropped.jpeg';
import meanFaces from '../../assets/images/what_u_want.jpeg';
import groupBlond from '../../assets/images/group-blond.jpeg';
import laughter from '../../assets/images/laughter_1.jpeg';
import { Fade } from 'react-slideshow-image';


export class SlideshowContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            isSlideshowOn: true
        };
    }

    render() {
        return (
            <div className="slide-container" id='slide-container-ref'>
                <div className='gif-container slideshow-blue'/>
                <Fade {...fadeProperties}>
                    {imagesList.map((img, i) => (
                        <div className="each-fade" key={'image-fade-' + i}>
                            <div className="image-container">
                                <img src={imagesList[i]} />
                            </div>
                        </div>
                    ))}
                </Fade>
            </div>
        );
    }
}


const imagesList = [hideFace, shootOne, hideFace, shootTwo, loneSea, loneTree, meanFaces, groupBlond, laughter];

const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: false,
    indicators: true,
};