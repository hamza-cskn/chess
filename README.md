# chess
Well-optimized chess move validation engine. (under development)

## Understanding responsibilities of chess validation engine

### Must be fast
Chess engines(I mean engines finds best moves) like Stockfish and AI softwares like AlphaZero, have to calculate billions of legal moves. So, one of the responsibilities of a chess validation engine is working fast.

### Must care exceptions
Chess looks like easy to code. However, I can say it is not. It has strange exceptions that makes me tired. Let's see rules of the chess.

#### En Passant
A unique chess rule allowing a pawn to capture an opponent's pawn as it moves forward two squares from the starting position, preventing potential exploitation and adding tactical possibilities to the game. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#En_passant))

#### Promotions
The rule in chess where a pawn can be promoted to any other piece upon reaching the opposite end of the board, providing an opportunity to enhance its power and strategic options.([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Promotion))

#### King cannot stay threatened
A fundamental chess principle that states if the king is in check, the player must make a move that removes the threat; failure to do so would result in an illegal position.

#### Castling
A strategic maneuver in chess where the king and one of the rooks move together to establish the king's safety, involving a unique set of rules governing their movement and ensuring the king's protection. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Castling))

#### Dead Position
Refers to a state in chess where neither player can checkmate the opponent due to insufficient material or the inability to create a winning position, resulting in a draw. ([wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess#Dead_position))

#### Fifty-move rule
A chess regulation that declares a draw if no captures are made and no pawn is moved within the last fifty moves, preventing excessively long games and ensuring progress in the gameplay.([wikipedia](https://en.wikipedia.org/wiki/Fifty-move_rule))

### Fivefold Repetition Rule
The fivefold repetition rule requires the arbiter to intervene and declare the game drawn if the same position occurs five times, needing no claim by the players. ([wikipedia](https://en.wikipedia.org/wiki/Threefold_repetition#:~:text=By%20contrast%2C%20the%20fivefold%20repetition,no%20claim%20by%20the%20players.))

### Must be standalone
Validating a chess move does not matter alone. The engine is a core library and should be able to be used anywhere. That is why a chess validation engine must be standalone, allowing people to integrate it into their own systems.

## How it works?

### Pre-conditions
