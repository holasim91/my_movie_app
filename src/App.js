import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";
// import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts.lt/api/v2/list_movies.jsons?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading....</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                poster={movie.medium_cover_image}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}{" "}
          </div>
        )}
      </section>
    );
  }
}
export default App;
