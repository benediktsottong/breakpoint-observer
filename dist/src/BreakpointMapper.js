"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BreakPoints_1 = require("./lib/config/BreakPoints");
exports.BreakpointMapper = (() => {
    const hasItem = (breakpoint) => {
        return breakpoint in BreakPoints_1.BreakPoints;
    };
    const getBreakpointWidth = (breakpoint) => {
        if (!hasItem(breakpoint)) {
            return 0;
        }
        return BreakPoints_1.BreakPoints[breakpoint].width;
    };
    const getCurrentBreakpoint = () => {
        let currentBreakpoint;
        const availableBreakpoints = Object.keys(BreakPoints_1.BreakPoints);
        for (let i = 0; i < Object.keys(BreakPoints_1.BreakPoints).length; i++) {
            if (window.innerWidth >= BreakPoints_1.BreakPoints[availableBreakpoints[i]].width) {
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
//# sourceMappingURL=BreakpointMapper.js.map