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
import {WindowAdapter} from '../src/lib/WindowAdapter';

describe('Test Window Adapter', () => {
    let windowFunctionStub,
        addEventListenerStub,
        windowBackup;

    beforeEach(() => {
        windowBackup = global.window;
    });

    afterEach(() => {
        global.window = windowBackup;
    });

    const deleteWindowObject = () => {
        delete global.window;
        global.window = undefined;
    };

    describe('when the window matchMedia function is called', () => {
        describe('with an undefined window object', () => {
            beforeEach(() => {
                deleteWindowObject();
            });

            it('the matchMedia function returns false', () => {
                expect(
                    WindowAdapter.matchMedia('(max-width: 479px) and (min-width: 320px)')
                ).toBe(false);
            });
        });

        describe('with a window object without the requested function', () => {
            it('the matchMedia function returns false', () => {
                expect(
                    WindowAdapter.matchMedia('(max-width: 479px) and (min-width: 320px)')
                ).toBe(false);
            });
        });

        describe('with a full filled window object', () => {
            beforeEach(() => {
                windowFunctionStub = jest.fn().mockReturnValue({matches: true});

                Object.defineProperty(window, 'matchMedia', {
                    writable: true,
                    value: windowFunctionStub
                });
            });

            it('the matchMedia function returns true', () => {
                expect(
                    WindowAdapter.matchMedia('(max-width: 479px) and (min-width: 320px)')
                ).toBe(true);
            });
        });
    });

    describe('when window addEventListener function is called', () => {
        describe('with an undefined window object', () => {
            beforeEach(() => {
                deleteWindowObject();
            });

            it('no error is thrown', () => {
                expect(WindowAdapter.addEventListener('resize', () => {
                })).toBeUndefined();
            });
        });

        describe('with a window object without the requested function', () => {
            it('no error is thrown', () => {
                expect(WindowAdapter.addEventListener('resize', () => {
                })).toBeUndefined();
            });
        });

        describe('with a full filled window object', () => {
            let callback;

            beforeEach(() => {
                addEventListenerStub = jest.fn();

                callback = () => {
                };

                Object.defineProperty(window, 'addEventListener', {
                    writable: true,
                    value: addEventListenerStub
                });

                WindowAdapter.addEventListener('resize', callback);
            });

            it('the resize function is called', () => {
                expect(
                    addEventListenerStub
                ).toHaveBeenCalledWith('resize', callback)
            });
        });
    });

    describe('when window innerWidth function is called', () => {
        describe('with an undefined window object', () => {
            beforeEach(() => {
                deleteWindowObject();
            });

            it('it returns 0', () => {
                expect(WindowAdapter.innerWidth()).toBe(0)
            });
        });

        describe('with a window object without the requested function', () => {
            beforeEach(() => {
                delete global.window.innerWidth;
            });

            it('it returns 0', () => {
                expect(WindowAdapter.innerWidth()).toBe(0)
            });
        });

        describe('with a full filled window object', () => {
            let callback;

            beforeEach(() => {
                addEventListenerStub = jest.fn();

                callback = () => {
                };

                Object.defineProperty(window, 'innerWidth', {
                    writable: true,
                    value: 1900
                });
            });

            it('the innerWidth function returns 1900', () => {
                expect(WindowAdapter.innerWidth()).toBe(1900)
            });
        });
    });
});
