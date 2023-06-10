"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./game/game");
var cligameimpl_1 = require("./cli/cligameimpl");
var util_1 = require("./util");
var game = new game_1.default(new cligameimpl_1.default(util_1.default.createDefaultBoard()));
game.start();
