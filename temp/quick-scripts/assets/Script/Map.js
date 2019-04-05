(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Map.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eba15lU8plEJI7AIV1TqND0', 'Map', __filename);
// Script/Map.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Picitem_1 = require("./Picitem");
var Algorithm_1 = require("./Algorithm");
var Game_1 = require("./Game");
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game = null;
        _this.pic = null; //图片预置资源
        _this.pics = new Array();
        _this.picCount = 8; //图片个数（与pics数组的length一致）
        _this.length = 60; //单元格长度
        _this.rows = 0; //行
        _this.colmns = 0; //列
        return _this;
    }
    Map_1 = Map;
    Map.prototype.start = function () {
        this.initMapArray();
        this.addPicItems();
    };
    Map.prototype.update = function (dt) {
        if (Map_1.twoPics.length > 1) {
            if (Algorithm_1.Algorithm.canBeRemoved(Map_1.twoPics[0].pos, Map_1.twoPics[1].pos, this.mapArray)) {
                this.removePicNodes(Map_1.twoPics);
                this.game.getScore();
            }
            else {
                this.goBackPicsStyle(Map_1.twoPics);
            }
            Map_1.twoPics = [];
        }
        if (this.node.children.length < 2) {
            this.game.gameOver();
        }
    };
    /**
     * @description: 初始化二维数组
     * @param {type}
     * @return:
     */
    Map.prototype.initMapArray = function () {
        this.rows = Math.floor(this.node.width / this.length);
        this.colmns = Math.floor(this.node.height / this.length);
        this.mapArray = [];
        for (var i = 0; i < this.rows; ++i) {
            this.mapArray[i] = Array(this.colmns);
            for (var j = 0; j < this.colmns; ++j) {
                this.mapArray[i][j] = 0;
            }
        }
    };
    /**
     * @description: 在本节点添加多张图片精灵
     * @param {type}
     * @return:
     */
    Map.prototype.addPicItems = function () {
        var randomList = this.getDoubleRandomList();
        for (var i = 1; i < this.rows - 1; ++i) {
            for (var j = 1; j < this.colmns - 1; ++j) {
                //实例化预制资源图
                var picitem = cc.instantiate(this.pic);
                //添加到地图
                this.node.addChild(picitem);
                //设置每个实例的位置
                picitem.setPosition(i * this.length + this.length / 2, -j * this.length - this.length / 2);
                //得到随机数组里的值
                var temp = randomList[(i - 1) * (this.colmns - 2) + (j - 1)];
                //初始化每个图片的位置、名字信息
                picitem.getComponent(Picitem_1.Picitem).pos = cc.v2(i, j);
                picitem.getComponent(Picitem_1.Picitem).picId = temp;
                //随机填充图片
                picitem.getComponent(cc.Sprite).spriteFrame = this.pics[temp - 1];
                this.mapArray[i][j] = temp;
            }
        }
    };
    /**
     * @description: 得到每个数字都有偶数个的一维数组
     * @param {type}
     * @return: 随机且每项数目为偶数的数组
     */
    Map.prototype.getDoubleRandomList = function () {
        //保证生成的每个数字都有偶数个
        var randomList = new Array();
        for (var i = (this.rows - 2) * (this.colmns - 2) / 2 - 1; i >= 0; --i) {
            var randomNum = Math.floor(Math.random() * this.picCount + 1); // 1~8
            randomList.push(randomNum);
            randomList.push(randomNum);
        }
        //对数组随机排序
        randomList.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
        return randomList;
    };
    /**
     * @description: 消除多张图片
     * @param {Picitem[]} 图片数组
     * @return: 无
     */
    Map.prototype.removePicNodes = function (pics) {
        var _this = this;
        pics.forEach(function (item) {
            item.isRemoved = true;
            item.removePic();
            _this.mapArray[item.pos.x][item.pos.y] = 0;
        });
    };
    /**
     * @description: 还原多张图的样式
     * @param {Picitem[]} 图片数组
     * @return: 无
     */
    Map.prototype.goBackPicsStyle = function (pics) {
        pics.forEach(function (item) { item.isSelected = false; item.changeStyle(); });
    };
    /**
     * @description: 遍历多维数组，判断是否所有值都为0
     * @param {type} 无
     * @return: true/false
     */
    Map.prototype.allValueIsZero = function () {
        return (this.mapArray + '').split(',').every(function (item) { return item === '0'; });
    };
    var Map_1;
    Map.twoPics = []; //存取两个被点击的图片
    __decorate([
        property(Game_1.Game)
    ], Map.prototype, "game", void 0);
    __decorate([
        property(cc.Prefab)
    ], Map.prototype, "pic", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Map.prototype, "pics", void 0);
    __decorate([
        property
    ], Map.prototype, "picCount", void 0);
    Map = Map_1 = __decorate([
        ccclass
    ], Map);
    return Map;
}(cc.Component));
exports.Map = Map;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Map.js.map
        