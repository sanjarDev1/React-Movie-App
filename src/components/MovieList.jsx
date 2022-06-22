import React from "react";

const MovieList = ({ movies,favoureteComponent,handleFavouritesClick }) => {
  const FavouriteComponent = favoureteComponent
  return (
    <>
      {movies.map((mov, inde) => (
        <div key={inde} className=" image-container f-flex justify-content-start m-3 ">
          <img src={mov.Poster} alt="image" />
          <div onClick={()=>handleFavouritesClick(mov)} className="overlay d-flex  align-items justify-content-center">
            <FavouriteComponent/>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
