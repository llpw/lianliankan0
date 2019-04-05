"use strict";
cc._RF.push(module, '44d1ex9gZxNqaAZNJhrGZ6t', 'Painter');
// Script/Painter.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Painter = /** @class */ (function (_super) {
    __extends(Painter, _super);
    function Painter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //线条颜色
        _this.lineColor = cc.Color.YELLOW;
        return _this;
    }
    //在某点画圆
    Painter.prototype.drawCircle = function (pos) {
        var x = pos.x * 60 + 30, y = -pos.y * 60 - 30, r = 10;
        this.ctx.circle(x, y, r);
        this.ctx.fillColor = this.lineColor;
        this.ctx.fill();
    };
    Painter = __decorate([
        ccclass
    ], Painter);
    return Painter;
}(cc.Component));
exports.Painter = Painter;

cc._RF.pop();