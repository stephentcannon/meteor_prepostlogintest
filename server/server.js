Meteor.startup(function () {
	Meteor.users.update({}, {$set:{active: false}}, {multi: true});
});


Accounts.preLogin(function(options){
	console.log('********** Accounts.preLogin *************');
	console.log(options); //if you want to see the options passed
	// this demonstrates using preLogin to prevent inactive users trying to resume a session
  if(options.resume){
  	if(!Meteor.users.findOne({'services.resume.loginTokens.token': ""+options.resume, active: true})){
      return false;
    } 
  } 
  return true;
});

Accounts.postLogin(function(result){
	console.log('************* Accounts.postLogin ********');
	console.log(result); //if you want to see the results
	// this demonstrates using postLogin to prevent inactive user
  if(!Meteor.users.findOne({_id: result.id, active: true})){
    return false;
  } else {
    return true;
  }
});