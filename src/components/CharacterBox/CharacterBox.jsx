import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CharacterBox.css";

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
      console.log(episodeData);
    };

    fetchCharacter();
  }, [characterId]);

  if (!character) return <div>Loading...</div>;

  return (
    <div className="character-click">
      <div className="click-main">
        <div className="first-column">
          <img
            className="imageInsideCharacterBox"
            alt="Character"
            src={character.image}
          />
        </div>

        <div className="second-column">
          <div className="character-name">{character.name}</div>
          <div className="character-info">
            <div className="description-name">
              <strong>Gender: {character.gender}</strong>
              <span id="gender"></span>
            </div>
            <div className="description-name">
              <strong>Location: {character.location.name}</strong>
              <span id="locationName"></span>
            </div>
            <div className="description-name">
              <strong>Status: {character.status}</strong>
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
