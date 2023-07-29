# chess
Well-optimized chess move validation engine. (under development)

## Understanding responsibilities of chess validation engine

### Must be fast
Chess engines(I mean engines which finds best moves) like Stockfish and AI softwares like AlphaZero, have to calculate billions of legal moves. So, one of the responsibilities of a chess validation engine is working fast.

### Must care exceptions
Chess looks like easy to code. However, I can say it is not. It has strange exceptions that makes me tired. Let's see rules of the chess.

#### En Passant
A unique chess rule allowing a pawn to capture an opponent's pawn as it moves forward two squares from the starting position, preventing potential exploitation and adding tactical possibilities to the game. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#En_passant))

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/3d3b5748-54d7-455d-9ae0-11dc34b8e782">

#### Promotions
The rule in chess where a pawn can be promoted to any other piece upon reaching the opposite end of the board, providing an opportunity to enhance its power and strategic options.([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Promotion))

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/3d266c05-d963-4a9f-8e75-680af4282c68">

#### King cannot stay threatened
A fundamental chess principle that states if the king is in check, the player must make a move that removes the threat; failure to do so would result in an illegal position.

#### Castling
A strategic maneuver in chess where the king and one of the rooks move together to establish the king's safety, involving a unique set of rules governing their movement and ensuring the king's protection. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Castling))

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/f6be45cd-5328-444e-a00f-fcc6ef158489">

#### Dead Position
Refers to a state in chess where neither player can checkmate the opponent due to insufficient material or the inability to create a winning position, resulting in a draw. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Dead_position))

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/5c6e46e0-f6bf-46ef-9213-c5d8b68fe592">

#### Fifty-move rule
A chess regulation that declares a draw if no captures are made and no pawn is moved within the last fifty moves, preventing excessively long games and ensuring progress in the gameplay.([wikipedia](https://en.wikipedia.org/wiki/Fifty-move_rule))

#### Fivefold Repetition Rule
The fivefold repetition rule requires the arbiter to intervene and declare the game drawn if the same position occurs five times, needing no claim by the players. ([wikipedia](https://en.wikipedia.org/wiki/Threefold_repetition#:~:text=By%20contrast%2C%20the%20fivefold%20repetition,no%20claim%20by%20the%20players.))

### Must be standalone
Validating a chess move does not matter alone. The engine is a core library and should be able to be used anywhere. That is why a chess validation engine must be standalone, allowing people to integrate it into their own systems.

## How it works?

### Pre-conditions

We can understand are any 2 square on same linear (diagonal, horizontal or vertical) line using only math functions. (We're using them because they are fast.)

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/75c6cb48-2e8b-4ff3-805b-16a2c42f201e">

* **Vertical Check** - if (x1 === x2) then two square are on same vertical line.

* **Horizontal Check** - if (y1 === y2) then two square are on same horizontal line.

* **Diagonal Check** - if (abs(x1 - x2) === abs(y1 - y2)) then two square are on same diagonal line.

If any piece and its king are not on same linear line, then that is impossible to create any threat to its king. Otherwise we have to check target direction and king direction. If they are not vertical axes, then that is impossible to create any threat to its king.

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/4d3bee07-f8b5-439f-87df-d04f22ec12cf">

then Otherwise, if the piece and its king are on same linear line, then we need a vector from king to piece. 

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/13012301-1b25-4759-8459-ef79c6a09e21">

We have to normalize the vector. Set 1 to all positive coordinates, set -1 to all negative coordinates, leave 0 to all 0 coordinates of it.

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/ddf68eb9-25d1-475b-acd0-f24794b98f9a">

Then we know the side of possible threat. We'll inspect the direction but, here is the end of pre-conditions. 

### Ray tracing

There is 3 ray tracer piece,
* Queen
* Bishop
* Rook

The pieces can go a few square forward in one move. However they cannot jump over pieces, you know. So we have to track a linear line to calculate legal moves of them. Important part of the pieces is they can discover check ([wikipedia](https://en.wikipedia.org/wiki/Discovered_attack)). 

If the scenario has passed pre-conditions, this method must verify the movement. The pre-conditions provide a direction from the king to the possible threatening square. We only need to check this direction.

<img width="400" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/9087bb2e-fa75-41e2-8e4d-5c16e276d4f1">

In this example, firstly c5 square will be checked. secondly d5 but it will be ignored because it is the piece that will be moved. thirdly e5, and in the end the iteration will be stop at f5 because we hit a piece. If our king is in range of the piece we hit, then we can say our rook is not able to move to d7.
