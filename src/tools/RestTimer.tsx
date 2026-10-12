import { useEffect, useRef, useState } from "react";
import { remainingSeconds } from "./math";
export default function RestTimer() {
  const [duration, setDuration] = useState(90);
  const [remaining, setRemaining] = useState(90);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const seconds = remainingSeconds(deadline.current, Date.now());
      setRemaining(seconds);
      if (seconds === 0) setRunning(false);
    };
    tick();
    const interval = setInterval(tick, 200);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [running]);
  function start() {
    deadline.current = Date.now() + (remaining || duration) * 1000;
    setRemaining(remaining || duration);
    setRunning(true);
  }
  function pause() {
    setRemaining(remainingSeconds(deadline.current, Date.now()));
    setRunning(false);
  }
  function choose(seconds: number) {
    setDuration(seconds);
    setRemaining(seconds);
    setRunning(false);
  }
  return (
    <div className="tool-grid">
      <div>
        <h3>Give your rest a rhythm.</h3>
        <p>
          Choose a rest interval between sets. Use the duration in your training
          plan, or agree on one with your coach.
        </p>
        <fieldset className="timer-presets">
          <legend>Rest interval</legend>
          {[30, 60, 90, 120, 180].map((seconds) => (
            <button
              key={seconds}
              aria-pressed={duration === seconds}
              onClick={() => choose(seconds)}
            >
              {seconds < 60 ? "30 sec" : `${seconds / 60} min`}
            </button>
          ))}
        </fieldset>
        <p className="tool-note">
          Keep this page open. The timer uses elapsed time to catch up after a
          background tab. It does not send notifications or play sound.
        </p>
      </div>
      <div className="tool-result">
        <span className="eyebrow">YOUR REST INTERVAL</span>
        <div
          className="timer-display"
          role="timer"
          aria-label={`${remaining} seconds remaining`}
        >
          {Math.floor(remaining / 60)
            .toString()
            .padStart(2, "0")}
          :{(remaining % 60).toString().padStart(2, "0")}
        </div>
        <div className="timer-actions">
          <button className="button" onClick={running ? pause : start}>
            {running
              ? "Pause"
              : remaining === 0
                ? "Start again"
                : remaining === duration
                  ? "Start timer"
                  : "Resume"}
          </button>
          <button className="secondary-button" onClick={() => choose(duration)}>
            Reset
          </button>
        </div>
        <p role="status">
          {remaining === 0
            ? "Rest complete. Ready for your next set?"
            : running
              ? "Timer running."
              : remaining === duration
                ? "Ready when you are."
                : "Timer paused."}
        </p>
      </div>
    </div>
  );
}
