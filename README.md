#### Technoglogy :
- nodejs
- express 
- socket io
- chess js

## Plan: 
-
#### Initialization:
- Socket and chess objects are initialized.
- Board element is selected from the DOM.
- Initial values for draggedPiece, sourceSquare and PlayerRole ar set to null.


#### Initial Board Rendering:
- renderBoard() is called to display the initial state of the chessboard.

#### Drag and drop functionality:
- renderBoard() sets up drag and drop event listeners for each piece and square.

- Pieces are draggable based on the player's role.

- when a piece is dragged, draggedPiece and sourceSquare are set.

- When a piece is dropped, handleMove() is called to handle the move logic and emit it to the server.

#### Socket event handling:
- -> client,server


--browser1-------------server-------------browser2
- single server connection

##### Variables client side:
- Socket -> Connection to the server Using socket.io
- Chess -> An Instance of the Chess class.
- BoardElement -> DOM element with the ID"Chessboard"
- DraggedPiece -> The Piece Being Dragged during a drag and drop action
- SourceSquare -> Stores the starting square of the dragged place.
- PlayerRole -> Holds the role of the player (W for White , B for Black or Null for a spectator)

##### Function Client side:
- RenderBoard
- handledmove
- getpieceunicode

##### Socket Client side
- socketon("playerrole")
- SocketOn("Spectator role")
- socketon(boardstate)
- socketon(move)


### Server Functionality:
- server ka kaam :
 ek group chat hai usme 12 log hai meine ek msg dala vo sbko dikehga kese kyunki server esa kr rha hai

 msg->server->send to all including me
 msg -> server-> one on one chat
 ###### Broadcasting
 msg-> server -> send to all excluding you jese whtsp pr saamne wale ko dikhta hai na u are typing