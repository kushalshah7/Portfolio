import { memo, type CSSProperties } from "react";

// Original vector artwork: flowing network signals, with no image or video download.
const lanes = Array.from({ length: 18 }, (_, index) => {
  const x = 38 + index * 81;
  const turn = index % 2 ? 29 : -29;
  const bend = 155 + index % 5 * 76;
  return { x, bend, path: `M${x},-140 V${bend} l${turn},29 V${bend + 210} l${-turn},29 V1040` };
});

export const SignalBackground = memo(function SignalBackground() {
  return <div className="signal-field">
    <div className="signal-glow signal-glow--cyan"/>
    <div className="signal-glow signal-glow--red"/>
    <div className="signal-grid"/>
    <div className="signal-space">
      <div className="signal-floor"/>
      {[0, 1, 2].map(index => <div className={`signal-cube signal-cube--${index}`} key={index}>
        {["front", "back", "left", "right", "top", "bottom"].map(face => <div className={`signal-cube__face signal-cube__face--${face}`} key={face}/>)}
      </div>)}
    </div>
    <svg className="signal-traces" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      {lanes.map(({ x, bend, path }, index) => <g key={x} className={index % 3 === 0 ? "signal-lane signal-lane--red" : "signal-lane"} style={{ "--signal-delay": `${-index * .37}s`, "--signal-duration": `${3.2 + index % 4 * .3}s` } as CSSProperties}>
        <path className="signal-wire" d={path}/>
        <path className="signal-current signal-current--glow" d={path}/>
        <path className="signal-current" d={path}/>
        <circle className="signal-node" cx={x} cy={bend - 30} r={3}/>
        <circle className="signal-node signal-node--secondary" cx={x} cy={bend + 345} r={2}/>
      </g>)}
    </svg>
    <div className="signal-sweep"/>
  </div>;
});
