export let moviesList = null;
export let inputSearch = null;

const createElement = ({
    type, 
    attrs, 
    container = null, 
    position = "append", 
    handler
}) => {
    const el = document.createElement(type);

    Object.keys(attrs).forEach((key) => {
        if (key !== "innerHTML") el.setAttribute(key, attrs[key]);
        else el.innerHTML = attrs[key];
    });
    
    if (container && position === "append") container.append(el);
    if (container && position === "prepend") container.prepend(el);
    
    return el;
};

export const createStyle = () => {
	createElement({
        type: "style",
        attrs: {
            innerHTML: `
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
            `
        },
        container: document.head
    });
};

export const createMarkup = () => {
	const container = createElement({
        type: "div",
        attrs: {
            class: "container"
        },
        container: document.body,
        position: "prepend"
    });

    createElement({
        type: "h1",
        attrs: {
            innerHTML: "Приложение для поиска фильмов"
        },
        container
    });

    const searchBox = createElement({
        type: "div",
        attrs: {
            class: "search"
        },
        container
    });

    const inputBox = createElement({
        type: "div",
        attrs: {
            class: "search__group -input"
        },
        container: searchBox
    });
    createElement({
        type: "label",
        attrs: {
            class: "search__label-input",
            for: "search",
            innerHTML: "Поиск фильмов"
        },
        container: inputBox
    });
    inputSearch = createElement({
        type: "input",
        attrs: {
            class: "search__input",
            id: "search",
            type: "search",
            placeholder: "Начните вводить текст..."
        },
        container: inputBox
    });

    const checkBox = createElement({
        type: "div",
        attrs: {
            class: "search__group -checbox"
        },
        container: searchBox
    });
    inputSearch = createElement({
        type: "input",
        attrs: {
            class: "search__checkbox",
            id: "checkbox",
            type: "checkbox",
        },
        container: checkBox
    });
    createElement({
        type: "label",
        attrs: {
            class: "search__label-checkbox",
            for: "checkbox",
            innerHTML: "Добавлять фильмы к существующим"
        },
        container: checkBox
    });

	const movies = createElement({
        type: "div",
        attrs: {
            class: "movies"
        },
        container
    });

	moviesList = document.querySelector(".movies");
};

export const addMovieTiList = (movie) => {
	const item = createElement({
        type: "div",
        attrs: {
            class: "movie"
        },
        container: moviesList
    });

	const img = createElement({
        type: "img", 
        attrs: {
            class: "movie__image", 
            src: /(http|https):\/\//i.test(movie.Poster) ? movie.Poster : "assets/img/no-image.jpg", 
            alt: movie.Title, 
            title: movie.Title
        },
        container: item
    });
};