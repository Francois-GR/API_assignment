require('dotenv').config()
let Spotify = require('node-spotify-api')

let spotify = new Spotify({
    id: process.env.SPOTIFY_API_KEY ,
    secret: process.env.SPOTIFY_API_SECRET,
})


function spotifyLookUp(song){
   return new Promise((res,rej)=>{ spotify.search({type: 'track', query: song}).then((d)=>{
    prettyData = beautify(d)
    
    res(prettyData)
} )})
   
  
 
}
//song name, artist, album, link
function beautify(data){
    let formatedData = []
    songData = data.tracks.items
    for(let i=0; i<songData.length; i++){
        formatedData.push({
            songName: songData[i].name,
            artist: extractArtist(songData[i].artists),
            album: songData[i].album.name,
            link: (songData[i].preview_url==null)?'sorry no link found':songData[i].preview_url
        })
      
    }

    return formatedData

}

function extractArtist(d){
    let artists = []
    d.forEach(el => {
        artists.push(el.name)
    });
    return artists
}

module.exports = spotifyLookUp