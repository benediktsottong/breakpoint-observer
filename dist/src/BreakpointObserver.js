"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BreakpointMapper_1 = require("./BreakpointMapper");
const WindowAdapter_1 = require("./lib/WindowAdapter");
exports.BreakpointObserver = (() => {
    let lastWindowInnerWidth = WindowAdapter_1.WindowAdapter.innerWidth();
    const breakpointListeners = {};
    const subscribeListenerByBreakPointName = (breakpoint, callbackHandler) => {
        if (!BreakpointMapper_1.BreakpointMapper.hasItem(breakpoint)) {
            throw new Error(`Breakpoint ${breakpoint} is undefined`);
        }
        breakpointListeners[breakpoint] = {
            callbackHandler,
            width: BreakpointMapper_1.BreakpointMapper.getBreakpointWidth(breakpoint),
        };
    };
    const subscribeListenerByBreakPointArray = (breakpoints, callbackHandler) => {
        breakpoints.map((breakpoint) => subscribe(breakpoint, callbackHandler));
    };
    const subscribe = (breakpoint, callbackHandler) => {
        if (Array.isArray(breakpoint)) {
            subscribeListenerByBreakPointArray(breakpoint, callbackHandler);
        }
        else {
            subscribeListenerByBreakPointName(breakpoint, callbackHandler);
        }
    };
    const hasBreakpointBeenPassedByGrowing = (breakpoint) => {
        return (lastWindowInnerWidth < breakpoint &&
            WindowAdapter_1.WindowAdapter.innerWidth() >= breakpoint);
    };
    const hasBreakpointBeenPassedByShrinking = (breakpoint) => {
        return (lastWindowInnerWidth >= breakpoint &&
            WindowAdapter_1.WindowAdapter.innerWidth() < breakpoint);
    };
    const fireListeners = (breakpoint, resizeDirection) => {
        breakpointListeners[breakpoint].callbackHandler(breakpoint, resizeDirection);
    };
    WindowAdapter_1.WindowAdapter.addEventListener('resize', () => {
        const availableBreakpoints = Object.keys(breakpointListeners).map((item) => {
            return {
                point: item,
                width: breakpointListeners[item].width,
            };
        });
        availableBreakpoints.forEach((breakpoint) => {
            if (hasBreakpointBeenPassedByGrowing(breakpoint.width)) {
                fireListeners(breakpoint.point, 'growing');
            }
            else if (hasBreakpointBeenPassedByShrinking(breakpoint.width)) {
                fireListeners(breakpoint.point, 'shrinking');
            }
        });
        lastWindowInnerWidth = window.innerWidth;
    });
    return {
        subscribe,
    };
})();
//# sourceMappingURL=BreakpointObserver.js.map