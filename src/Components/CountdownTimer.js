import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [countdownTime, setCountdownTime] = useState(3600); // 2 hours in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (timerRunning && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerRunning, countdownTime]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setCountdownTime(3600); // Reset to 2 hours
    setTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Countdown Timer</h1>
      <div className="mb-4">
        <div className="flex items-center">
          <label className="mr-2">Set Countdown Time (in hours):</label>
          <input
            type="number"
            min="0"
            value={countdownTime / 3600}
            onChange={(e) => setCountdownTime(e.target.value * 3600)}
            disabled={timerRunning}
            className="w-16 border rounded p-1"
          />
        </div>
      </div>
      <div className="text-4xl font-bold">{formatTime(countdownTime)}</div>
      <div className="mt-4">
        <button
          onClick={startTimer}
          disabled={timerRunning}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={!timerRunning}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Stop
        </button>
        <button
          onClick={resetTimer}
          disabled={timerRunning}
          className="bg-gray-300 hover:bg-gray-500 text-gray-600 font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default CountdownTimer;
