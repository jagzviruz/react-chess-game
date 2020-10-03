import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import Bishop from './Bishop';
import King from './King';
import Knight from './Knight';
import Pawn from './Pawn';
import Queen from './Queen';
import Rook from './Rook';

const components = {
  bishop: Bishop,
  king: King,
  knight: Knight,
  pawn: Pawn,
  queen: Queen,
  rook: Rook,
};

export const PieceTypes = Object.keys(components);

const Piece = ({
  type = 'pawn',
  color = 'black',
  isAlive = true,
  x = 0,
  y = 0,
}) => {
  const GamePiece = components[type];
  const [{ isDragging }, drag] = useDrag({
    item: { type, from: [x, y] },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <span
      ref={drag}
      className="game-piece-wrapper"
      style={{
        opacity: isDragging ? 0.1 : 1,
      }}
    >
      <GamePiece
        color={color}
        className={`piece ${isAlive ? 'draggable' : ''}`}
      />
    </span>
  );
};

Piece.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isAlive: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Piece;
