import { useNavigate } from "react-router-dom";
import styles from "./CreateCharacters.module.css";

const CreateCharacters = ({ character }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };
  return (
    <div className={styles["character-box"]} onClick={handleClick}>
      <img
        className={styles.image}
        alt="Image of a character"
        src={character.image}
      />
      <div className={styles.description}>
        <div className={styles.characterName}>{character.name}</div>
        <div className={styles.together}>
          <div className={styles.population}>{character.species}</div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacters;
