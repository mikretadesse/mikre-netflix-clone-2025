import React, { useEffect, useState, useRef } from "react";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import styles from "./Row.module.css";
import { IMAGE_BASE_URL } from "../../../utils/requests";
import MovieModal from "../../MovieModal/MovieModal";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [modalMovie, setModalMovie] = useState(null);
  const [trailerId, setTrailerId] = useState("");

  const rowRef = useRef(null);

  // Fetch movies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data?.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [fetchUrl]);

  // Scroll row
  const scroll = (direction) => {
    const { current } = rowRef;
    if (current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(() => checkScroll(current), 200);
    }
  };

  const checkScroll = (container) => {
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.offsetWidth < container.scrollWidth
    );
  };

  // Handle poster click → open modal
  const handleClick = async (movie) => {
    try {
      const id = await movieTrailer(
        movie?.title || movie?.name || movie?.original_name || "",
        { id: true }
      );
      setTrailerId(id || "");
      setModalMovie(movie);
    } catch (error) {
      setTrailerId("");
      setModalMovie(movie);
    }
  };

  return (
    <div className={styles.row_container}>
      <h2 className={styles.row_title}>{title}</h2>

      {loading ? (
        <div className={styles.row_skeleton}>Loading...</div>
      ) : (
        <div className={styles.row_wrapper}>
          {/* Left scroll */}
          <button
            className={`${styles.scroll} ${styles.scroll_left}`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}>
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
                    src={`${IMAGE_BASE_URL}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie?.name || movie?.title}
                  />
                  <div className={styles.poster_overlay}>
                    <h3>{movie?.name || movie?.title}</h3>
                    <p>
                      {movie.release_date?.slice(0, 4)}  • ⭐{" "}
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Right scroll */}
          <button
            className={`${styles.scroll} ${styles.scroll_right}`}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}>
            &#10095;
          </button>
        </div>
      )}

      {/* Modal */}
      {modalMovie && (
        <MovieModal
          movie={modalMovie}
          trailerId={trailerId}
          onClose={() => {
            setModalMovie(null);
            setTrailerId("");
          }}
        />
      )}
    </div>
  );
}

export default Row;
