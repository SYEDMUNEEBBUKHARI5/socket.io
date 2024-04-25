var expect = require('expect');
var {generatemessage, generatelocationmessage}=require('./message');

describe('generatemessage', ()=>{
it('should generate correct message object',()=>{

    var from ='shafat';
    var text='USMAN'
    var message= generatemessage(from, text);
    //expect(message.createdAt).toBe(97);
    expect(message.from).toBe('shafat');
    expect(message.text).toBe('USMAN');
  
});

});







describe('generatelocationmessage', ()=>{
    it('should generate correct message object',()=>{
    
        var from ='shafat';
        var lat='15';
        var lon='15';
        var url='https://www.google.com/maps?q=15,15'
        var message= generatelocationmessage(from, lat, lon);
        expect(typeof message.createdAt).toBe('number');
        // expect(message.from).toBe(from);
         //expect(message.url).toBe(url);
      expect(message).toMatchObject({from, url});
    });
    
    });