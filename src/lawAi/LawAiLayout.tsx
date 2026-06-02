import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './law-ai.css';

/** Wraps /lawAi/* routes with an isolated theme so the main SnowTech site styles stay intact. */
export function LawAiLayout() {
  return (
    <div className="law-ai-root relative z-[60] min-h-dvh">
      <Link
        to="/"
        className="fixed left-3 top-3 z-[70] inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-foreground sm:left-4 sm:top-4 sm:text-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        SnowTech
      </Link>
      <Outlet />
    </div>
  );
}
