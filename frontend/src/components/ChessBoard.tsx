import type { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

function ChessBoard({
  board,socket,setBoard,chess
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][],
  socket:WebSocket,
  setBoard: React.Dispatch<React.SetStateAction<({
      square: Square;
      type: PieceSymbol;
      color: Color;
  } | null)[][]>>,
  chess: Chess
}) {
  const [from, setFrom] = useState<Square | null>(null)
  const [to, setTo] = useState<Square | null>(null)
  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
              return (
                <div
                  onClick={()=>{
                    if (!from) {
                      setFrom(squareRepresentation)
                    }else{
                      socket.send(JSON.stringify({
                        type: MOVE,
                        payload: {
                          move: {
                              from,
                              to: squareRepresentation
                          }
                        }
                      }))
                      chess.move({
                          from,
                          to: squareRepresentation
                      });
                      setBoard(chess.board());
                      setFrom(null);
                    }
                  }}
                  key={j}
                  className={`w-8 h-8 ${
                    (i+j)%2==0 ? "bg-green-500" : "bg-green-300"
                  }`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col ">
                      {square ? <img className="w-4" src={`/${square.color ==='b' ? square?.type: `${square?.type.toUpperCase()} copy`}.svg`} />: null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ChessBoard;
