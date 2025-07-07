import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.image} alt={props.title} className="card-image" />
      <h2 className="card-title">{props.title}</h2>
      <p className="card-description">{props.description}</p>
    </div>
  );
};

export default Card;