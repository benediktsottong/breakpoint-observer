import { BreakPoints } from './lib/config/BreakPoints';

export const BreakpointMapper = (() => {
  const hasItem = (breakpoint: string): boolean => {
    return breakpoint in BreakPoints;
  };

  const getBreakpointWidth = (breakpoint: string): number => {
    if (!hasItem(breakpoint)) {
      return 0;
    }

    return BreakPoints[breakpoint].width;
  };

  const getCurrentBreakpoint = (): string => {
    let currentBreakpoint;
    const availableBreakpoints = Object.keys(BreakPoints);

    for (let i = 0; i < Object.keys(BreakPoints).length; i++) {
      if (window.innerWidth >= BreakPoints[availableBreakpoints[i]].width) {
        currentBreakpoint = availableBreakpoints[i];
      }
    }

    return currentBreakpoint;
  };

  return {
    hasItem,
    getBreakpointWidth,
    getCurrentBreakpoint,
  };
})();
