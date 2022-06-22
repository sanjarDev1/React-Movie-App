import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "./App.css";

import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavouretes from "./components/AddFavouretes";
import RemoveFavourites from './components/RemoveFavourites'

const App = () => {
  const [movies, setMovies] = useState([]);

  const [searchValue, setSearchValue] = useState('start');
  const [favourites, setFavourites] = useState([])

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1606f1f0`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(movieFavourites)
  }, []);

  const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie)=>{
    const newFavoriteList = [...favourites, movie];
    setFavourites(newFavoriteList);
    saveToLocalStorage(newFavoriteList)

  }

  const removeFavouriteMovie=(movie)=>{
    const newFavoriteList = favourites.filter(favo=>favo.imdbID !== movie.imdbID);

    setFavourites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  return (
    <div className="container-fluid movie-app scrollbar-hidden">
      <div className="row scrollbar-hidden d-flex align-items-cente mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox setSearchValue={setSearchValue}  searchValue={searchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} 
        handleFavouritesClick={addFavouriteMovie}
        favoureteComponent={AddFavouretes}/>
      </div>
      <div className="row d-flex align-items-cente mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList movies={favourites} 
        handleFavouritesClick={removeFavouriteMovie}
        favoureteComponent={RemoveFavourites}/>
        
      </div>
    </div>
  );
};

export default App;
