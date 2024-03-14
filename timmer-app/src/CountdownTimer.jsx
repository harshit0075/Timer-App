import React, { useState, useEffect, useRef } from 'react';

function CountdownTimer() {
  const [seconds, setSeconds] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);
  
  // Use useRef to hold the interval reference
  const intervalRef = useRef(null);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, initialSeconds]);

  const toggleTimer = () => {
    if (initialSeconds === 0) {
      alert("Please enter a valid number.");
      return;
    }
    setIsActive(prevIsActive => !prevIsActive);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setSeconds(initialSeconds); // Reset timer to initial value
  };

  const handleInputChange = () => {
    const inputValue = inputRef.current.value;
    if (!isNaN(inputValue) && inputValue >= 0) {
      setInitialSeconds(parseInt(inputValue));
    }
  };

  return (
    <div className="countdown-container">
      <h1 className="countdown-timer">Countdown Timer: {seconds}s</h1>
      <div className="input-container">
        <input ref={inputRef} type="number" min="0" placeholder="Enter seconds" onChange={handleInputChange} />
      </div>
      <div className="button-container">
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default CountdownTimer;
