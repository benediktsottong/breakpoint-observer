/*global
 jest,
 console,
 describe,
 expect,
 it,
 afterEach,
 afterAll,
 beforeEach,
 beforeAll,
 require
 */
import React from 'react';

jest.dontMock('../../library/WindowAdapter');
jest.mock(
    '../../library/BreakpointMapper',
    () => ({
        BreakpointMapper: {
            hasItem: (breakPoint) => {
                return breakPoint === 'xl';
            },
            map: () => 1024
        }
    })
);

import { BreakpointObserver } from '../src/BreakpointObserver';

describe('Test Breakpoints Observer', () => {
    let eventHandlerSpy,
        unsubscribe;

    beforeEach(() => {
        global.window.innerWidth = 768;
        global.window.dispatchEvent(new Event('resize'));
    });

    afterAll(() => {
        unsubscribe.forEach(event => global.window.removeEventListener('resize', eventHandlerSpy));
        unsubscribe.forEach(unsubscribe => unsubscribe());
    });

    /**
     * @param {Number} destinationWidth
     */
    const resizeWindowGradually = (destinationWidth) => {
        let step = (global.window.innerWidth < destinationWidth ? 1 : -1);
        while (global.window.innerWidth !== destinationWidth) {
            global.window.innerWidth += step;
            global.window.dispatchEvent(new Event('resize'));
        }
    };

    /**
     * @param {String} breakPoint
     */
    const addEventListener = (breakPoint) => {
        eventHandlerSpy = jest.fn();
        unsubscribe = BreakpointObserver.subscribe([breakPoint], eventHandlerSpy);
    };

    /**
     * @param {Number} innerWidth
     */
    const createTestRequirements = (innerWidth) => {
        global.window.innerWidth = innerWidth;
        global.window.dispatchEvent(new Event('resize'));
    };

    describe('when a component has subscribed to the observer with breakpoints and an event handler', () => {
        beforeEach(() => {
            createTestRequirements(1024);
            addEventListener('xl');
            resizeWindowGradually(1024);
        });

        it('the breakpoint observer do not fire initial', () => {
            expect(
                eventHandlerSpy
            ).not.toHaveBeenCalled()
        });

        describe('after the breakpoint increases', () => {
            beforeEach(() => {
                createTestRequirements(1023);
                addEventListener('xl');
                resizeWindowGradually(1028);
            });

            it('the breakpoint observer fires the resize listener', () => {
                expect(
                    eventHandlerSpy
                ).toHaveBeenCalledTimes(1)
            });
        });

        describe('after the breakpoint decreases', () => {
            beforeEach(() => {
                createTestRequirements(1025);
                addEventListener('xl');
                resizeWindowGradually(1020);
            });

            it('the breakpoint observer fires the resize listener', () => {
                expect(
                    eventHandlerSpy
                ).toHaveBeenCalledTimes(1)
            });
        });

        describe('but these information are faulty', () => {
            beforeEach(() => {
                createTestRequirements(1025);
                addEventListener('m');
                resizeWindowGradually(1020);
            });

            it('the resize event is not called', () => {
                expect(
                    eventHandlerSpy
                ).not.toHaveBeenCalled()
            });
        });
    });
});
