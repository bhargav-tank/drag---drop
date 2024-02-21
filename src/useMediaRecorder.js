// useMediaRecorder.js

import { useState, useEffect } from 'react';

const useMediaRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          // Do something with the recorded audio blob
        };
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [audioChunks, mediaRecorder]);

  const startRecording = () => {
    if (mediaRecorder) {
      setAudioChunks([]);
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return { startRecording, stopRecording, isRecording };
};

export default useMediaRecorder;
