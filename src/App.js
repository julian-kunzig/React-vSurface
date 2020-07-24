import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import './v-slider.css';
//import './rangeslider.css';
import VolumeSlider from './components/slider';
import Knob from './components/knob.js';

const ENDPOINT = process.env.REACT_APP_API_URL;

const defaultVolumeNum = [1, 2, 3, 4, 5];
const socket = socketIOClient(ENDPOINT);

function App() {
  const [volume, setVolume] = useState([]);
  const [knob, setKnob] = useState([]);

  useEffect(() => {
    socket.on('slider', (data) => {
      const newVolume = volume.slice();
      newVolume[data.name - 1] = data.value;
      setVolume(newVolume);
    });
    return () => {
      socket.off('slider');
    };
  }, [volume]);

  useEffect(() => {
    socket.on('knob', (data) => {
      const newKnob = knob.slice();
      newKnob[data.name - 1] = data.value;
      setKnob(newKnob);
    });
    return () => {
      socket.off('knob');
    };
  }, [knob]);

  function sayHello() {
    socket.emit('slider', { name: 2, value: 4500 });
    /* const newVolume = volume.slice();
    newVolume[1] = 4000;
    setVolume(newVolume); */
  }

  const volumeSignalEmit = (e, i) => {
    socket.emit('slider', { name: i, value: e });
  };

  const knobSinglaEmit = (e, i) => {
    socket.emit('knob', { name: i, value: e });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        HELLO WORLD!
        {/* <VolumeSlider height={200} width={60} 
            /> */}
        <div className='mixer'>
          {defaultVolumeNum.map((i) => (
            <div key={i} className='flex-container'>
              <div
                style={{
                  flexBasis: '{80}px',
                  background: 'dimgrey',
                  margin: '3px',
                }}
              >
                <div>
                  <Knob
                    size={110}
                    value={knob[i - 1]}
                    handleChangeKnob={(e) => knobSinglaEmit(e, i)}
                  />
                </div>
              </div>
              <div
                style={{
                  flexBasis: '{80}px',
                  background: 'dimgrey',
                  margin: '3px',
                }}
              >
                row1a
              </div>
              <div
                style={{
                  height: '460px',
                  margin: '3px',
                  background: 'DarkSeaGreen',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div className='left'>
                  <div style={{ height: '27px', background: 'LightSlateGrey' }}>
                    child 1
                  </div>
                  <div
                    style={{
                      height: '406px',
                      background: 'dimgrey',
                      marginTop: '3px',
                      marginBottom: '3px',
                    }}
                  >
                    <div key={i} className='vStrip'>
                      <VolumeSlider
                        height={406}
                        width={80}
                        thumbWidth={36}
                        leftPad={2}
                        rightPad={4}
                        centerGap={8}
                        volume={volume[i - 1]}
                        handleChangeVolume={(e) => volumeSignalEmit(e, i)}
                      />
                    </div>
                  </div>
                  <div style={{ height: '27px', background: 'LightSlateGrey' }}>
                    {volume[i - 1]}
                  </div>
                </div>
                <div className='right'>x</div>
              </div>
              <div
                style={{ height: '80px', background: 'Gray', margin: '3px' }}
              >
                row3
              </div>
            </div>
          ))}
        </div>
        <button onClick={sayHello}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
