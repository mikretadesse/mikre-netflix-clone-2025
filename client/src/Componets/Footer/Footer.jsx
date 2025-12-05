import Styles from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      {/* Social Icons */}
      <div
        className={`d-flex flex-md-row justify-content-center align-items-center ${Styles.social_icons}`}>
        <a href="#">
          <FacebookIcon />
        </a>
        <a href="#">
          <InstagramIcon />
        </a>
        <a href="#">
          <YouTubeIcon />
        </a>
      </div>

      {/* Footer Links */}
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-6 col-md-3">
            <ul className={Styles.footer_links}>
              <li>
                <a href="#">Audio Description</a>
              </li>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <ul className={Styles.footer_links}>
              <li>
                <a href="#">Media Center</a>
              </li>
              <li>
                <a href="#">Investor Relations</a>
              </li>
              <li>
                <a href="#">Jobs</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <ul className={Styles.footer_links}>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Legal Notices</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <ul className={Styles.footer_links}>
              <li>
                <a href="#">Cookie Preferences</a>
              </li>
              <li>
                <a href="#">Corporate Information</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Service Button */}
      <div className="text-center mt-4">
        <button className={Styles.service_code}>Service Code</button>
      </div>

      {/* Copyright */}
      <p className={Styles.copyright}>&copy; 1997-2024 Netflix, Inc.</p>

      {/* Country Label */}
      <p className={Styles.country}>Netflix Ethiopia</p>
    </footer>
  );
};

export default Footer;
