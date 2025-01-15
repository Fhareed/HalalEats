import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import beef1Image from "../assets/images/beef5.jpg";
import chicken3Image from "../assets/images/chicken3.jpg";
import beefImage from "../assets/images/beef.jpg";
const Homepage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">HalalEats</div>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <Link to="/login">
            <button className="btn login-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn signup-btn">Sign Up</button>
          </Link>
        </ul>
      </nav>
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${beef1Image})` }}
      >
        <div className="hero-text">
          <h1>Connecting You with Local Halal Butchers</h1>
          <p>
            Find trusted Halal butchers near you and enjoy fresh, ethically
            sourced products.
          </p>
          <ul className="hero-list">
            <li>✅ Halal-certified butchers</li>
            <li>✅ Convenient delivery options</li>
            <li>✅ Fresh, high-quality meats</li>
          </ul>
          <button className="cta-btn">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              Get Started
            </Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="features"
        style={{ backgroundImage: `url(${beefImage})` }}
      >
        <h2>Why Choose HalalEats?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img
              src="https://img.icons8.com/?size=100&id=MpcQ6vSIr435&format=png&color=000000"
              alt="Location Icon"
            />
            <h3>Find Nearby Butchers</h3>
            <p>Easily locate Halal-certified butchers in your area.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://img.icons8.com/?size=100&id=23535&format=png&color=000000"
              alt="Quality Icon"
            />
            <h3>Fresh & High Quality</h3>
            <p>
              Enjoy fresh, high-quality meats that meet all Halal standards.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="https://img.icons8.com/?size=100&id=lj5w5QP6PDDS&format=png&color=000000"
              alt="Delivery Icon"
            />
            <h3>Convenient Delivery</h3>
            <p>Get your orders delivered straight to your doorstep.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>Connect with us on social media!</p>
        <div className="social-media-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=kQzCK4emnaD2&format=png&color=000000"
              alt="Facebook"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=nqNUh96dR8d4&format=png&color=000000"
              alt="Twitter"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=mWneIrmdR0s6&format=png&color=000000"
              alt="Instagram"
            />
          </a>
        </div>
        <p>&copy; 2025 HalalEats. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
