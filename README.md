# chess
Well-optimized chess move validation engine. (under development)

## Understanding responsibilities of chess validation engine

### Must be fast
Chess engines(I mean engines finds best moves) like Stockfish and AI softwares like AlphaZero, have to calculate billions of legal moves. So, one of the responsibilities of a chess validation engine is working fast.

### Must care exceptions
Chess looks like easy to code. However, I can say it is not. It has strange exceptions that makes me tired. Let's see rules of the chess.

#### En Passant
A unique chess rule allowing a pawn to capture an opponent's pawn as it moves forward two squares from the starting position, preventing potential exploitation and adding tactical possibilities to the game. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#En_passant))

<img width="200" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/41d89812-54d2-4626-a265-9170fdbe0b5e">
<img width="200" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/3d3b5748-54d7-455d-9ae0-11dc34b8e782">

#### Promotions
The rule in chess where a pawn can be promoted to any other piece upon reaching the opposite end of the board, providing an opportunity to enhance its power and strategic options.([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Promotion))

<img width="200" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/3d266c05-d963-4a9f-8e75-680af4282c68">

#### King cannot stay threatened
A fundamental chess principle that states if the king is in check, the player must make a move that removes the threat; failure to do so would result in an illegal position.

#### Castling
A strategic maneuver in chess where the king and one of the rooks move together to establish the king's safety, involving a unique set of rules governing their movement and ensuring the king's protection. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Castling))

<img width="200" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/f6be45cd-5328-444e-a00f-fcc6ef158489">

#### Dead Position
Refers to a state in chess where neither player can checkmate the opponent due to insufficient material or the inability to create a winning position, resulting in a draw. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Dead_position))

<img width="236" alt="image" src="https://github.com/hamza-cskn/chess/assets/36128276/5c6e46e0-f6bf-46ef-9213-c5d8b68fe592">

#### Fifty-move rule
A chess regulation that declares a draw if no captures are made and no pawn is moved within the last fifty moves, preventing excessively long games and ensuring progress in the gameplay.([wikipedia](https://en.wikipedia.org/wiki/Fifty-move_rule))

### Fivefold Repetition Rule
The fivefold repetition rule requires the arbiter to intervene and declare the game drawn if the same position occurs five times, needing no claim by the players. ([wikipedia](https://en.wikipedia.org/wiki/Threefold_repetition#:~:text=By%20contrast%2C%20the%20fivefold%20repetition,no%20claim%20by%20the%20players.))

### Must be standalone
Validating a chess move does not matter alone. The engine is a core library and should be able to be used anywhere. That is why a chess validation engine must be standalone, allowing people to integrate it into their own systems.

## How it works?

### Pre-conditions
