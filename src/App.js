import React from "react";
import { useState, useEffect } from "react";

import "./App.css";
import MovieCard from "./MovieCard";
import searchIcon from "./search.svg";
//21b31623
const API_URL = "https://www.omdbapi.com?apikey=21b31623";

const App = () => {
	const [movies, setMovies] = useState([]);

	const [searchValue, setSearchValue] = useState("");

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();

		setMovies(data.Search);
	};
	useEffect(() => {
		searchMovies("all");
	}, []);

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			searchMovies(searchValue);
		}
	};

	return (
		<div className="app">
			<h1>MovieSpoT</h1>
			<div className="search">
				<input
					placeholder="search"
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
					onKeyDown={handleKeyPress}
				/>

				<img
					src={searchIcon}
					alt="search"
					onClick={() => {
						searchMovies(searchValue);
					}}
				/>
			</div>
			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => {
						return <MovieCard movie={movie} />;
					})}
				</div>
			) : (
				<div className="empty">
					<h2> No movies found</h2>
				</div>
			)}
		</div>
	);
};

export default App;
