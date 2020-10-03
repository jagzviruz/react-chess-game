import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import { PieceTypes } from './Piece';

export default ({ colKey, children, x, y }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [canAccept, setCanAccept] = useState(false);
  const [, drop] = useDrop({
    accept: PieceTypes,
    drop: (item, monitor) => {
      console.log(item);
      console.log(`dropped at : [${x}, ${y}]`);
    },
    collect: (monitor) => {
      if (monitor.isOver()) {
        /**
         * If cell is empty AND the 'item' can move 'from' to [x,y]
         * then the cell can accept it.
         */
        setIsHovered(true);
        setCanAccept(true);
      } else {
        setIsHovered(false);
      }
    },
  });
  return (
    <div className={`cell ${isHovered ? 'hovered' : ''} ${isHovered ? (canAccept ? 'is-valid-target' : 'is-invalid-target') : ''}`} ref={drop}>
      {children}
    </div>
  );
};
