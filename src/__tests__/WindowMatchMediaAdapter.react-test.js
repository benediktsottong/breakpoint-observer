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
jest.mock(
    '../../config/BreakPoints',
    () => ({
        BreakPoints: {
            xl:  {
                width:      1280,
                mediaQuery: '(max-width: 1599px) and (min-width: 1280px)'
            },
            m:   {
                width:      768,
                mediaQuery: '(max-width: 1023px) and (min-width: 768px)'
            }
        }
    })
);

const mockMediaQuery = jest.fn();
jest.mock(
    '../../library/WindowAdapter',
    () => ({
        WindowAdapter: {
            matchMedia: (query) => mockMediaQuery(query)
        }
    })
);

import { WindowMatchMediaAdapter } from '../lib/WindowMatchMediaAdapter';

describe('Test Window Match Media Adapter', () => {
    let windowBackup;

    beforeAll(() => {
        mockMediaQuery.mockReturnValue(false);
    });

    beforeEach(() => {
        windowBackup = global.window;
    });

    afterEach(() => {
        global.window = windowBackup;
    });

    describe('when the adapter is called to identify a tablet breakpoint', () => {
        describe('with a breakpoint greater than tablet', () => {
            it('the isBreakPointTabletOrLower is returned false', () => {
                expect(
                    WindowMatchMediaAdapter.isBreakPointTabletOrLower()
                ).toBe(false)
            });

            it('the window match media query is called', () => {
                WindowMatchMediaAdapter.isBreakPointTabletOrLower();
                expect(
                    mockMediaQuery
                ).toHaveBeenCalledWith('(max-width: 1023px) and (min-width: 768px)');
            });
        });

        describe('with a breakpoint lower than tablet', () => {
            beforeEach(() => {
                mockMediaQuery.mockReturnValue(true);
            });

            it('the isBreakPointTabletOrLower is returned true', () => {
                expect(
                    WindowMatchMediaAdapter.isBreakPointTabletOrLower()
                ).toBe(true)
            });
        });

        describe('and the global window object is undefined', () => {
            beforeEach(() => {
                mockMediaQuery.mockReturnValue(true);
                delete global.window;
                global.window = undefined;
            });

            it('the isBreakPointTabletOrLower is returned false', () => {
                expect(
                    WindowMatchMediaAdapter.isBreakPointTabletOrLower()
                ).toBe(false)
            });
        });
    });
});
