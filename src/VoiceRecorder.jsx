import { useState } from 'react';

function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [formValue, setFormValue] = useState('');

  const handleStartRecording = () => {
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks);
          const audioURL = URL.createObjectURL(audioBlob);
          setAudioURL(audioURL);
        });

        setTimeout(() => {
          mediaRecorder.stop();
          setRecording(false);
        }, 5000); // Stop recording after 5 seconds
      });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(`Form submitted with audio input: ${formValue}`);
  }

  const handleFormChange = (event) => {
    setFormValue(event.target.value);
  }

  return (
    <div>
      {audioURL && (
        <audio src={audioURL} controls />
      )}
      {!recording && !audioURL && (
        <button onClick={handleStartRecording}>Appuyez pour commencer l'enregistrement</button>
      )}
      {recording && (
        <p>Recording...</p>
      )}
      {audioURL && (
        <form onSubmit={handleFormSubmit} className="submit_form">
          <label>
            Nom audio:
            <input type="text" value={formValue} onChange={handleFormChange} />
          </label>
          <button type="submit">Envoyer</button>
        </form>
      )}
    </div>
  );
}

export default VoiceRecorder;
