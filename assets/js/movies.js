import {createStyle, createMarkup, addMovieToList, inputSearch, moviesList} from "./dom.js";

let searchLast = null;

const debounce = (() => {
    let timer = null;

    return (cb, ms) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(cb, ms);
    };
})();

const getData = (url) => fetch(url)
	.then((res) => res.json())
	.then((data) => data.Search);

const inputSearchHandler = (e) => {
    debounce(() => {
        const searchString = e.target.value.trim();

        if (searchString && searchString.length > 3 && searchLast !== searchString) {
            getData(`http://www.omdbapi.com/?apikey=807ce5ba&s=${searchString}`)
            .then(movies => movies.forEach(movie => addMovieToList(movie)))
            .catch(console.log);
        }

        searchLast = searchString;
    }, 2000);
};

export const appInit = () => {
    createStyle();
    createMarkup();
    inputSearch.addEventListener("keyup", inputSearchHandler);
};