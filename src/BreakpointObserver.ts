import { BreakpointMapper } from './BreakpointMapper';
import { WindowAdapter } from './lib/WindowAdapter';

interface IBreakpointEntry {
  width: number;
  callbackHandler: (breakpoint, direction) => void;
}

interface IBreakpointListenersEntry {
  [key: string]: IBreakpointEntry;
}

export const BreakpointObserver = (() => {
  let lastWindowInnerWidth: number = WindowAdapter.innerWidth();
  const breakpointListeners: IBreakpointListenersEntry = {};

  const subscribeListenerByBreakPointName = (
    breakpoint: string,
    callbackHandler: (breakpoint, direction) => void
  ) => {
    if (!BreakpointMapper.hasItem(breakpoint)) {
      throw new Error(`Breakpoint ${breakpoint} is undefined`);
    }

    breakpointListeners[breakpoint] = {
      callbackHandler,
      width: BreakpointMapper.getBreakpointWidth(breakpoint),
    };
  };

  const subscribeListenerByBreakPointArray = (
    breakpoints: string[],
    callbackHandler: (breakpoint, direction) => void
  ) => {
    breakpoints.map((breakpoint) => subscribe(breakpoint, callbackHandler));
  };

  const subscribe = (
    breakpoint: string | string[],
    callbackHandler: (breakpoint, direction) => void
  ) => {
    if (Array.isArray(breakpoint)) {
      subscribeListenerByBreakPointArray(breakpoint, callbackHandler);
    } else {
      subscribeListenerByBreakPointName(breakpoint, callbackHandler);
    }
  };

  const hasBreakpointBeenPassedByGrowing = (breakpoint) => {
    return (
      lastWindowInnerWidth < breakpoint &&
      WindowAdapter.innerWidth() >= breakpoint
    );
  };

  const hasBreakpointBeenPassedByShrinking = (breakpoint) => {
    return (
      lastWindowInnerWidth >= breakpoint &&
      WindowAdapter.innerWidth() < breakpoint
    );
  };

  const fireListeners = (breakpoint, resizeDirection) => {
    breakpointListeners[breakpoint].callbackHandler(
      breakpoint,
      resizeDirection
    );
  };

  WindowAdapter.addEventListener('resize', () => {
    const availableBreakpoints: Array<{
      point: string;
      width: number;
    }> = Object.keys(breakpointListeners).map(
      (item: string): { point: string; width: number } => {
        return {
          point: item,
          width: breakpointListeners[item].width,
        };
      }
    );

    availableBreakpoints.forEach((breakpoint) => {
      if (hasBreakpointBeenPassedByGrowing(breakpoint.width)) {
        fireListeners(breakpoint.point, 'growing');
      } else if (hasBreakpointBeenPassedByShrinking(breakpoint.width)) {
        fireListeners(breakpoint.point, 'shrinking');
      }
    });

    lastWindowInnerWidth = window.innerWidth;
  });

  return {
    subscribe,
  };
})();
