MessageList = new Mongo.Collection('messages');


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);
  Session.setDefault("loggedIn", false);

  


  Template.chats.helpers({
    loggedIn: function(){
      if(Session.get('loggedIn') == true){
        return true;
      } else {
        return false;
      }
    },
    giveData: function() {
      return MessageList.find({}, {sort: {createdAt: -1}, limit: 7});
    }
  });



  Template.chats.events({
    'submit .chatForm':function(event){
      event.preventDefault();
      var currentUser = Session.get('username');
      var message = event.target.message.value;
      MessageList.insert({
        user: currentUser,
        text: message,
        createdAt: new Date()
      });
      event.target.message.value = "";
    }
    });

  Template.chats.rendered = function(){
    AnimatedEach.attachHooks( this.find("#message-sink"));


  }

/*Tracker.autorun(function(){
  var number = MessageList.find().count;
  var $cont = $('#message-sink');
  $cont[0].scrollTop = $cont[0].scrollHeight;
});*/


  Template.login.events({
    'submit form':function(event){
      event.preventDefault();
      var userName = event.target.name.value;
      Session.set('username', userName);//this might end up being co
      $('#loginModal').modal('hide')
      Session.set('loggedIn', true);
    }
  });

  Template.login.rendered = function(){
    $('#loginModal').modal('show');


  }

  Template.message.helpers({
    
    'isUser':function(){
      var loggedInUser = this.user;
      var currentUser = Session.get('username');
      if(loggedInUser == currentUser){
        return "current";
      }
    }
  });

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
