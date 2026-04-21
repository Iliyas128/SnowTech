import { type ReactNode } from 'react';

export type LogoItem = {
  name: string;
  icon: ReactNode;
};

type LogoLoopProps = {
  logos: LogoItem[];
  /** Animation duration in seconds for one full loop. Higher = slower. */
  speed?: number;
  /** Reverse scroll direction. */
  reverse?: boolean;
  /** Pause on hover (desktop only). */
  pauseOnHover?: boolean;
  className?: string;
};

const LogoLoop = ({
  logos,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className = '',
}: LogoLoopProps) => {
  // Duplicate the list so that when the first copy scrolls out of view,
  // the second copy is already fully visible — creating a seamless loop.
  const loopItems = [...logos, ...logos];

  return (
    <div
      className={`logo-loop ${pauseOnHover ? 'logo-loop--hover-pause' : ''} ${className}`}
      role="list"
      aria-label="Technology stack"
      style={
        {
          '--logo-loop-duration': `${speed}s`,
          '--logo-loop-direction': reverse ? 'reverse' : 'normal',
        } as React.CSSProperties
      }
    >
      <div className="logo-loop-track">
        {loopItems.map((logo, index) => (
          <div
            className="logo-loop-item"
            key={`${logo.name}-${index}`}
            role={index < logos.length ? 'listitem' : 'presentation'}
            aria-hidden={index >= logos.length}
          >
            <span className="logo-loop-icon" aria-hidden="true">
              {logo.icon}
            </span>
            <span className="logo-loop-name">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
