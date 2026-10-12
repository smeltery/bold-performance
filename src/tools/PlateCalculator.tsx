import { useState } from "react";
import { loadBar, type Unit } from "./math";
export default function PlateCalculator() {
  const [unit, setUnit] = useState<Unit>("lb");
  const [target, setTarget] = useState("135");
  const [bar, setBar] = useState("45");
  const result =
    target !== "" && bar !== ""
      ? loadBar(Number(target), Number(bar), unit)
      : null;
  function changeUnit(value: Unit) {
    setUnit(value);
    setTarget(value === "lb" ? "135" : "60");
    setBar(value === "lb" ? "45" : "20");
  }
  return (
    <div className="tool-grid">
      <div>
        <h3>Load it with confidence.</h3>
        <p>
          Enter the total weight, including the bar. See which plates to put on
          each side.
        </p>
        <div className="tool-fields">
          <label>
            Units
            <select
              value={unit}
              onChange={(event) => changeUnit(event.target.value as Unit)}
            >
              <option value="lb">Pounds (lb)</option>
              <option value="kg">Kilograms (kg)</option>
            </select>
          </label>
          <label>
            Bar weight ({unit})
            <input
              type="number"
              min="0"
              max="2000"
              step="any"
              value={bar}
              onChange={(event) => setBar(event.target.value)}
            />
          </label>
          <label>
            Total weight ({unit})
            <input
              type="number"
              min="0"
              max="2000"
              step="any"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
            />
          </label>
        </div>
        <p className="tool-note">
          Assumes standard plates and matching pairs, with no inventory limit.
          Collar weight is not included. Changing units resets the example.
        </p>
      </div>
      <div className="tool-result" aria-live="polite">
        <span className="eyebrow">ON EACH SIDE</span>
        {result ? (
          <>
            <strong className="result-number">
              {result.total} <small>{unit} total</small>
            </strong>
            <div className="plate-stack">
              {result.stack.map(({ weight, count }) => (
                <span key={weight}>
                  {count} × {weight} {unit}
                </span>
              ))}
            </div>
            <p>
              {result.stack.length
                ? "Load the same plates on both sides."
                : "Just the bar. No plates needed."}
            </p>
            {result.shortfall > 0 && (
              <p>
                Nearest load below your target. Add{" "}
                {result.shortfall.toFixed(2)} {unit} total with smaller plates
                to reach it exactly.
              </p>
            )}
          </>
        ) : (
          <p role="alert">
            Enter a total at least as heavy as the bar, up to 2,000 {unit}.
          </p>
        )}
      </div>
    </div>
  );
}
