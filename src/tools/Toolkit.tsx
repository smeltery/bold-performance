import { useState } from "react";
import Icon, { type IconName } from "../components/Icon";
import PlateCalculator from "./PlateCalculator";
import RestTimer from "./RestTimer";
import WeekPlanner from "./WeekPlanner";
const tools: { name: string; icon: IconName; detail: string }[] = [
  {
    name: "Plate calculator",
    icon: "dumbbell",
    detail: "Know what goes on the bar",
  },
  { name: "Rest timer", icon: "timer", detail: "Keep your session on track" },
  {
    name: "Weekly planner",
    icon: "calendar",
    detail: "Make a plan you can follow",
  },
];
export default function Toolkit() {
  const [active, setActive] = useState(0);
  return (
    <>
      <div
        className="tool-selector"
        role="group"
        aria-label="Choose a training tool"
      >
        {tools.map((tool, index) => (
          <button
            key={tool.name}
            aria-pressed={active === index}
            aria-controls={`tool-${index}`}
            onClick={() => setActive(index)}
          >
            <Icon name={tool.icon} size={25} />
            <span>
              {tool.name}
              <small>{tool.detail}</small>
            </span>
          </button>
        ))}
      </div>
      <section className="tool-workspace" aria-label="Training workspace">
        {[<PlateCalculator />, <RestTimer />, <WeekPlanner />].map(
          (tool, index) => (
            <div
              key={tools[index].name}
              id={`tool-${index}`}
              hidden={active !== index}
            >
              <h2 className="eyebrow">{tools[index].name}</h2>
              {tool}
            </div>
          ),
        )}
      </section>
    </>
  );
}
