import { useState } from "react";
import { useEffect } from "react";
import CreateCharacters from "./components/CreateCharacters/CreateCharacters";
import styles from "./App.module.css";

function App() {
  const [[start, end], setRange] = useState([0, 20]);
  const [inputValue, setInputValue] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);

  useEffect(() => {
    fetchAllData(1);
  }, []);

  const fetchAllData = async (page) => {
    let allResults = [];

    const getData = async (page) => {
      const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      allResults = [...allResults, ...data.results];

      if (data.info.next) {
        await getData(page + 1);
      }
    };

    await getData(page);

    setAllCharacters(allResults);
  };

  const goToNextPage = () => {
    if (end < allCharacters.length) {
      setRange([start + 20, end + 20]);
    }
  };

  const goToPrevPage = () => {
    if (start > 0) {
      setRange([start - 20, end - 20]);
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
      <div className={styles.background}>
        <div className={styles.headline}>
          <h1 className={styles.headTitle}>Ricky and Morty Search</h1>
        </div>
        <div className={styles.app}>
          <div className={styles.subline}>
            <input
              type="text"
              className={styles.characterBar}
              placeholder="Search for a character..."
              value={inputValue}
              onChange={characterInput}
            />
            <div className={styles.bothButtons}>
              <button
                className={styles.prevPage}
                onClick={goToPrevPage}
                disabled={start === 0}
              >
                Previous page
              </button>
              <button
                className={styles.nextPage}
                onClick={goToNextPage}
                disabled={end >= allCharacters.length}
              >
                Next page
              </button>
            </div>
          </div>
          <div className={styles.main}>
            {inputValue === ""
              ? allCharacters
                  .slice(start, end)
                  .map((character) => (
                    <CreateCharacters
                      key={character.id}
                      character={character}
                    />
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
