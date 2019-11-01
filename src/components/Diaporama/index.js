import React from 'react';
import duoSelfie from '../../assets/images/duo_selfie.jpeg';
import shootOne from '../../assets/images/shoot_1.jpeg';
import shootTwo from '../../assets/images/shoot_2.jpeg';
import loneSea from '../../assets/images/lone_sea_he.jpeg';
import loneTree from '../../assets/images/lone_tree_she_cropped.jpeg';
import tocToc from '../../assets/images/toc_toc_couple.jpeg';
import beachSelfie from '../../assets/images/beach_selfie.jpeg';
import { Fade } from 'react-slideshow-image';


export class SlideshowContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            autoplay: true,
        };

        this.togglePlay = this.togglePlay.bind(this);
        this.togglePause = this.togglePause.bind(this);
        this.slideRef = React.createRef();
    }

    togglePlay() {
        if(this.slideRef && this.slideRef.current) {
            this.setState({autoplay: true});
            this.slideRef.current.goNext();
        }
       
    }
    
    togglePause() {
        if(this.slideRef && this.slideRef.current) {
            this.setState({autoplay: false});
        }
    }

    
    render() {
        return (
            <div 
                className="slide-container" id='slide-container-ref' 
                // onMouseEnter={this.togglePlay} onMouseLeave={this.togglePause} 
            >
                    <h1 className='observer-title'>Grace Line et Jacques Arnaud</h1>
                    {/* <div className='heart'> */}
                        <Fade 
                            ref={this.slideRef}
                            duration={4000}
                            transitionDuration={500}
                            infinite={true}
                            indicators={false}
                            arrows={false}
                            // autoplay={this.state.autoplay}
                            autoplay={true}
                        >
                            {imagesList.map((img, i) => (
                                <div className="each-fade" key={'image-fade-' + i}>
                                    <div className="image-container">
                                        <img alt={'imageList' + i} src={imagesList[i]}/>
                                    </div>
                                </div>
                            ))}
                        </Fade>
                    </div>
            // </div>
        );
    }
}


const imagesList = [shootOne, shootTwo, loneSea, loneTree, tocToc, beachSelfie];