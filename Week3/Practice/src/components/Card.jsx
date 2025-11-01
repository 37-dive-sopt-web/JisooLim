import * as s from './Card.module.css';

const Card = ({name, github, englishName}) => {
  return (
    <div className={s.card}>
      <p>{name}</p>
      <p>깃허브: {github}</p>
      <p>영문이름: {englishName}</p>
    </div>
  );
};

export default Card;