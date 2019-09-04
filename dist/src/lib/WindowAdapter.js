"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowAdapter = (() => {
    const getWindowFunction = (requestedFunction, defaultParam) => {
        const functionToReturn = !!window ? window[requestedFunction] : undefined;
        return typeof functionToReturn !== 'undefined'
            ? functionToReturn
            : defaultParam;
    };
    const matchMedia = (query) => {
        const matchMediaFunction = getWindowFunction('matchMedia', () => ({
            matches: false,
        }));
        return matchMediaFunction(query).matches;
    };
    const addEventListener = (event, handler) => {
        const addEventListenerFunction = getWindowFunction('addEventListener', () => { });
        addEventListenerFunction(event, handler);
    };
    const innerWidth = () => {
        return getWindowFunction('innerWidth', 0);
    };
    return {
        matchMedia,
        innerWidth,
        addEventListener,
    };
})();
//# sourceMappingURL=WindowAdapter.js.map