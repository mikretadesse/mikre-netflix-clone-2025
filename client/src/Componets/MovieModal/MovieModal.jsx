import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import styles from "./MovieModal.module.css";
import { Size_Image } from "../../utils/requests";

function MovieModal({ movie, trailerId, onClose }) {
  const modalRef = useRef();

  if (!movie) return null;

  // Swipe down to close on mobile
  useEffect(() => {
    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      currentY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (currentY - startY > 100) onClose();
    };

    const modal = modalRef.current;
    modal.addEventListener("touchstart", handleTouchStart);
    modal.addEventListener("touchmove", handleTouchMove);
    modal.addEventListener("touchend", handleTouchEnd);

    return () => {
      modal.removeEventListener("touchstart", handleTouchStart);
      modal.removeEventListener("touchmove", handleTouchMove);
      modal.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}>
        {/* Trailer or Backdrop */}
        {trailerId ? (
          <YouTube
            videoId={trailerId}
            opts={{
              width: "100%",
              height: window.innerWidth < 768 ? "200" : "360",
              playerVars: { autoplay: 1, controls: 1 },
            }}
            className={styles.youtube}
          />
        ) : (
          <div
            className={styles.backdrop}
            style={{
              backgroundImage: `url(${Size_Image}${
                movie.backdrop_path || movie.poster_path
              })`,
            }}
          />
        )}

        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        {/* Movie Info */}
        <div className={styles.content}>
          <h2 className={styles.title}>{movie.title || movie.name}</h2>
          <p className={styles.meta}>
            {movie.release_date?.slice(0, 4)} • ⭐{" "}
            {movie.vote_average?.toFixed(1)}
          </p>
          <p className={styles.overview}>{movie.overview}</p>

          {/* Extra details */}
          <div className={styles.extra}>
            {movie.genres && (
              <>
                <h4>Genres:</h4>
                <span>{movie.genres.map((g) => g.name).join(", ")}</span>
              </>
            )}
            {movie.cast && (
              <>
                <h4>Cast:</h4>
                <div className={styles.castList}>
                  {movie.cast.map((c) => (
                    <span key={c.id}>{c.name}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div className={styles.buttons}>
            <button className={styles.play}>▶ Play</button>
            <button className={styles.add}>+ My List</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieModal;
