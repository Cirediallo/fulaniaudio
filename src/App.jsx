import React from 'react';
import {createRoot } from 'react-dom/client';

import RecordVoice from './RecordVoice';
import VoiceRecorder from './VoiceRecorder';

const App = () => {
    return (
      <div id="record">
        <h1>Record your voice</h1>
        <VoiceRecorder />
      </div>
    );
  };
  
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

