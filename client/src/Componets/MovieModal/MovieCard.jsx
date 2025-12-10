import { useState } from "react";
import { Size_Image } from "../../utils/requests";
import MovieModal from "./MovieModal";

export default function MovieCard({ movie }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        <img
          src={`${Size_Image}${movie.poster_path}`}
          alt={movie.title}
          style={{
            width: "100%",
            borderRadius: "6px",
          }}
        />
      </div>

      {open && <MovieModal movie={movie} onClose={() => setOpen(false)} />}
    </>
  );
}
