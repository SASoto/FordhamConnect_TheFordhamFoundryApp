console.log("The bot is tworking. Hello tworld!")

var Twit = require('twit');      //Requires the Twit API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('822e698f6b164e88a711471d4e7527cf')

var config = require('./config');
var T = new Twit(config);


//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
// var get_params = {
// 	q: 'ANTIFA supersoldier',
// 	since: 2018-06-11,
// 	count: 10
// };

// T.get('search/tweets', get_params, gotData);

// function gotData(err, data, response) {
// 	var tweets = data.statuses;
// 	console.log(data)
// 	for (var i = 0; i < tweets.length; i++) {
// 		console.log(tweets[i].text);
// 	}
// };
	

last_post_id = 1000000000000000000;    //An initialization point based on an old post. Needs to be reset every time program gets interrupted???
console.log("starting last post id is " + last_post_id)
// Get the updates from a specific twitter user...
var get_params = {
	screen_name: 'FordhamFoundry',
	//exclude_replies: true,
	since_id: last_post_id,
	include_rts: true,     //Includes retweets
	count: 10,
}
function retweetIt(){
	T.get('statuses/user_timeline', get_params, gotData);
	console.log("last post id is " + last_post_id)
}

function gotData(err, data, response) {
	if (err) {
		console.log("Something went wrong during gotData!");
	} else {
		//tweet_ids = [];
		for (var i = 0; i < data.length; i++){
			//console.log(data[i])
			console.log("text is " + data[i].text)
			console.log(data[i].id_str)
			last_id_update = data[i].id_str
            tweetUrlStart = "Tweet URL is twitter.com/FordhamFoundry/status/" + data[i].id_str
			//
			//  retweet a tweet
			//
			T.post('statuses/retweet/:id', { id: data[i].id_str }, function (err, data, response) {
  			//console.log(data)
  			last_post_id = last_id_update
  			console.log("Retweeted another tweet!")
			})
		}
		//console.log(tweet_ids)
	}
	//return(tweet_ids)
}

//
//  Retweet the tweets from a specific user
//
 retweetIt();
 setInterval(retweetIt, 1000*60*30);

 function getNews() {
 	// To query /v2/top-headlines
    // All options passed to topHeadlines are optional, but you need to include at least one of them
	newsapi.v2.topHeadlines({
    //sources: 'abc-news,associated-press,bloomberg,bbc-news,fox-news,the-new-york-times,the-wall-street-journal,wired',
    //q: 'bitcoin',
    category: 'business',
    language: 'en',
    country: 'us',
    pageSize: 3
    }).then(response => {
    	console.log(response);
    	console.log(response.articles.length)
    	for (var i = 0; i < response.articles.length; i++) {
    		//console.log("From " + response.articles[i].source.name + ":")
    		//console.log(response.articles[i].title)
    		var name = response.articles[i].source.name;
    		var description = "";
            //var imageFlag = ""
    		var title = response.articles[i].title + ". ";
    		var image = "";

    		//Removes the ".com" suffix from news source names so they don't autopopulate images on Twitter.
    		if (name.endsWith(".com") == true) {
    			name = name.substring(0, name.length - 4)
    		}

    		//Shows the extended description if there is one.
    		if(response.articles[i].description != null) {
    			description = "From " + name + ": " + response.articles[i].description
                if (response.articles[i].description.length > 200) {    //If description is very long, we can't fit the description.
                	description = ""
                }
    		}

            //Fetches the news story link
            if(response.articles[i].url != null) {
                storyLink = response.articles[i].url
            }

    		//Fetches the image linked to in the news to display on Twitter.
    		if(response.articles[i].urlToImage != null) {
                if(response.articles[i].urlToImage.startsWith("https")) {
    			    image = response.articles[i].urlToImage + " "
                }
                //If imageURL does NOT start with https (only http), flag this tweet so that front end can not try to display image.
                //if()
    		}
    		var post_params = {
    			status: image + storyLink + " $" + title + "$" + description,
    		}
    		console.log(post_params)
    		T.post('statuses/update', post_params, tweeted)

    		function tweeted(err, data, response){
    			if (err) {
    				console.log("Something went wrong during tweeted!");
    			} else {
    				console.log("Tweeting the news worked!")
    			}
    		}
    		
    	}
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
    //}).then(() => {
    	//var results = JSON.parse(response)
    	//console.log("Results is...")
    	//console.log(results)
    });
}

getNews();
setInterval(getNews, 1000*60*10);

// function retweetIt() {

// 	//var r = Math.floor(Math.random() * 1000);

//  	//console.log(foo)
// 	//ids_to_retweet =  gotData
// 	//console.log("ID's to retweet are " + ids_to_retweet)

// 	var post_params = {
// 		//status: 'here is a random number ' + r + ' #fordhamfoundry'
// 		status: 'Test of txt'
// 	}

// 	T.post('statuses/update', post_params, tweeted);

// 	function tweeted(err, data, response){
// 		if (err) {
// 			console.log("Something went wrong during tweeted!");
// 		} else {
// 		//console.log(data);
// 		console.log("It worked!");
// 		}
// 	}

// }

//Setting up a user stream
// var stream = T.stream('user');

// //Anytime someone follows me
// stream.on('follow', followed);

// function followed(eventMsg) {
// 	var name = eventMsg.source.name;
// 	var screenName = eventMsg.source.screen_name;
// 	tweetIt('@' + screenName + ' likes the news! I feel so validated.');
// }