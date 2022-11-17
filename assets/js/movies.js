import {createStyle, createMarkup, addMovieTiList, moviesList, inputSearch} from "./dom.js";

const search = "Son";

const getData = (url) => fetch(url)
	.then((res) => res.json())
	.then((data) => data.Search);

export const appInit = () => {
    createStyle();
    createMarkup();
};

getData(`http://www.omdbapi.com/?apikey=807ce5ba&s=${search}`)
.then(movies => movies.forEach(movie => addMovieTiList(movie)))
.catch(console.log);