let moviesList = null;

const createStyle = () => {
	const headStyle = document.createElement("style");

	headStyle.innerHTML = `
		* {
			-webkit-box-sizing: border-box;
					box-sizing: border-box;
		}
		
		body {
			margin: 0;
		
			font-family: Arial, Helvetica, sans-serif;
		}
		
		.container {
			padding: 20px;
		}
		
		.movies {
			display: grid;
		
			gap: 20px;
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
		
		.movie {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-ms-flex-line-pack: center;
			align-content: center;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
		}
		
		.movie__image {
			width: 100%;
		
			-o-object-fit: cover;
			object-fit: cover;
		}	  
	`;

	document.head.append(headStyle);
};

const createMarkup = () => {
	const container = document.createElement("div");
	const movies = document.createElement("div");

	container.classList.add("container");
	movies.classList.add("movies");

	container.append(movies);
	document.body.prepend(container);
	
	moviesList = document.querySelector(".movies");
};

const addMovieTiList = (movie) => {
	const item = document.createElement("div");
	const img = document.createElement("img");

	item.classList.add("movie");
	img.classList.add("movie__image");

	img.src = movie.Poster;
	img.alt = movie.Title;
	img.title = movie.Title;

	item.append(img);
	moviesList.append(item);
};

const getData = (url) => fetch(url)
	.then((res) => res.json())
	.then((data) => data.Search);

const search = "Iron man";

createStyle();
createMarkup();

getData(`http://www.omdbapi.com/?apikey=807ce5ba&s=${search}`)
.then(movies => movies.forEach(movie => addMovieTiList(movie)))
.catch(console.log);