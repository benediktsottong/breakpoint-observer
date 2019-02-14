import { BreakPoints } from './config/BreakPoints';
import { WindowAdapter } from './WindowAdapter';

/**
 * @type {{isBreakPointTabletOrLower}}
 */
export const WindowMatchMediaAdapter = (() => {
  /**
   * @return {Boolean}
   */
  const isMobileBreakPoint = () => isBreakpointMatchMedia(['xxs', 'xs', 's']);

  /**
   * @return {Boolean}
   */
  const isTabletBreakPoint = () => isBreakpointMatchMedia(['m']);
  /**
   * @return {Boolean}
   */
  const isBreakPointTabletOrLower = () =>
    isTabletBreakPoint() || isMobileBreakPoint();

  /**
   * @param {Array} breakpoints
   * @param {String} currentBreakPoint
   * @returns {Boolean}
   */
  const breakPointAvailable = (breakpoints, currentBreakPoint) =>
    breakpoints.indexOf(currentBreakPoint) !== -1;

  /**
   * @param {String} query
   * @returns {Boolean}
   */
  const matchMedia = (query) => WindowAdapter.matchMedia(query);

  /**
   * @param {Array} breakpoints
   * @param {String} currentBreakPoint
   * @returns {Boolean}
   */
  const currentBreakPointIsReached = (breakpoints, currentBreakPoint) =>
    breakPointAvailable(breakpoints, currentBreakPoint) &&
    matchMedia(BreakPoints[currentBreakPoint].mediaQuery);

  /**
   * @param {Array} breakpoints
   * @return {boolean}
   */
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
