const expect = require('expect');
const {realstring}=require('./validation');

describe('realstring',()=>{
it('should reject nonstring' , ()=>{

    var res = realstring(98);
    expect(res).toBe(false);
});

it('should reject spaces' , ()=>{

    var res = realstring('  ');
    expect(res).toBe(false);
});


it('should accept' , ()=>{

    var res = realstring('  chracters   ');
    expect(res).toBe(true);
});


});