import Game from './game/game'
import CliGameImpl from './cli/cligameimpl'
import Util from './util'

const game: Game = new Game(new CliGameImpl(Util.createDefaultBoard()))
game.start()

