import React, { Component } from 'react';

class Slider extends Component {
    
    render() {
        return (
            <div id="slider" className="slider-small">
                <h1>{this.props.title}</h1>
            </div>
        );
    }

}

export default Slider;