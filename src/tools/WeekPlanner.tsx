import { useState } from "react";
import { activities, days, summarizeWeek } from "./math";
export default function WeekPlanner() {
  const [plan, setPlan] = useState(days.map(() => "Rest"));
  const { sessions, rest } = summarizeWeek(plan);
  function download() {
    const text =
      "MY TRAINING WEEK\n\n" +
      days.map((day, index) => `${day}: ${plan[index]}`).join("\n") +
      "\n\nPlanned with Bold Performance.\n";
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-training-week.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="tool-grid">
      <div>
        <h3>Make room for the work.</h3>
        <p>
          Give your week a simple structure. Pick a focus for each day, then
          bring your plan to a conversation with Brock.
        </p>
        <div className="week-grid">
          {days.map((day, index) => (
            <label key={day}>
              {day}
              <select
                value={plan[index]}
                onChange={(event) =>
                  setPlan(
                    plan.map((value, i) =>
                      i === index ? event.target.value : value,
                    ),
                  )
                }
              >
                {activities.map((activity) => (
                  <option key={activity}>{activity}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>
      <div className="tool-result" aria-live="polite">
        <span className="eyebrow">YOUR WEEK AT A GLANCE</span>
        <strong className="result-number">
          {sessions}
          <small>planned sessions</small>
        </strong>
        <p>
          {rest} {rest === 1 ? "day" : "days"} set aside for rest.
        </p>
        <p className="tool-note">
          This is your schedule, not a prescribed training program. Choose a
          workload that suits your experience and recovery.
        </p>
        <button className="button" onClick={download}>
          Download your week
        </button>
        <button
          className="reset-plan"
          onClick={() => setPlan(days.map(() => "Rest"))}
        >
          Clear plan
        </button>
      </div>
    </div>
  );
}
