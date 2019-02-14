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
    process
 */
import React from 'react';
import renderer from 'react-test-renderer';

import { BreakPoints } from '../../lib/config/BreakPoints';

describe('Test BreakPoints', () => {
    describe('when the config object is called', () => {
        it('the breakpoints are given back', () => {
            expect(BreakPoints).toMatchSnapshot();
        });
    })
});
