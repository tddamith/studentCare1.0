/**
 * Created by **** on 10/22/2016.
 */


stuCareApp.factory('adverServices', function ($http, baseUrls) {

	var addPost  = function(param){
		return $http({
			method: 'POST',
            url: baseUrls.mainUrl + "post/insert",
            data : param
		})
	}
	return {
		addPost : addPost
	}
});
