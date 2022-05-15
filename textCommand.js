
const fs = require('fs')// file system
const lookUpMovies = require('./OMDB')
const spotifyLookUp = require('./Spotify')
const twitter = require('./twitterAPI')// import custom twitter module
let resolveCount=0
let pipeState = true


function readFile(file = './random.txt'){
    return new Promise((res,rej)=>{ // keep things flowing in order
        fs.readFile(file,'utf8',(err, data)=>{ //convert buffer to utf8
            if(err){
                rej(err)
            }
            res(data)
         })

    })
    
}

function extractAndExeCmd(callback){
    readFile().then((cmd)=>{
        
        let Commands = cmd.split('\n')  // get all lines of commands, assume they are entered on a new line each time
        for(let i = 0; i<Commands.length-1; i++){
            Commands[i]=Commands[i].slice(0,Commands[i].indexOf('\r'))// remove escape charatcer to get pure command
        }
        
       Commands.forEach(el=>{ //run through all collected commands
           let type = el.slice(0,el.indexOf('#')) //format is as follows  command#param
           let param = el.slice(el.indexOf('#')+1)
            executeCmd(type, param)// execute 
    
       })
        
       
   
    })
   
}



function executeCmd(type, param){
    return new Promise((res,rej)=>{
        if(param==''){
            console.log('please enter valid parameter');
            return;
        }// error checking
        switch (type.toUpperCase()) {
            case 'SPOTIFY':   
                         
                spotifyLookUp(param).then((d)=>{
                    new Promise((res,rej)=>{
                        console.log('==========Spotify=============');  
                        console.log(d);
                        resolveCount++
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
                        console.log('============OMDB=============');
                        console.log(movie);
                        resolveCount++
                    }
                )
                break;
            case 'TWITTER':
                
                let count=1 // keep track of tweets
                console.log('\n');
                twitter(param,20).then((tweets)=>{ // module return a promise
                    //tweets is an array of objects
                    console.log('==================Twitter===========');
                    console.log(`${tweets.length} tweets found\n`)
                    tweets.forEach(tweet => {
                        console.log(`tweet ${count++}`)
                        console.log('==========');
                        console.log(tweet.text);
                        console.log('==========\n');
                    });
                    resolveCount++
                                 
              
                }).catch((err)=>{
                    console.log(err);
                })
                break;
                
            default:
                console.log('invalid command, check spelling');
                break;
        }
    })
   
}

module.exports = extractAndExeCmd