const spotifyLookUp = require('./Spotify')
const twitter = require('./twitterAPI')// import custom twitter module
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


function main(){ // main menu
 
  readline.question(showMenu()+'input: ', (input) =>{
       interpretInput(input)// start process
  })      

}

function interpretInput(input){
   switch (Number(input)) {// input is string, convert to number
       case 0:
           readline.close()// close interface
            console.log('exiting...');
           setTimeout(()=>{
               console.log('bye')
               process.exit(0)//stop program
           },1500)
          
           break;
       case 1:
           //twitter
           let twitUser;
           readline.question('enter the twitter user\'s user name, ex: elonmusk: ',user=>{
            twitUser = user    //get user
 
            readline.question('enter the amount of recent tweets that you want: ', num =>{
                // get num of tweets
                let count=1 // keep track of tweets
                console.log('\n');
                twitter(twitUser,Number(num)).then((tweets)=>{ // module return a promise
                    //tweets is an array of objects
                    console.log(`${tweets.length} tweets found\n`)
                    tweets.forEach(tweet => {
                        console.log(`tweet ${count++}`)
                        console.log('==========');
                        console.log(tweet.text);
                        console.log('==========\n');
                    });
                                 
                    main() //restart app
                }).catch((err)=>{
                    console.log(err);
                    main() //restart app
                })
                    
            })
      
        })
           
           break;
        case 2:
            //spotify
            readline.question('enter the song name, ex money trees: ', song=>{
                spotifyLookUp(song).then((d)=>{
                    new Promise((res,rej)=>{
                        console.log(d);
                    }
                    ).then(
                        main()
                    )()
                }                 
                )
                
            })

            break;
        case 3:
            //OMDB
            break;
        case 4:
            //read from textfile      
            break;   
       default:
           console.log('\n=====invalid input=====\n')
           main()//restart app
           break;
   }
   
}

function showMenu(){
    return  `
        ===Menu===
        1. Twitter lookup
        2. Spotify lookup
        3. OMDb lookup
        4. read text file command
        0. exit
    `
}





main()