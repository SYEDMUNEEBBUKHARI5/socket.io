class Users{

constructor(){
    this.users=[];
}

addUser(id , name , room){
var user={id , name  , room};
this.users.push(user);
return user;

}
removeuser(id){
var user=this.getuser(id);
if(user)
{
    this.users=this.users.filter((user)=> user.id !== id)
}
return user;
}
getuser(id){  
return this.users.filter((user)=> user.id === id)[0]



}
getuserlist(room){
    //var user={id , name  , room};
    var users= this.users.filter((user)=>user.room === room);
    var namearray=users.map((user)=>user.name)
    return namearray;
}
}
module.exports={Users};