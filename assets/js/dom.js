export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

const createElement = ({
    type, 
    attrs, 
    container = null, 
    position = "append", 
    evt,
    handler
}) => {
    const el = document.createElement(type);

    Object.keys(attrs).forEach((key) => {
        if (key !== "innerHTML") el.setAttribute(key, attrs[key]);
        else el.innerHTML = attrs[key];
    });
    
    if (container && position === "append") container.append(el);
    if (container && position === "prepend") container.prepend(el);

    if (evt && handler && typeof(handler) === "function") {
        el.addEventListener(evt, handler);
    }

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
                    width: min(100% - 40px, 1280px);
                    margin-inline: auto;
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
                
                .search {
                    margin-bottom: 30px;
                }
                
                .search__label-input {
                    display: block;
                    margin-bottom: 7px;
                }
                
                .search__input {
                    display: block;
                    max-width: 400px;
                    width: 100%;
                    padding: 10px 15px;
                    margin-bottom: 10px;
                    border: 1px solid lightsteelblue;
                    border-radius: 4px;
                }
                
                .search__label-checkbox {
                    font-size: 12px;
                    display: inline-block;
                    transform: translate(7px, -2.5px);
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
            innerHTML: "???????????????????? ?????? ???????????? ??????????????"
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
            innerHTML: "?????????? ??????????????"
        },
        container: inputBox
    });
    inputSearch = createElement({
        type: "input",
        attrs: {
            class: "search__input",
            id: "search",
            type: "search",
            placeholder: "?????????????? ?????????????? ??????????..."
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
    createElement({
        type: "input",
        attrs: {
            class: "search__checkbox",
            id: "checkbox",
            type: "checkbox",
        },
        container: checkBox,
        evt: "click",
        handler: () => triggerMode = !triggerMode
    });
    createElement({
        type: "label",
        attrs: {
            class: "search__label-checkbox",
            for: "checkbox",
            innerHTML: "?????????????????? ???????????? ?? ????????????????????????"
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

export const addMovieToList = (movie) => {
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

export const clearMoviesMarkup = (el) => el && (el.innerHTML = "");
