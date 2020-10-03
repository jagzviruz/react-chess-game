import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend'

import initialPositions from '../utils/initialPositions';

import Piece from '../components/Piece';
import Cell from '../components/Cell';

import './chessboard.css';

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    const boardPositions = {};

    initialPositions.forEach(({ type, color, initial: [x, y] }) => {
      boardPositions[`${x}-${y}`] = {
        type,
        color,
      };
    });
    this.state = {
      boardPositions,
    };
  }

  getPiece(x, y) {
    const { boardPositions } = this.state;
    const piece = boardPositions[`${x}-${y}`];

    if (!piece) return null;
    return <Piece type={piece.type} color={piece.color} isAlive x={x} y={y} />;
  }

  getGrid(m, n) {
    const rows = [];
    for (let i = 0; i < m; i++) {
      const cols = [];
      const rowKey = `row-${i}`;

      for (let j = 0; j < n; j++) {
        const colKey = `cell-${i}-${j}`;
        cols.push(
          <Cell key={colKey} x={j} y={i}>
            {this.getPiece(j, i)}
          </Cell>,
        );
      }
      rows.push(
        <div className="row" key={rowKey}>
          {cols}
        </div>
      );
    }
    return rows;
  }

  render() {
    const acrossLabel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const verticalLabel = ['1', '2', '3', '4', '5', '6', '7', '8'];

    return (
      <div className="chessboard">
        <div className="top-edge">
          {acrossLabel.map((label, index) => (
            <div className="top-label-cell" key={`top-label-${index}`}>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="left-edge">
          {verticalLabel.map((label, index) => (
            <div className="left-label-cell" key={`left-label-${index}`}>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="grid">
          <DndProvider backend={TouchBackend}>{this.getGrid(8, 8)}</DndProvider>
        </div>
        <div className="right-edge">
          {verticalLabel.map((label, index) => (
            <div className="right-label-cell" key={`right-label-${index}`}>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="bottom-edge">
          {acrossLabel.map((label, index) => (
            <div className="bottom-label-cell" key={`bottom-label-${index}`}>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ChessBoard;
