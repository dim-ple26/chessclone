const socket = io();// just this single line starts on browser of both the players
// ye line frontend pr likhenge lekin iski 
// request automatically backend pr chli jaygi
//dono player ka backend to same hi hai
// to bss request jaygi backend pr hi or agr jaati hai to humara console log chlna chahye
// io.on() pr jaygi

//socket.emit("churan") // throw krna backend jayga
// frontend s kuch bheja hai jo backend pr on krke humne receive kr liya hai

const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML="";
    board.forEach((row , rowindex) => {
        row.forEach((square , squareindex)=> {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square",
                (rowindex + squareindex)%2 === 0 ? "light" : "dark");
                // checked pattern 

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if(square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece",square.color === 'W' ? "white" : "black");
                pieceElement.innerText =getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart",(e) => {
                    if(pieceElement.draggable){
                        draggedPiece = pieceElement;
                        sourceSquare={row: rowindex , col: squareindex};
                        e.dataTransfer.setData("text/plain","");
                    }

                });
                pieceElement.addEventListener("dragend",(e) => {
                    draggedPiece=null;
                    sourceSquare=null;
                });
                squareElement.appendChild(pieceElement);

            }

            squareElement.addEventListener("dragover",function(e) {
                e.preventDefault();
            });

            squareElement.addEventListener("drop",function(e){
                e.preventDefault();
                if(draggedPiece){
                    const targetSource ={
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                        
                    };
                    handleMove(sourceSquare,targetSource);

                }
            })

        });
        boardElement.appendChild(board);


    
    });

    if(playerRole === 'B'){
        boardElement.classList.add("flipped");
    }
    else{
        boardElement.classList.remove("flipped");
    }

};

const handleMove = (source,target) => {
    const move = {
        from:`${String.fromCharCode(97+source.col)}${8- source.row}`,
        to:`${String.fromCharCode(97+target.col)}${8- target.row}`,
        promotion:'q'
    };
    socket.emit("move",move);
};

const getPieceUnicode =(piece) =>{
  const unicodePieces = {
    K: "♔", 
    k: "♚",
    Q: "♕", 
    q: "♛", 
    R: "♖", 
    r:"♜", 
    B:"♗", 
    b:"♝", 
    K: "♘", 
    k:"♞", 
    P:"♙", 
    p:"♟",
}
  return unicodePieces[piece.type] || "";

};

socket.on("playerRole",function(role){
    playerRole=role;
    renderBoard();
});

socket.on("spectatorRole",function(){
    playerRole=null;
    renderBoard();
})

socket.on("boardState",function(fen) {
    chess.load(fen);
    renderBoard();
});

socket.on("move",function(fen) {
    chess.move(fen);
    renderBoard();
});



renderBoard();