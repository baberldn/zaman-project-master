import React, { useEffect, useState } from 'react';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  
  // Yeni state: başta verdiğimiz dakika ve saniyeleri saklayacak
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (running && !paused && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0 && running) {
      setRunning(false);
    }

    return () => clearInterval(timer);
  }, [running, paused, time]);

  const handleMinutesChange = (e) => {
    const newMinutes = Number(e.target.value);
    setMinutes(newMinutes);
    setInitialMinutes(newMinutes); // Başlangıç değerini saklıyoruz
  };

  const handleSecondsChange = (e) => {
    const newSeconds = Number(e.target.value);
    setSeconds(newSeconds);
    setInitialSeconds(newSeconds); // Başlangıç değerini saklıyoruz
  };

  const togglePauseResume = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  const startButton = () => {
    const totalTime = minutes * 60 + seconds;
    setTime(totalTime);
    setRunning(true);
    setPaused(false);
  };

  const resetButton = () => {
    setMinutes(initialMinutes); // Verilen başlangıç dakikasına dön
    setSeconds(initialSeconds); // Verilen başlangıç saniyesine dön
    setTime(initialMinutes * 60 + initialSeconds); // Başlangıç zamanına dön
    setRunning(false);
    setPaused(false);
  };

  const formatTime = () => {
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = (time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4 border border-black">
        <div className="mb-4 w-full">
          <label className="block text-lg font-semibold mb-2 text-black">Dakika:</label>
          <input
            type="number"
            value={minutes}
            onChange={handleMinutesChange}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-lg font-semibold mb-2 text-black">Saniye:</label>
          <input
            type="number"
            value={seconds}
            onChange={handleSecondsChange}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <div className="text-5xl font-bold mb-4 text-center text-black">{formatTime()}</div>
        <div className="flex flex-col space-y-4 w-full">
          <button
            onClick={startButton}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 w-full"
          >
            START
          </button>
          <button
            onClick={togglePauseResume}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 w-full"
          >
            {paused ? 'RESUME' : 'PAUSE'}
          </button>
          <button
            onClick={resetButton}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 w-full"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
