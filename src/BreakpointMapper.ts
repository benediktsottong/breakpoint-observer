import { BreakPoints } from './lib/config/BreakPoints';

export const BreakpointMapper = (() => {
  const hasItem = (breakpoint: string): boolean => {
    return breakpoint in BreakPoints;
  };

  const getBreakpointWidth = (breakpoint: string): number => {
    /**
     * if breakpoint is NOT known
     */
    if (!hasItem(breakpoint)) {
      /**
       * return given input
       */
      return 0;
    }

    return BreakPoints[breakpoint].width;
  };

  /**
   * @returns {String}
   */
  const getCurrentBreakpoint = (): string => {
    let currentBreakpoint;
    const availableBreakpoints = Object.keys(BreakPoints);

    /**
     * loop through breakpoints
     */
    for (let i = 0; i < Object.keys(BreakPoints).length; i++) {
      /**
       * if window width greater/same as defined breakpoint width
       */
      if (window.innerWidth >= BreakPoints[availableBreakpoints[i]].width) {
        currentBreakpoint = availableBreakpoints[i];
        /**
         * <- set current breakpoint to returnable variable
         */
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
