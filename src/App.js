import React, { useEffect, useState } from "react";
const api = {
	key: "71cf3861004f2946838e53dad6c53f88",
	base: "https://api.openweathermap.org/data/2.5/",
	base_img: "http://openweathermap.org/img/w/",
};

function App() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	const [colorTheme, setColorTheme] = useState("theme-black");

	//effect
	useEffect(() => {
		const currentThemeColor = localStorage.getItem("theme-color");

		if (currentThemeColor) {
			setColorTheme(currentThemeColor);
		}
	}, []);

	const handleChangeTheme = (themeID) => {
		setColorTheme(themeID);
		localStorage.setItem("theme-color", themeID);
	};

	const seacrh = (event) => {
		if (event.key === "Enter") {
			fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery("");
					console.log(result);
				});
		}
	};

	const getImage = (code) => {
		return `${api.base_img}${code}.png`;
	};

	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];

		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	return (
		<div className={`app ${colorTheme}`}>
			<div className="theme-options">
				<div
					id="theme-black"
					onClick={() => handleChangeTheme("theme-black")}
					className={
						`${colorTheme}` === "theme-black" ? "active" : ""
					}
				></div>
				<div
					id="theme-purple"
					onClick={() => handleChangeTheme("theme-purple")}
					className={
						`${colorTheme}` === "theme-purple" ? "active" : ""
					}
				></div>
				<div
					id="theme-yellow"
					onClick={() => handleChangeTheme("theme-yellow")}
					className={
						`${colorTheme}` === "theme-yellow" ? "active" : ""
					}
				></div>
				<div
					id="theme-white"
					onClick={() => handleChangeTheme("theme-white")}
					className={
						`${colorTheme}` === "theme-white" ? "active" : ""
					}
				></div>
				<div
					id="theme-green"
					onClick={() => handleChangeTheme("theme-green")}
					className={
						`${colorTheme}` === "theme-green" ? "active" : ""
					}
				></div>
				<div
					id="theme-blue"
					onClick={() => handleChangeTheme("theme-blue")}
					className={`${colorTheme}` === "theme-blue" ? "active" : ""}
				></div>
			</div>
			<div
				className={
					typeof weather.main != "undefined"
						? weather.main.temp > 16
							? "warm weather-app-container"
							: "weather-app-container"
						: "weather-app-container"
				}
			>
				<main>
					<div className="search-box">
						<input
							type="text"
							className="search-bar"
							placeholder="Search..."
							onChange={(e) => setQuery(e.target.value)}
							value={query}
							onKeyPress={seacrh}
						/>
					</div>

					<div className="location-box">
						{typeof weather.sys != "undefined" ? (
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
						) : (
							<div className="location">
								Wellcome <br /> to Weather App
							</div>
						)}
						<div className="date">{dateBuilder(new Date())}</div>
					</div>

					{typeof weather.main != "undefined" ? (
						<div className="weather-box">
							<div className="temp">
								<span>
									{Math.round(weather.main.temp)}&#8451;
								</span>
							</div>
							<div className="iconWeather">
								<img
									src={getImage(weather.weather[0].icon)}
									alt="Icon Weather"
								/>
							</div>
							<div className="weather">
								{weather.weather[0].main}
							</div>
						</div>
					) : (
						""
					)}
				</main>
			</div>
		</div>
	);
}

export default App;
