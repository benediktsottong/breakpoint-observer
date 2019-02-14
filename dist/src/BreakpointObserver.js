"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BreakpointMapper_1 = require("./BreakpointMapper");
const WindowAdapter_1 = require("./lib/WindowAdapter");
/**
 * @returns {{subscribe}}
 */
exports.BreakpointObserver = (() => {
    let lastWindowInnerWidth = WindowAdapter_1.WindowAdapter.innerWidth();
    const breakpointListeners = {};
    /**
     * @param {String} breakpoint
     * @param {Function} callbackHandler
     */
    const subscribeListenerByBreakPointName = (breakpoint, callbackHandler) => {
        /**
         * if given breakpoint known
         */
        if (!BreakpointMapper_1.BreakpointMapper.hasItem(breakpoint)) {
            throw new Error(`Breakpoint ${breakpoint} is undefined`);
        }
        /**
         * add given breakpoint and bind handler
         */
        breakpointListeners[breakpoint] = {
            callbackHandler,
            width: BreakpointMapper_1.BreakpointMapper.getBreakpointWidth(breakpoint),
        };
    };
    /**
     * @param {String} breakpoints
     * @param {Function} callbackHandler
     */
    const subscribeListenerByBreakPointArray = (breakpoints, callbackHandler) => {
        breakpoints.map((breakpoint) => subscribe(breakpoint, callbackHandler));
    };
    /**
     * @param {Array|String} breakpoint
     * @param {Function} callbackHandler
     * @returns {function()}
     */
    const subscribe = (breakpoint, callbackHandler) => {
        /**
         * only during the first call the breakpoint param is a array (->App.jsx)
         */
        if (Array.isArray(breakpoint)) {
            subscribeListenerByBreakPointArray(breakpoint, callbackHandler);
        }
        else {
            subscribeListenerByBreakPointName(breakpoint, callbackHandler);
        }
    };
    /**
     * @param {Number} breakpoint
     * @returns {boolean}
     */
    const hasBreakpointBeenPassedByGrowing = (breakpoint) => {
        return (lastWindowInnerWidth < breakpoint &&
            WindowAdapter_1.WindowAdapter.innerWidth() >= breakpoint);
    };
    /**
     * @param {Number} breakpoint
     * @return {boolean}
     */
    const hasBreakpointBeenPassedByShrinking = (breakpoint) => {
        return (lastWindowInnerWidth >= breakpoint &&
            WindowAdapter_1.WindowAdapter.innerWidth() < breakpoint);
    };
    /**
     * @param {String} breakpoint
     * @param {String} resizeDirection
     */
    const fireListeners = (breakpoint, resizeDirection) => {
        /**
         * search breakpoint in ListenerList and call the handler
         */
        breakpointListeners[breakpoint].callbackHandler(breakpoint, resizeDirection);
    };
    /**
     * Add EventListener on Window.Resize
     */
    WindowAdapter_1.WindowAdapter.addEventListener('resize', () => {
        const availableBreakpoints = Object.keys(breakpointListeners).map((item) => {
            return {
                point: item,
                width: breakpointListeners[item].width,
            };
        });
        /**
         * loop though all breakpoints
         */
        availableBreakpoints.forEach((breakpoint) => {
            if (hasBreakpointBeenPassedByGrowing(breakpoint.width)) {
                /**
                 * search breakpoint in ListenerList and call the handler
                 */
                fireListeners(breakpoint.point, 'growing');
            }
            else if (hasBreakpointBeenPassedByShrinking(breakpoint.width)) {
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
//# sourceMappingURL=BreakpointObserver.js.map