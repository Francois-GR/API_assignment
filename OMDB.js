require('dotenv').config()
const fetch = require('node-fetch')

async function lookUpMovies(movie){
    const url = `https://omdbapi.com/?t=${movie}&page=1&type=movie&apikey=${process.env.OMDB_key}`
    const result = await fetch(`${url}`)
    const data = await result.json()
    return beuatify(data)
   

}

function beuatify(data){

      let {Title, Year, imdbRating, Language, Poster} = data
      let format = {
        Title,
        Year,
        Poster,
        Language,
        imdbRating
      }

  return format
}

module.exports = lookUpMovies





