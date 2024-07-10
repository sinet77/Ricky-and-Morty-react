import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import CreateCharacters from "./components/CreateCharacters/CreateCharacters";
// import { CreateCharacters } from "./components/CreateCharacters/CreateCharacters.jsx";

function App() {
  const [data, setData] = useState({ results: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [allCharacters, setAllCharacters] = useState([]);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setNextPage(json.info.next);
        setPrevPage(json.info.prev);
      });
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let allResults = [];

    const fetchPage = (page) => {
      const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          allResults = [...allResults, ...json.results];
          if (json.info.next) {
            fetchPage(page + 1);
          } else {
            setAllCharacters(allResults);
          }
        });
    };

    fetchPage(currentPage);
  };

  const goToNextPage = () => {
    if (nextPage !== null) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (prevPage !== null) {
      setCurrentPage(currentPage - 1);
    }
  };
  const characterInput = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };
  const filteredResultsOfCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );
  return (
    <>
      <div className="background">
        <div className="headline">
          <h1 className="head-title">Ricky and Morty Search</h1>
        </div>
        <div className="app">
          <div className="subline">
            <input
              type="text"
              className="character-bar"
              placeholder="Search for a character..."
              value={inputValue}
              onChange={characterInput}
            />
            <div className="bothButtons">
              <button className="prev-page" onClick={goToPrevPage}>
                Previous page
              </button>
              <button className="next-page" onClick={goToNextPage}>
                Next page
              </button>
            </div>
          </div>
          <div className="main">
            {inputValue === ""
              ? data.results.map((character) => (
                  <CreateCharacters key={character.id} character={character} />
                ))
              : filteredResultsOfCharacters.map((character) => (
                  <CreateCharacters key={character.id} character={character} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
