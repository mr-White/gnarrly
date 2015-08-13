/**
 * [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
Accounts.onCreateUser(function(options, user) {
  // What data shall we mine ?
  if (! _.isEmpty(user.services)) {
  	// Twitter
  	if (! _.isEmpty(user.services.twitter)) {
  		// Profile Picture
  		if (_.isString(user.services.twitter.profile_image_url)) {
  			options.profile.avatar = user.services.twitter.profile_image_url;
		  }

  		// User alias (screen name)
  		if (_.isString(user.services.twitter.screenName)) {
  			options.profile.alias = user.services.twitter.screenName;
  		}
  	}

  	// Facebook
  	if (! _.isEmpty(user.services.facebook)) {
  		// Mine facebook data
  		
  	}
  }

  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
  }

  // This callback is expecting user returned (will be inserted into DB)
  return user;
});