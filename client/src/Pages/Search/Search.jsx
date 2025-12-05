import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../utils/axios";
import requests from "../../utils/requests"; 
import styles from "./Search.module.css";
import { IMAGE_BASE_URL } from "../../utils/requests";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await instance.get(requests.fetchSearchMovies(query));

        // Filter out movies without poster images
        const filteredResults = res.data.results.filter(
          (movie) => movie.poster_path
        );
        setResults(filteredResults);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div className={styles.searchPage}>
      <h2 className={styles.heading}>
        Search Results for: <span className={styles.query}>"{query}"</span>
      </h2>

      {loading && <p className={styles.loading}>Loading...</p>}

      {!loading && results.length === 0 && (
        <p className={styles.noResults}>No results found</p>
      )}

      <div className={styles.grid}>
        {results.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
            <p className={styles.title}>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
