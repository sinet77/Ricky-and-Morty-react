import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CharacterBox.module.css";

const CharacterBox = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`
      );
      const data = await response.json();
      setCharacter(data);

      const episodeData = data.episode.map((episodeUrl) =>
        fetch(episodeUrl).then((response) => response.json())
      );

      const resolvePromisesForEpisodes = await Promise.all(episodeData);
      setEpisodes(resolvePromisesForEpisodes);
    };

    fetchCharacter();
  }, [characterId]);

  if (!character) return <div>Loading...</div>;

  return (
    <div className={styles.characterDetails}>
      <div className={styles.clickMain}>
        <div className={styles.firstColumn}>
          <img
            className="imageInsideCharacterBox"
            alt="Character"
            src={character.image}
          />
        </div>

        <div className={styles.secondColumn}>
          <div className={styles.characterName}>{character.name}</div>
          <div className={styles.characterInfo}>
            <div className="description-name">
              <strong>Gender: </strong>
              {character.gender}
              <span id="gender"></span>
            </div>
            <div className="description-name">
              <strong>Location: </strong>
              {character.location.name}
              <span id="locationName"></span>
            </div>
            <div className="description-name">
              <strong>Status: </strong>
              {character.status}
              <span id="status"></span>
            </div>
            <div className="description-name">
              <strong>List of episodes: </strong>
              <ul id="episodeList">
                {episodes.map((episode) => (
                  <li key={episode.id}>
                    {episode.episode}: {episode.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterBox;
