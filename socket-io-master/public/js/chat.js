
var socket=io();

function scrolltobottom()
{
var messages= jQuery('#listt');
var newmsg=messages.children('li:last-child');
var clientHeight=messages.prop('clientHeight');
var scrollTop=messages.prop('scrollTop');
var scrollHeight=messages.prop('scrollHeight');
var newmsgheight=newmsg.innerHeight();
var lastmasgheight=newmsg.prev().innerHeight();
if(clientHeight + scrollTop + newmsgheight + lastmasgheight  >= scrollHeight)
{
//console.log('wors');
    messages.scrollTop(scrollHeight);
}

}

socket.on('connect', function (){
var params=jQuery.deparam(window.location.search);

socket.emit('join', params, function(err){
    if(err)
    {
        alert(err);
        window.location.href='/';

    }
    else{
console.log('luck');
    }

} )
   
});


socket.on('disconnect', function (){

console.log('disconnected from server');
});


socket.on('updateuser', function(users){
     var ol = jQuery('<ol></ol>');
    users.forEach(function(user){

        ol.append(jQuery('<li></li>').text(user));
     });

jQuery('#People').html(ol);


});
socket.on('newmsg', function(data){
    
    var formattedtime=moment(data.createdAt).format('h:mm a');
var template=jQuery('#template-form').html();

var html= Mustache.render(template,{
text: data.text,
from: data.from,
createdAt: formattedtime

});
jQuery('#listt').append(html);



scrolltobottom();

//     console.log(data);
//     var formattedtime=moment(data.createdAt).format('h:mm a')
// var li=jQuery('<li></li>');
// li.text(`${data.from}: ${data.text}   ${formattedtime}`);

// jQuery('#listt').append(li);

});
socket.on('newlocationmsg', function(message){
    scrolltobottom();
var formattedtime=moment(message.createdAt).format('h:mm a');
var template=jQuery('#location-template-form').html();
var html=Mustache.render(template , { 
    from: message.from ,
    
    createdAt: formattedtime ,
     url: message.url

});
jQuery('#listt').append(html);
scrolltobottom();

    // var li=jQuery('<li></li>');
    // var a=jQuery('<a target="_blank">Click For Location</a>');
    // li.text(`${message.from}  ${formattedtime}`);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#listt').append(li);
});



jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
   var messagebox=jQuery('[name=message-wr]');
    socket.emit('createmsg',{
    text: messagebox.val()}, function(){
        messagebox.val('');
    });

});

var locbutton=jQuery('#locationbtn');
locbutton.on('click',function(){
if(!navigator.geolocation)
{
    return alert('not available');
}

locbutton.attr('disabled','disabled').text('Sending......');
navigator.geolocation.getCurrentPosition(function(position){
  //  console.log(position);
  locbutton.removeAttr("disabled").text('Send location');
  socket.emit('createlocationmsg',{
latitude: position.coords.latitude,
longitude: position.coords.longitude
  })
},function(){
    locbutton.removeAttr("disabled").text('Send location');
    alert('not able to access');
    
})

});