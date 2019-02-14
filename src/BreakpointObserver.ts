import { BreakpointMapper } from './BreakpointMapper';
import { WindowAdapter } from './lib/WindowAdapter';

interface IBreakpointEntry {
  width: number;
  callbackHandler: (b, h) => {};
}

interface IBreakpointListenersEntry {
  [key: string]: IBreakpointEntry;
}

/**
 * @returns {{subscribe}}
 */
export const BreakpointObserver = (() => {
  let lastWindowInnerWidth: number = WindowAdapter.innerWidth();
  const breakpointListeners: IBreakpointListenersEntry = {};

  /**
   * @param {String} breakpoint
   * @param {Function} callbackHandler
   */
  const subscribeListenerByBreakPointName = (
    breakpoint: string,
    callbackHandler: () => {},
  ) => {
    /**
     * if given breakpoint known
     */
    if (!BreakpointMapper.hasItem(breakpoint)) {
      throw new Error(`Breakpoint ${breakpoint} is undefined`);
    }

    /**
     * add given breakpoint and bind handler
     */
    breakpointListeners[breakpoint] = {
      callbackHandler,
      width: BreakpointMapper.getBreakpointWidth(breakpoint),
    };
  };

  /**
   * @param {String} breakpoints
   * @param {Function} callbackHandler
   */
  const subscribeListenerByBreakPointArray = (
    breakpoints: string[],
    callbackHandler: () => {},
  ) => {
    breakpoints.map((breakpoint) => subscribe(breakpoint, callbackHandler));
  };

  /**
   * @param {Array|String} breakpoint
   * @param {Function} callbackHandler
   * @returns {function()}
   */
  const subscribe = (
    breakpoint: string | string[],
    callbackHandler: () => {},
  ) => {
    /**
     * only during the first call the breakpoint param is a array (->App.jsx)
     */
    if (Array.isArray(breakpoint)) {
      subscribeListenerByBreakPointArray(breakpoint, callbackHandler);
    } else {
      subscribeListenerByBreakPointName(breakpoint, callbackHandler);
    }
  };

  /**
   * @param {Number} breakpoint
   * @returns {boolean}
   */
  const hasBreakpointBeenPassedByGrowing = (breakpoint) => {
    return (
      lastWindowInnerWidth < breakpoint &&
      WindowAdapter.innerWidth() >= breakpoint
    );
  };

  /**
   * @param {Number} breakpoint
   * @return {boolean}
   */
  const hasBreakpointBeenPassedByShrinking = (breakpoint) => {
    return (
      lastWindowInnerWidth >= breakpoint &&
      WindowAdapter.innerWidth() < breakpoint
    );
  };

  /**
   * @param {String} breakpoint
   * @param {String} resizeDirection
   */
  const fireListeners = (breakpoint, resizeDirection) => {
    /**
     * search breakpoint in ListenerList and call the handler
     */
    breakpointListeners[breakpoint].callbackHandler(
      breakpoint,
      resizeDirection
    );
  };

  /**
   * Add EventListener on Window.Resize
   */
  WindowAdapter.addEventListener('resize', () => {
    const availableBreakpoints: Array<{ point: string; width: number }> = Object.keys(breakpointListeners).map(
      (item: string): { point: string; width: number } => {
        return {
          point: item,
          width: breakpointListeners[item].width,
        };
      },
    );
    /**
     * loop though all breakpoints
     */
    availableBreakpoints.forEach((breakpoint) => {
      if (hasBreakpointBeenPassedByGrowing(breakpoint.width)) {
        /**
         * search breakpoint in ListenerList and call the handler
         */
        fireListeners(breakpoint.point, 'growing');
      } else if (hasBreakpointBeenPassedByShrinking(breakpoint.width)) {
        /**
         * search breakpoint in ListenerList and call the handler
         */
        fireListeners(breakpoint.point, 'shrinking');
      }
    });

    lastWindowInnerWidth = window.innerWidth;
  });

  return {
    subscribe,
  };
})();
