import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // --- State Management ---
  const [query, setQuery] = useState(""); // Stores user search input
  const [isScrolled, setIsScrolled] = useState(false); // Detects scroll to add background
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown toggle
  const [showSearch, setShowSearch] = useState(false); // Search bar toggle

  // Refs for detecting click outside
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Toggle header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // scrolled -> black background
      } else {
        setIsScrolled(false); // at top -> transparent
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setProfileOpen(false); // close profile if menu opens
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setMenuOpen(false); // close menu if profile opens
  };

  // Search: Navigate when pressing ENTER
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      // encodeURIComponent ensures spaces and special characters work
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Close search/profile when clicking OUTSIDE or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close search if clicking outside search area
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      // Close profile if clicking outside profile area
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    const handleEsc = (e) => {
      // Close all popups with ESC key
      if (e.key === "Escape") {
        setShowSearch(false);
        setProfileOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className={`${Styles.header} ${isScrolled ? Styles.scrolled : ""}`}>
      {/* =============== Left Section =============== */}
      <div className={Styles.header_left}>
        <img
          className={Styles.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        {/* Mobile Hamburger */}
        <div className={Styles.menu_btn} onClick={toggleMenu}>
          {menuOpen ? (
            <CloseIcon className={Styles.icon} />
          ) : (
            <MenuIcon className={Styles.icon} />
          )}
        </div>

        {/* Navigation */}
        <nav
          className={`${Styles.nav_links} ${menuOpen ? Styles.active : ""}`}
          onClick={() => setMenuOpen(false)}>
          <Link to="/">Home</Link>
          <Link to="/tv-shows">TV Shows</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/latest">Latest</Link>
          <Link to="/my-list">My List</Link>
          <Link to="/browse-languages">Browse by Languages</Link>
        </nav>
      </div>

      {/* =============== Right Side =============== */}
      <div className={Styles.header_right}>
        {/* Search */}
        <div ref={searchRef} className={Styles.search_container}>
          <SearchIcon
            className={Styles.icon}
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search movies"
          />
          {/* Search Input (Visible when toggled) */}
          {showSearch && (
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className={Styles.search_input}
              autoFocus
              aria-label="Search movies"
            />
          )}
        </div>
        {/* Notifications icon (desktop only) */}
        <div className={`${Styles.icon} ${Styles.notification_icon}`}>
          <NotificationsIcon />
        </div>

        {/* Profile icon*/}
        <div ref={profileRef} className={Styles.profile_section}>
          <button
            className={Styles.profile_button}
            onClick={toggleProfile}
            aria-expanded={profileOpen}>
            <PersonIcon className={Styles.icon} />
            <ArrowDropDownIcon className={Styles.icon} />
          </button>

          {profileOpen && (
            <div className={`${Styles.profile_dropdown}`}>
              <Link to="/account">Account</Link>
              <Link to="/help-center">Help Center</Link>
              <Link to="/sign-out">Sign Out</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

/**
 * Header component for the Netflix Clone application.
 *
 * Renders the top navigation bar, including:
 * - Netflix logo
 * - Navigation links (Home, TV Shows, Movies, etc.)
 * - Responsive hamburger menu for mobile devices
 * - Search functionality with input and icon
 * - Notifications icon (desktop only)
 * - Profile dropdown with account options
 *
 * Features:
 * - Changes background on scroll for better visibility
 * - Handles mobile menu and profile dropdown toggling
 * - Closes menus/dropdowns on outside click or Escape key
 * - Navigates to search results on Enter key in search input
 *
 */
