import "./CreateCharacters.css";

const CreateCharacters = ({ character }) => {
  return (
    <div className="character-box">
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
