const expect = require('expect');
const {Users}= require('./users');
var users;
beforeEach(()=>{

users= new Users();
users.users=[{id: '5',
name: 'UMER',
room: 'T'},{id: '4',
name: 'ZAID',
room: 'Ter'},{id: '3',
name: 'RAHAT',
room: 'T'}]

})

describe('Users' , ()=>{

it('should add user', ()=>{
var users=new Users();
var user={
    id: 5 ,
    name:'muneeb',
    room: 'T'
};
var res= users.addUser(user.id , user.name, user.room);
expect(users.users).toEqual([user]);
});


it('should return name for T course',()=>{
var userlist = users.getuserlist('T');
expect(userlist).toEqual(['UMER','RAHAT']);

});



it('should return name for Ter course',()=>{
    var userlist = users.getuserlist('Ter');
    expect(userlist).toEqual(['ZAID']);
    
    });
it('remove user',()=>{
    var userid='3';
    var user = users.removeuser(userid);
   // console.log(userid);
expect(user.id).toBe(userid);
expect(users.users.length).toBe(2);

})
it('not  remove user',()=>{
    var userid='99';
    var user=users.removeuser(userid);
expect(user).toBe(undefined);
expect(users.users.length).toBe(3);

})
it('get user',()=>{
var userid='5';
var useri=users.getuser(userid);

expect(useri.id).toBe('5');
})
it('not get user',()=>{

    var userid='99';
var user=users.getuser(userid);
expect(user).toBe(undefined);
})


})