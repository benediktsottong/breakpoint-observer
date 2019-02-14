"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BreakPoints_1 = require("./config/BreakPoints");
const WindowAdapter_1 = require("./WindowAdapter");
/**
 * @type {{isBreakPointTabletOrLower}}
 */
exports.WindowMatchMediaAdapter = (() => {
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
    const isBreakPointTabletOrLower = () => isTabletBreakPoint() || isMobileBreakPoint();
    /**
     * @param {Array} breakpoints
     * @param {String} currentBreakPoint
     * @returns {Boolean}
     */
    const breakPointAvailable = (breakpoints, currentBreakPoint) => breakpoints.indexOf(currentBreakPoint) !== -1;
    /**
     * @param {String} query
     * @returns {Boolean}
     */
    const matchMedia = (query) => WindowAdapter_1.WindowAdapter.matchMedia(query);
    /**
     * @param {Array} breakpoints
     * @param {String} currentBreakPoint
     * @returns {Boolean}
     */
    const currentBreakPointIsReached = (breakpoints, currentBreakPoint) => breakPointAvailable(breakpoints, currentBreakPoint) &&
        matchMedia(BreakPoints_1.BreakPoints[currentBreakPoint].mediaQuery);
    /**
     * @param {Array} breakpoints
     * @return {boolean}
     */
    const isBreakpointMatchMedia = (breakpoints) => {
        if (window) {
            const currentBreakPointList = Object.keys(BreakPoints_1.BreakPoints);
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
//# sourceMappingURL=WindowMatchMediaAdapter.js.map