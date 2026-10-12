import { useState } from "react";
import { fields } from "./fields";
import { calculate, type Result } from "./calculate";
export default function Calculator({
  slug,
  note,
}: {
  slug: string;
  note: string;
}) {
  const definitions = fields[slug];
  const [values, setValues] = useState(
    Object.fromEntries(
      definitions.map((field) => [field.key, String(field.initial)]),
    ),
  );
  let result: Result[] = [];
  let error = "";
  try {
    if (Object.values(values).some((value) => !value.trim()))
      throw new Error("Complete each field to see your result.");
    result = calculate(
      slug,
      Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, Number(value)]),
      ),
    );
  } catch (reason) {
    error = reason instanceof Error ? reason.message : "Check your inputs.";
  }
  return (
    <div className="tool-grid">
      <div>
        <h3>Make it your own.</h3>
        <p>Change the example numbers to match your plan.</p>
        <div className="tool-fields">
          {definitions.map((field) => (
            <label key={field.key}>
              {field.label}
              {field.choices ? (
                <select
                  value={values[field.key]}
                  onChange={(event) =>
                    setValues({ ...values, [field.key]: event.target.value })
                  }
                >
                  {field.choices.map((label, index) => (
                    <option key={label} value={index}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.key]}
                  onChange={(event) =>
                    setValues({ ...values, [field.key]: event.target.value })
                  }
                />
              )}
            </label>
          ))}
        </div>
        <button
          className="reset-plan"
          onClick={() =>
            setValues(
              Object.fromEntries(
                definitions.map((field) => [field.key, String(field.initial)]),
              ),
            )
          }
        >
          Reset example
        </button>
      </div>
      <div className="tool-result" aria-live="polite">
        <span className="eyebrow">YOUR RESULTS</span>
        {error ? (
          <p role="status">{error}</p>
        ) : (
          <dl className="calculation-results">
            {result.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  {typeof item.value === "number"
                    ? item.value.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })
                    : item.value}{" "}
                  <small>{item.unit}</small>
                </dd>
              </div>
            ))}
          </dl>
        )}
        <p className="tool-note">{note}</p>
      </div>
    </div>
  );
}
