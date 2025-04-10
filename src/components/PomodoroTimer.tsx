import { useState, useEffect } from 'react';

interface timerProps {
  workTime?: number; // in minutes
  breakTime?: number; // in minutes
  logActivity: (activityType: string, startTime: Date, duration: number) => void;
}

const PomodoroTimer = ({ workTime = 25, breakTime = 5, logActivity }: timerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds <= 1) {
          clearInterval(interval);
          const endTime = new Date();
          if (isWorkTime) {
            // Log the end of a work session
            logActivity('Work', startTime!, workTime);
            setIsWorkTime(false);
            setStartTime(endTime);
            return breakTime * 60;
          } else {
            // Log the end of a break session
            logActivity('Break', startTime!, breakTime);
            setIsWorkTime(true);
            setStartTime(endTime);
            return workTime * 60;
          }
        }
        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isWorkTime, workTime, breakTime]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsWorkTime(true);
    setSecondsLeft(workTime * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="pomodoro-container">
      <h2 className="pomodoro-title">{isWorkTime ? 'Work Time' : 'Break Time'}</h2>

      <div className="pomodoro-timer">{formatTime(secondsLeft)}</div>

      <div className="pomodoro-status">
        {isActive ? `${isWorkTime ? 'Working' : 'Taking a break'}...` : 'Timer paused'}
      </div>

      <div className="pomodoro-controls">
        <button
          className={`pomodoro-button ${isActive ? 'pause' : 'start'}`}
          onClick={handleStartPause}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>

        <button className="pomodoro-button reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
