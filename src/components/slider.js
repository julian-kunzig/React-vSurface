import React, { Component } from 'react';
import Slider from './rangeslider.js';
import styled from 'styled-components';

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  var context = canvas.getContext('2d');
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

//define styles to apply to the Value component
const Styles = styled.div`

.vSlider {
  width: ${(props) => props.width}px;   /*200px;*/
  height: ${(props) => props.height}px;
  border: 1px solid dimgray;
  border-radius: 8px;
}


/**
* Rangeslider
*/
.rangeslider {
  /* margin: 1000px 0; */
}

.rangeslider,
.rangeslider .rangeslider__fill {
  /* SK EDIT -- this adjusts border of the TRACK*/
  /* box-shadow: inset 0 1px 3px rgba(200, 200, 200, 0.4); */
}

.rangeslider .rangeslider__handle {
  /* SK EDIT FOR TESTING OVERWRITTEN BY ACTUAL HANDLE IN VERT SLIDER BELOW */
/*   background:  rgba(231, 99, 99, 0.5); 
  border: 1px solid red;    
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 -1px 3px rgba(0, 0, 0, 0.4); */
}

/**
* Rangeslider - Vertical slider
*/
.rangeslider-vertical {
  /* This controls the size of the container and its offsets from its parent!!! */
    margin: ${(props) =>
      props.container
        .topPad}px /* SK EDIT This changes the top margin (how much it is pushed down) slider */
            ${(props) => props.container.rightPad}px /*was auto */
            ${(props) => props.container.bottomPad}px  
            ${(props) => props.container.leftPad}px;
    /* LEFT */
    
    
    height: ${(props) =>
      props.container
        .innerHeight}px;      /* SK EDIT This changes the height of the slider */
    width: ${(props) => props.container.innerWidth}px; 
    max-width: ${(props) => props.container.innerWidth}px; 
    background: transparent;
  
}

/* The track is main slider track, that contains the fill and sits behind the thumb/handle */
.rangeslider__track {
    /* SK EDIT This changes the inside of the TRACK -- note its compted in percent*/
    /* on the vertical axis, (to bottom) we go from the background to the balck of the track after 1%*/
    background: 
    linear-gradient(to bottom, rgba(48,48,48,1) 0%,rgba(48,48,48,1) 1%,rgba(0,0,0,0) 1%,rgba(0,0,0,0) 99%,rgba(48,48,48,1) 99%,rgba(48,48,48,1) 100%),
    linear-gradient(to right, rgba(48,48,48,1) 0%, rgba(36,36,36,1) 35%, rgba(0,0,0,1) 50%, rgba(36,36,36,1) 65%, rgba(48,48,48,1) 100%);
    
    border: solid 1px black;
    border-radius: 6px;
    box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.25) inset;
    height: ${(props) => props.track.height}px; 
    width: ${(props) => props.track.width}px;
    left: ${(props) => props.track.left}px;
    position: absolute;

}

.rangeslider-vertical .rangeslider__fill,
  .rangeslider-vertical .rangeslider__handle {
  }

  .rangeslider-vertical .rangeslider__handle {
    width: ${(props) => props.thumb.width}px; /* 34px; */
    height: ${(props) =>
      props.thumb.height}px;     /* SK EDIT HEIGHT OF THUMB */
    left:  ${(props) => props.thumb.left}px;
    /* left: -10px;      /* IMPORTANT */
    /* background is the horizontal lines on the thumb */
    /* linear gradient is the vertical shading of the thumb */
    background: repeating-linear-gradient(0deg, transparent, transparent 5px, black 6px), 
    linear-gradient(0deg, #464646 0%, #5a5a5a 14%, #141414 15%, #141414 50%, #5a5a5a 84%, #141414 85%, #1e1e1e 100%);
    /* box shadow is just that. needs to be changed to relative pixels */
    box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.5);
  }



  .rangeslider-vertical .rangeslider__fill {
    width: ${(props) => props.fill.width}px;
    left:${(props) => props.fill.left}px; 
    z-index:99;
    background-color: rgba(78,204,255,0.5);
    border-radius: 0px 0px ${(props) => props.fill.borderRadius}px ${(props) =>
  props.fill.borderRadius}px;
    /* border: solid 0.5px black; */
    box-shadow: none;
    
  }


  /**
  * Rangeslider - Labels & Ticks
  */
  /* the labels need to be vertically padded because of the inside shadow of the track*/
  .rangeslider-vertical .rangeslider__labels {
    margin: 0px 0 0px 0px;
    padding: 0;
    text-align: right;
    width:  ${(props) => props.text.width}px;
    height: ${(props) => props.text.height}px;
    top: ${(props) => props.text.top}px;
    left: 0px;
    position: absolute;
    /* border: solid 1px blue; */
    /* background: red; */
  }

  .rangeslider-vertical .rangeslider__labels .rangeslider__label-item::before {
    /* width: calc(var(--line-height) * 6); */
    width: ${(props) => props.text.tickWidth}px;
    height: var(--line-height);
    background: grey;
    opacity: 0.75;
    left: ${(props) => props.text.tickLeft}px;
    top: 50%;
  }

  .rangeslider__label-item2 {
  position: inherit;
  text-align: right;
  width: ${(props) => props.text.width}px;
  left: 0px;
  font-size: ${(props) => props.text.fontSize}px;
  cursor: pointer;
  display: list-item; 
  transform: translate3d(0%, -50%, 0);
}
.rangeslider__label-item2::before {
    width: ${(props) => props.text.tickWidth}px;
    height: 1px;
    content: '';
    background: grey;
    top: 50%;
    opacity: 1;
    left: ${(props) => props.text.tickLeft}px;
    
    position: absolute;
    
}


  .tick-container {

    margin: 0px 0 0px 0px;
    padding: 0;
    text-align: right;
    /* match the label column for height and width and top offset */
    width:  ${(props) => props.text.width}px;
    height: ${(props) => props.text.height}px;
    top: ${(props) => props.text.top}px;

    left: ${(props) => props.tick.left}px;
    position: absolute;

    /* width: ${(props) => props.thumbWidth / 2}px; */
    /* height: calc(348px - 16px); */
    /* border: 1px solid rgba(255, 0, 0, 0); */
/*     padding-top:8px;
    padding-bottom:8px; */
  }
  
  .tick-containerL {
    /* left: -${(props) => props.handleWidth / 2 + props.sideMargin}px; */
  }

  .ticks {
    /* background: repeating-linear-gradient(transparent, transparent 6.56px, silver 6.56px, silver 7.56px); */
    background: repeating-linear-gradient(transparent, transparent ${(props) =>
      props.tick.spacing - 1}px, silver ${(props) =>
  props.tick.spacing - 1}px, silver ${(props) => props.tick.spacing}px);
    /* the transparent 'stop' defines the gap between ticks */
    /* the silver 'stops' define the height of each tick */
    opacity: 0.25;
    width: ${(props) => props.tick.width}px;
    height:100%; 
    top: 1px;
  }
  
  .rangeslider__labels .rangeslider__label-item2 {
    font-size: ${(props) => props.text.fontSize}px;
    color: lightgrey;
    width: ${(props) => props.text.width};
    /* top: 10px; */
    /* transform: translate3d(-50%, 0, 0); */
  }

`;
// font-size: ${props => props['font-size']}px;

class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 0,
    };
    if (props.volume) {
      this.state.volume = props.volume;
    }

    // ****** NEW VERSION

    let height = props.height ? props.height : 400;
    let width = props.width ? props.width : 100;

    this.state.container = {
      width: width,
      height: height,
      topPad: props.topPad ? props.topPad : height * 0.05,
      bottomPad: props.topPad ? props.topPad : height * 0.05,
      leftPad: props.leftPad ? props.leftPad : width * 0.05,
      rightPad: props.rightPad
        ? props.rightPad
        : props.leftPad
        ? props.leftPad
        : width * 0.05,
      borderRadius: 6,
    };
    this.state.container.innerWidth =
      this.state.container.width -
      this.state.container.leftPad -
      this.state.container.rightPad;
    this.state.container.innerHeight =
      this.state.container.height -
      this.state.container.topPad -
      this.state.container.bottomPad;

    this.state.spacing = {
      centerGap: (props.centerGap ? props.centerGap : width * 0.03) + 2,
      textTickGap: props.textTickGap ? props.textTickGap : width * 0.03,
    };
    this.state.thumb = {
      width: props.thumbWidth
        ? props.thumbWidth
        : (this.state.container.innerWidth -
            this.state.spacing.centerGap -
            this.state.spacing.textTickGap) /
          2,
      height: this.state.container.innerHeight * 0.15,
    };

    this.state.thumb.left =
      this.state.container.innerWidth - this.state.thumb.width;

    this.state.track = {
      height: this.state.container.innerHeight,
      width: props.trackWidth ? props.trackWidth : this.state.thumb.width * 0.4,
    };
    this.state.track.left =
      this.state.thumb.left +
      (this.state.thumb.width - this.state.track.width) / 2;

    this.state.fill = {
      width: props.fillWidth ? props.fillWidth : this.state.track.width / 5,
      borderRadius: 6,
    };
    this.state.fill.left =
      this.state.track.left +
      (this.state.track.width - this.state.fill.width) / 2 +
      1; //is the +1 for the broder?

    let targetFontSize = this.state.container.innerHeight / 40;
    if (targetFontSize < 6) {
      targetFontSize = 6;
    }
    let targetTextWidth =
      getTextWidth('INF', 'normal ' + targetFontSize + 'px arial') + 2;
    //if (targetTextWidth > this.state.thumb.width /3)

    this.state.text = {
      width: targetTextWidth,
      height: this.state.container.innerHeight * 0.98 - 2,
      tickWidth: (this.state.thumb.width * 2) / 3,
      fontSize: targetFontSize,
    };
    this.state.text.top =
      (this.state.container.innerHeight - this.state.text.height) / 2;
    this.state.text.tickLeft =
      this.state.text.width +
      this.state.spacing.textTickGap +
      this.state.container.leftPad;

    let targetTickWidth =
      this.state.track.left -
      this.state.text.tickLeft -
      this.state.spacing.centerGap;
    if (targetTickWidth < this.state.text.tickWidth) {
      this.state.text.tickWidth = targetTickWidth;
    }
    this.state.tick = {
      width: this.state.text.tickWidth * 0.6,
    };
    this.state.tick.left =
      this.state.text.tickLeft +
      (this.state.text.tickWidth - this.state.tick.width) / 2 -
      1;
    this.state.tick.spacing = this.state.text.height / 50;
    if (this.state.tick.spacing < 4) {
      this.state.tick.spacing = this.state.tick.spacing * 2;
    }

    //console.log("container:", this.state.thumb)

    /*  this.state.width = props.width ? props.width : 100; /* done */

    // this.state.leftPad = props.leftPad ? props.leftPad : this.state.width * 0.05; /* done */
    // this.state.rightPad = props.rightPad ? props.rightPad : this.state.leftPad; /* done */
    // this.state.centerGap = props.centerGap ? props.centerGap : this.state.width * 0.03; /* done */
    // this.state.textTickGap = props.textTickGap ? props.textTickGap : this.state.width * 0.02; /* done */

    // this.state.thumbWidth = (this.state.width-this.state.leftPad - this.state.rightPad-this.state.centerGap - this.state.textTickGap)/2; /* done */
    // this.state.textWidth = this.state.thumbWidth /3; /* done */
    // this.state.tickWidth = this.state.thumbWidth-this.state.textWidth;
    // this.state.trackWidth = props.trackWidth ? props.trackWidth : this.state.thumbWidth * 0.4; /* done */
    // this.state.fillWidth = props.fillWidth ? props.fillWidth : this.state.trackWidth / 5; /* done */

    // this.state.thumbLeft = (this.state.width-this.state.rightPad-this.state.leftPad) - this.state.thumbWidth; /* done */
    // this.state.textRight = this.state.leftPad + this.state.textWidth; /* done */
    // this.state.tickLeft = this.state.textRight + this.textTickGap; /* done */
    // this.state.trackLeft = this.state.thumbLeft + ((this.state.thumbWidth-this.state.trackWidth)/2); /* done */
    // this.state.fillLeft = this.state.trackLeft + ((this.state.trackWidth-this.state.fillWidth)/2) + 1; //is the +1 for the broder? /* done */
    // console.log("track left", this.state.trackLeft)
    var linear_range = 8192;
    const vlabels = {};
    vlabels[0] = 'INF';
    vlabels[linear_range * 0.12] = '-36';
    vlabels[linear_range * 0.18] = '-24';
    vlabels[linear_range * 0.26] = '-18';
    vlabels[linear_range * 0.34] = '-12';
    vlabels[linear_range * 0.56] = '-6';
    vlabels[linear_range * 0.78] = '0';
    vlabels[linear_range * 1] = '6';
    this.state.vlabels = vlabels;
    this.state.linear_range = linear_range;
  }

  componentDidUpdate(prevProps) {
    if (this.props.volume !== prevProps.volume) {
      this.setState({
        volume: this.props.volume,
      });
    }
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value,
    });
    this.props.handleChangeVolume(this.state.volume);
  };

  handleChangeStart = () => {
    console.log('Change event started');
  };

  handleChangeComplete = () => {
    console.log('Change event completed : ', this.state.volume);
    this.props.handleChangeVolume(this.state.volume);
  };

  render() {
    let { volume } = this.state;

    return (
      /*       <Styles containerWidth={this.state.containerWidth} 
              containerHeight={this.state.containerHeight} 
              topMargin={this.state.topMargin} 
              bottomMargin={this.state.bottomMargin} 
              sliderWidth={this.state.sliderWidth} 
              sliderLeft = {this.state.sliderLeft}
              trackWidth={this.state.trackWidth}
              handleWidth = {this.state.handleWidth}
              sideMargin = {this.state.sideMargin}
              fillWidth = {this.state.fillWidth}
              borderRadius={5}
              > */
      <Styles
        /*  height = {this.state.height}
          width = {this.state.width}
          topPad = {this.state.topPad}
          bottomPad = {this.state.bottomPad}
          trackHeight = {this.state.trackHeight}
          
          leftPad = {this.state.leftPad}
          rightPad = {this.state.rightPad}
          centerGap = {this.state.centerGap}
          textTickGap = {this.state.textTickGap}

          thumbWidth = {this.state.thumbWidth}
          textWidth = {this.state.textWidth}
          tickWidth = {this.state.tickWidth}
          trackWidth = {this.state.trackWidth}
          fillWidth = {this.state.fillWidth}

          thumbLeft = {this.state.thumbLeft}
          textRight = {this.state.textRight}
          tickLeft = {this.state.tickWidth}
          trackLeft = {this.state.trackLeft}
          fillLeft = {this.state.fillLeft} */
        container={this.state.container}
        spacing={this.state.spacing}
        thumb={this.state.thumb}
        track={this.state.track}
        fill={this.state.fill}
        text={this.state.text}
        tick={this.state.tick}
      >
        <div className='vSlider'>
          <Slider
            value={volume}
            min={0}
            max={this.state.linear_range}
            orientation='vertical'
            onChangeStart={this.handleChangeStart}
            onChange={this.handleOnChange}
            onChangeComplete={this.handleChangeComplete}
            innerTrackOffset={this.state.track.height * 0.01}
            tooltip={false}
            labels={this.state.vlabels}
            handleTrackHeight={this.state.text.height}
            handleTrackTop={this.state.text.top}
          />
        </div>
        <div className='value'>{volume}</div>
      </Styles>
    );
  }
}

export default VolumeSlider;
