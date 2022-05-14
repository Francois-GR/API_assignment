require("dotenv").config()
const twit = require('twit') //chosen module

const T = new twit({ //instantiate with environment variables, sir can just add you values in the dotenv
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})


function getUserTweets(user, numTweets){

    return new Promise((res,rej)=>{
        let params = { // url parameters
            screen_name: user,  // username
            count: numTweets    // number of tweets
        }
        // url + params + callback
        T.get('statuses/user_timeline', params, (err,data)=>{
            if(err){
                return rej(err.message)// readable err
            }
            return res(data)
        })

        

    })

    
}


module.exports = getUserTweets