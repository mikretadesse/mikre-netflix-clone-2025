import React, { useState } from "react";
import axios from "axios";
import Styles from "./BrowseByLanguages.module.css";
import { languagesData } from "../../utils/languages";
import requests, { IMAGE_BASE_URL } from "../../utils/requests";

const BrowseByLanguage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedLang, setSelectedLang] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLanguageClick = async (langCode) => {
    setSelectedLang(langCode);
    setLoading(true);
    try {
      const res = await axios.get(requests.fetchMoviesByLanguage(langCode));
      setMovies(res.data.results);
    } catch (err) {
      console.error(err);
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <div className={Styles.page}>
      <h1 className={Styles.title}>Browse by Language</h1>

      <div className={Styles.languageGrid}>
        {languagesData.map((lang) => (
          <button
            key={lang.code}
            className={`${Styles.languageBtn} ${
              selectedLang === lang.code ? Styles.active : ""
            }`}
            onClick={() => handleLanguageClick(lang.code)}>
            {lang.name}
          </button>
        ))}
      </div>

      <h2 className={Styles.subtitle}>
        {selectedLang
          ? `Showing movies in ${
              languagesData.find((l) => l.code === selectedLang).name
            }`
          : "Select a language to browse movies"}
      </h2>

      {loading ? (
        <p className={Styles.loading}>Loading...</p>
      ) : movies.length === 0 && selectedLang ? (
        <p className={Styles.noResults}>No movies found for this language.</p>
      ) : (
        <div className={Styles.grid}>
          {movies.map((item) => (
            <div key={item.id} className={Styles.card}>
              {item.poster_path && (
                <img
                  src={`${IMAGE_BASE_URL}${item.poster_path}`}
                  alt={item.title || item.name}
                  className={Styles.poster}
                />
              )}
              <p className={Styles.item_title}>{item.title || item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseByLanguage;
