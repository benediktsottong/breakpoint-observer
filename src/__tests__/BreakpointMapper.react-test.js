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
 require,
 toBe
 */
import {BreakpointMapper} from '../BreakpointMapper';

jest.mock(
    '../../config/BreakPoints',
    () => ({
        BreakPoints: {
            xl: {
                width: 320
            },
            xxl: {
                width: 460
            }
        }
    })
);

describe('Test Breakpoint Mapper', () => {
    describe('when the breakpoint Mapper is called', () => {
        describe('to check if a specific breakpoint is in the global list', () => {
            it('returns false if no match is found', () => {
                expect(
                    BreakpointMapper.hasItem('c')
                ).toBe(false);
            });

            it('returns true if a match is found', () => {
                expect(
                    BreakpointMapper.hasItem('xl')
                ).toBe(true);
            });
        });

        describe('to get the minimal width for the given breakpoint', () => {
            it('if the breakpoint is unknown the function returns the given prop', () => {
                expect(
                    BreakpointMapper.map('c')
                ).toBe('c');
            });

            it('it returns the requested width if the breakpoint was found', () => {
                expect(BreakpointMapper.map('xl')).toEqual(320);
            });
        });

        describe('to get the actual breakpoint', () => {
            it('it returns undefined if the window width lower than breakpoint', () => {
                global.window.innerWidth = 0;
                expect(BreakpointMapper.getCurrentBreakpoint()).toBe(undefined);
            });
            it('it returns xl if the window width equals with breakpoint', () => {
                global.window.innerWidth = 320;
                expect(BreakpointMapper.getCurrentBreakpoint()).toEqual('xl');
            });
            it('it returns xxl if the window width greater than breakpoint', () => {
                global.window.innerWidth = 600;
                expect(BreakpointMapper.getCurrentBreakpoint()).toEqual('xxl');
            });
        });
    });
});
