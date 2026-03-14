import React from "react";
import Header from "../components/Home/Header";
import HeroSection from "../components/Home/HeroSection";
import SearchBar from "../components/Home/SearchBar";
import Logo from "../components/Home/Logo";
import RateLimitBadge from "../components/Home/RateLimitBadge";

const Home = () => {
    return (
        <div className="home-container">
            <main className="home-content">
                <Header/>
                <HeroSection/>
                <SearchBar/>
                <p className="hint">
                    Try usernames like <span>torvalds</span>, <span>gaearon</span>, or <span>tj</span>
                </p>
                <RateLimitBadge />
            </main>
        </div>
    );
};

export default Home;