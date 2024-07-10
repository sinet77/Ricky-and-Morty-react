import { useNavigate } from "react-router-dom";
import "./CreateCharacters.css";

const CreateCharacters = ({ character }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };
  return (
    <div className="character-box" onClick={handleClick}>
      <img className="image" alt="Image of a character" src={character.image} />
      <div className="description">
        <div className="character-name">{character.name}</div>
        <div className="together">
          <div className="population">{character.species}</div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacters;
