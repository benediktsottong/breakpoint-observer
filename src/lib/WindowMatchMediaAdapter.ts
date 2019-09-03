import { BreakPoints } from './config/BreakPoints';
import { WindowAdapter } from './WindowAdapter';

export const WindowMatchMediaAdapter = (() => {
  const isMobileBreakPoint = () => isBreakpointMatchMedia(['xxs', 'xs', 's']);
  const isTabletBreakPoint = () => isBreakpointMatchMedia(['m']);
  const isBreakPointTabletOrLower = () =>
    isTabletBreakPoint() || isMobileBreakPoint();

  const breakPointAvailable = (breakpoints, currentBreakPoint) =>
    breakpoints.indexOf(currentBreakPoint) !== -1;

  const matchMedia = (query) => WindowAdapter.matchMedia(query);

  const currentBreakPointIsReached = (breakpoints, currentBreakPoint) =>
    breakPointAvailable(breakpoints, currentBreakPoint) &&
    matchMedia(BreakPoints[currentBreakPoint].mediaQuery);

  const isBreakpointMatchMedia = (breakpoints): boolean => {
    if (window) {
      const currentBreakPointList = Object.keys(BreakPoints);

      currentBreakPointList.forEach((currentBreakPoint) => {
        if (currentBreakPointIsReached(breakpoints, currentBreakPoint)) {
          return true;
        }
      });
    }

    return false;
  };

  return {
    isBreakPointTabletOrLower,
  };
})();
