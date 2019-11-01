import React from 'react';

export class Observer extends React.Component {
    constructor() {
        super();
        this.state = {
            playing: false
        };

        this.observerRef = React.createRef();
    }

    async componentDidMount() {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.intersectionRatio === 1) {
                    this.setState({playing: true});
                } else {
                    this.setState({playing: false});
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            }
        );

        if(this.observerRef.current) {
            observer.observe(this.observerRef.current);
        }
    }

    render() {
        return (
            <div className='observer' ref={this.observerRef}>
                {this.props.children}
            </div>
        );
    }
}