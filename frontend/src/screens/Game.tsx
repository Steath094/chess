import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import ChessBoard from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";
export const INIT_GAME =  "init_game";
export const MOVE = "move"
export const GAME_OVER = "game_over"
function Game() {
    const socket = useSocket();
    const [chess,setChess] = useState(new Chess());
    const [board,setBoard] = useState(chess.board());
    useEffect(()=>{
        if (!socket) {
            return
        }
        socket.onmessage=(event)=> {
            const message = JSON.parse(event.data);
            switch(message.type){
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log("Board is initialized");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move done");
                    break;
                case GAME_OVER:
                    console.log("Game Over");
                    break;
            }
        }
    },[socket])
    if (!socket) {
        return <div>
            connecting...
        </div>
    }
  return (
    <div className="flex justify-center items-center p-8">
        <div className="max-w-5xl w-full">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-4">
                    <ChessBoard board={board}/>
                </div>
                <div className="col-span-2">
                    <Button onClick={()=> {
                        socket.send(JSON.stringify({
                            type: INIT_GAME
                        }))
                    }}>
                    Play
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Game