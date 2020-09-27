'use strict';
// require('../caps')
// jest.spyOn(global.console, 'log');
describe('check the event handler functions',()=>{
    it('pickup event log out with it is emit',()=>{
        expect(console.log).toHaveBeenCalled();
    });
    it('pickup event log out with it is emit',()=>{
        expect(console.log).toHaveBeenCalled();
    })
})