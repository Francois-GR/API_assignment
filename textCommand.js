const fs = require('fs')
const lookUpMovies = require('./OMDB')
const spotifyLookUp = require('./Spotify')
const twitter = require('./twitterAPI')// import custom twitter module


function readFile(file = './random.txt'){
    return new Promise((res,rej)=>{
        fs.readFile(file,'utf8',(err, data)=>{
            if(err){
                rej(err)
            }
            res(data)
         })

    })
    
}

function extractCmd(){
    readFile().then((cmd)=>{
        let type = cmd.slice(0, cmd.indexOf('#'))
        let param = cmd.slice(cmd.indexOf('#')+1)

        executeCmd(type,param)
    })
   
}



function executeCmd(type, param){
    if(param==''||param==' '){
        console.log('please enter valid parameter');
        return;
    }
    switch (type.toUpperCase()) {
        case 'SPOTIFY':   
            
            spotifyLookUp(param).then((d)=>{
                new Promise((res,rej)=>{
                    console.log(d);
                }
                )
            }                 
            ) 

            break;
        case 'OMDB':
          
            new Promise((res,rej)=>{
                let result = lookUpMovies(param)
                res(result)
            }).then(
                (movie)=>{
                    console.log(movie);
                }
            )
            break;
        case 'TWITTER':
            let count=1 // keep track of tweets
            console.log('\n');
            twitter(param,20).then((tweets)=>{ // module return a promise
                //tweets is an array of objects
                console.log(`${tweets.length} tweets found\n`)
                tweets.forEach(tweet => {
                    console.log(`tweet ${count++}`)
                    console.log('==========');
                    console.log(tweet.text);
                    console.log('==========\n');
                });
                             
          
            }).catch((err)=>{
                console.log(err);
            })
            break;
            
        default:
            console.log('invalid command, check spelling');
            break;
    }
}

extractCmd()