"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BreakPoints_1 = require("./lib/config/BreakPoints");
exports.BreakpointMapper = (() => {
    const hasItem = (breakpoint) => {
        return breakpoint in BreakPoints_1.BreakPoints;
    };
    const getBreakpointWidth = (breakpoint) => {
        /**
         * if breakpoint is NOT known
         */
        if (!hasItem(breakpoint)) {
            /**
             * return given input
             */
            return 0;
        }
        return BreakPoints_1.BreakPoints[breakpoint].width;
    };
    /**
     * @returns {String}
     */
    const getCurrentBreakpoint = () => {
        let currentBreakpoint;
        const availableBreakpoints = Object.keys(BreakPoints_1.BreakPoints);
        /**
         * loop through breakpoints
         */
        for (let i = 0; i < Object.keys(BreakPoints_1.BreakPoints).length; i++) {
            /**
             * if window width greater/same as defined breakpoint width
             */
            if (window.innerWidth >= BreakPoints_1.BreakPoints[availableBreakpoints[i]].width) {
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
//# sourceMappingURL=BreakpointMapper.js.map