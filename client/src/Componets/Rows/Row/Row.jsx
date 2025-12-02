import React, { useEffect, useState, useRef } from "react";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import styles from "./Row.module.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data?.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchUrl]);

  // Handle trailer popup
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "", {
        id: true,
      })
        .then((id) => {
          if (id) setTrailerUrl(id);
          else console.log("Trailer not found for:", movie?.title);
        })
        .catch(() => setTrailerUrl(""));
    }
  };

  // Scroll arrows
  const scroll = (direction) => {
    const { current } = rowRef;
    if (current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const opts = { height: "390", width: "100%", playerVars: { autoplay: 1 } };

  return (
    <div className={styles.row_container}>
      <h2 className={styles.row_title}>{title}</h2>

      {loading ? (
        <div className={styles.row_skeleton}>Loading...</div>
      ) : (
        <>
          <button
            className={`${styles.scroll} ${styles.scroll_left}`}
            onClick={() => scroll("left")}>
            &#10094;
          </button>
          <div className={styles.row_posters} ref={rowRef}>
            {movies
              ?.filter((movie) =>
                isLargeRow ? movie.poster_path : movie.backdrop_path
              )
              .map((movie) => (
                <div
                  key={movie.id}
                  className={`${styles.poster_wrapper} ${
                    isLargeRow ? styles.poster_large : ""
                  }`}>
                  <img
                    onClick={() => handleClick(movie)}
                    className={`${styles.row_poster} ${
                      isLargeRow ? styles.row_poster_large : ""
                    }`}
                    src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie?.name || movie?.title}
                  />
                  <div className={styles.poster_overlay}>
                    <h3>{movie?.name || movie?.title}</h3>
                    <p>{movie?.overview?.slice(0, 60)}...</p>
                  </div>
                </div>
              ))}
          </div>
          <button
            className={`${styles.scroll} ${styles.scroll_right}`}
            onClick={() => scroll("right")}>
            &#10095;
          </button>
        </>
      )}

      {trailerUrl && (
        <div className={styles.row_trailer}>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
