import Game from './game/game.ts'
import CliGameImpl from './cli/cligameimpl.ts'
import Util from './util.ts'

const game: Game = new Game(new CliGameImpl(Util.createDefaultBoard()))
game.start()

