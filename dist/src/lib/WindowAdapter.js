"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @returns {{matchMedia, innerWidth, addEventListener}}
 */
exports.WindowAdapter = (() => {
    /**
     * @param {String} requestedFunction
     * @param {Object|Function|String|Number|Boolean} defaultParam
     * @return {*}
     */
    const getWindowFunction = (requestedFunction, defaultParam) => {
        /**
         * If window is defined search for given function name -> default is undefined
         */
        const functionToReturn = !!window ? window[requestedFunction] : undefined;
        /**
         * return requested function or specific default value
         */
        return typeof functionToReturn !== 'undefined'
            ? functionToReturn
            : defaultParam;
    };
    /**
     * @param {String} query
     * @returns {Boolean}
     */
    const matchMedia = (query) => {
        const matchMediaFunction = getWindowFunction('matchMedia', () => ({
            matches: false,
        }));
        return matchMediaFunction(query).matches;
    };
    /**
     * @param {String} event
     * @param {Function} handler
     */
    const addEventListener = (event, handler) => {
        const addEventListenerFunction = getWindowFunction('addEventListener', () => { });
        addEventListenerFunction(event, handler);
    };
    /**
     * @returns {Number}
     */
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