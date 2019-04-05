"use strict";
cc._RF.push(module, '87c3elk7RVItYjrM2SPliD4', 'Picitem');
// Script/Picitem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Map_1 = require("./Map");
var Picitem = /** @class */ (function (_super) {
    __extends(Picitem, _super);
    function Picitem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.picId = 0; //图片名称 
        _this.isSelected = false; //是否被选中 
        _this.isRemoved = false; //是否可消除
        return _this;
    }
    Picitem.prototype.onLoad = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () { Map_1.Map.twoPics.push(_this), _this.isSelected = true, _this.changeStyle(); }, this);
    };
    /**
     * @description: 销毁图片自身节点
     * @param {type}
     * @return:
     */
    Picitem.prototype.removePic = function () {
        if (this.isRemoved) {
            this.node.destroy();
        }
    };
    /**
     * @description: 改变图片自身样式
     * @param {type}
     * @return:
     */
    Picitem.prototype.changeStyle = function () {
        if (this.isSelected) {
            this.node.color = cc.Color.MAGENTA;
            this.node.scale = 1.06;
            this.node.opacity = 200;
        }
        else {
            this.node.color = cc.color(255, 255, 255);
            this.node.scale = 1;
            this.node.opacity = 255;
        }
    };
    Picitem = __decorate([
        ccclass
    ], Picitem);
    return Picitem;
}(cc.Component));
exports.Picitem = Picitem;

cc._RF.pop();