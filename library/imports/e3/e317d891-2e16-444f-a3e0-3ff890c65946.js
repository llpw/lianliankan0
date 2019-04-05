"use strict";
cc._RF.push(module, 'e317diRLhZET6PgP/iQxllG', 'Game');
// Script/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scoreDisplay = null;
        _this.timeDisplay = null;
        _this.score = 0; //分数
        _this.time = 60; //界面倒计时
        _this.isGameOver = false;
        _this.timer = 0; //保存setInterval函数返回值
        return _this;
    }
    Game.prototype.start = function () {
        var _this = this;
        this.score = 0;
        this.time = 60;
        this.isGameOver = false;
        this.timer = setInterval(function () { _this.getTime(); }, 1000);
    };
    Game.prototype.onDestroy = function () {
        clearInterval(this.timer);
    };
    /**
     * @description: 消除一组图得分
     * @param {type} 无
     * @return: 无
     */
    Game.prototype.getScore = function () {
        ++this.score;
        this.scoreDisplay.string = "Score: " + this.double(this.score);
    };
    /**
     * @description: 倒计时
     * @param {type} 无
     * @return: 无
     */
    Game.prototype.getTime = function () {
        --this.time;
        this.timeDisplay.string = "00:00:" + this.double(this.time);
        if (this.time === 0) {
            this.gameOver();
        }
    };
    /**
     * @description: 游戏结束，下一局
     * @param {type}
     * @return:
     */
    Game.prototype.gameOver = function () {
        this.isGameOver = true;
        cc.director.loadScene("game");
    };
    /**
     * @description: 将小于10的数字前面加0显示
     * @param {type} num
     * @return:
     */
    Game.prototype.double = function (num) {
        return num < 10 ? "0" + num : num;
    };
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreDisplay", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "timeDisplay", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.Game = Game;

cc._RF.pop();