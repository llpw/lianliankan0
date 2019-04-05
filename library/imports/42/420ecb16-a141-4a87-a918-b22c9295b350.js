"use strict";
cc._RF.push(module, '420ecsWoUFKh6kYsiySlbNQ', 'Algorithm');
// Script/Algorithm.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Algorithm = /** @class */ (function (_super) {
    __extends(Algorithm, _super);
    function Algorithm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @description: 判断两个坐标上的图形是否可消除
     * @param {type} 坐标，坐标，二维数组
     * @return: true/false
     */
    Algorithm.canBeRemoved = function (firstPos, secondPos, mapArray) {
        if (this.isSamePoint(firstPos, secondPos)) {
            return false;
        }
        if (mapArray[firstPos.x][firstPos.y] !== mapArray[secondPos.x][secondPos.y]) {
            return false;
        }
        if (this.isHorizon(firstPos, secondPos, mapArray)) {
            return true;
        }
        if (this.isVertical(firstPos, secondPos, mapArray)) {
            return true;
        }
        if (this.isTurnOnce(firstPos, secondPos, mapArray)) {
            return true;
        }
        if (this.isTurnTwice(firstPos, secondPos, mapArray)) {
            return true;
        }
        return false;
    };
    /**
     * @description: 判断两点在水平方向上是否无障碍物(是否在同一条水平线上，且两点之间没有障碍物)
     * @param {type} 坐标，坐标，二维数组
     * @return: true/false
     */
    Algorithm.isHorizon = function (firstPos, secondPos, mapArray) {
        if (firstPos.y !== secondPos.y) {
            return false;
        }
        var startX = Math.min(firstPos.x, secondPos.x), endX = Math.max(firstPos.x, secondPos.x);
        for (var x = startX + 1; x < endX; ++x) {
            if (this.isBlocked(cc.v2(x, firstPos.y), mapArray)) {
                return false;
            }
        }
        return true;
    };
    /**
     * @description: 判断两点在垂直方向上是否无障碍物
     * @param {type} 坐标1，坐标2，二维数组
     * @return: true/false
     */
    Algorithm.isVertical = function (firstPos, secondPos, mapArray) {
        if (firstPos.x !== secondPos.x) {
            return false;
        }
        var startY = Math.min(firstPos.y, secondPos.y), endY = Math.max(firstPos.y, secondPos.y);
        for (var y = startY + 1; y < endY; ++y) {
            if (this.isBlocked(cc.v2(firstPos.x, y), mapArray)) {
                return false;
            }
        }
        return true;
    };
    /**
     * @description: 判断两点能否通过一个拐点相连
     * @param {type} 坐标，坐标，二维数组
     * @return: true/false
     */
    Algorithm.isTurnOnce = function (firstPos, secondPos, mapArray) {
        var tempPosA = cc.v2(firstPos.x, secondPos.y), tempPosB = cc.v2(secondPos.x, firstPos.y), temp = false;
        if (!this.isBlocked(tempPosA, mapArray)) {
            temp = this.isHorizon(tempPosA, secondPos, mapArray) && this.isVertical(tempPosA, firstPos, mapArray) || this.isVertical(tempPosA, secondPos, mapArray) && this.isHorizon(tempPosA, firstPos, mapArray);
            if (temp) {
                return true;
            } //该对角可作为拐点时不必判断另一个对角点了
        }
        if (!this.isBlocked(tempPosB, mapArray)) {
            temp = this.isHorizon(tempPosB, secondPos, mapArray) && this.isVertical(tempPosB, firstPos, mapArray) || this.isVertical(tempPosB, secondPos, mapArray) && this.isHorizon(tempPosB, firstPos, mapArray);
            if (temp) {
                return true;
            }
        }
        return false;
    };
    /**
     * @description: 判断两点能否通过两个拐点相连
     * @param {type} 坐标，坐标，二维数组
     * @return: true/false
     */
    Algorithm.isTurnTwice = function (firstPos, secondPos, mapArray) {
        //两个点在同一行,遍历某点垂直方向，找到一点c与该点垂直可消，与另一点一个拐点可消
        var c;
        if (firstPos.y === secondPos.y) {
            for (var y = mapArray[0].length - 1; y >= 0; --y) {
                c = cc.v2(firstPos.x, y);
                if (this.isBlocked(c, mapArray)) {
                    continue;
                }
                if (this.isVertical(c, firstPos, mapArray) && this.isTurnOnce(c, secondPos, mapArray)) {
                    return true;
                }
            }
        }
        //两个点在同一列，遍历某点水平方向，找到点c与该点水平可消，与另一点一个拐点可消
        if (firstPos.x === secondPos.x) {
            for (var col = 0; col < mapArray.length; ++col) {
                c = cc.v2(col, firstPos.y);
                if (this.isBlocked(c, mapArray)) {
                    continue;
                }
                if (this.isHorizon(c, firstPos, mapArray) && this.isTurnOnce(c, secondPos, mapArray)) {
                    return true;
                }
            }
        }
        //两点在不同列不同行
        //①遍历第一点水平线 找到点c与第一点水平可消，与第二点一个拐点可消
        for (var x = mapArray.length - 1; x >= 0; --x) {
            c = cc.v2(x, firstPos.y);
            if (this.isBlocked(c, mapArray)) {
                continue;
            }
            if (this.isHorizon(c, firstPos, mapArray) && this.isTurnOnce(c, secondPos, mapArray)) {
                return true;
            }
        }
        //②遍历第一点垂直线 找到点c与第一点垂直可消，与第二点一个拐点可消
        for (var y = mapArray[0].length - 1; y >= 0; --y) {
            c = cc.v2(firstPos.x, y);
            if (this.isBlocked(c, mapArray)) {
                continue;
            }
            if (this.isVertical(c, firstPos, mapArray) && this.isTurnOnce(c, secondPos, mapArray)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @description: 判断某个位置上是否有障碍物
     * @param {type} 坐标，二维数组
     * @return: true/false
     */
    Algorithm.isBlocked = function (pos, mapArray) {
        return mapArray[pos.x][pos.y] > 0;
    };
    //判断两个点是否重合
    /**
     * @description: 判断两点是否重合
     * @param {type} 坐标，坐标
     * @return: true/false
     */
    Algorithm.isSamePoint = function (firstPos, secondPos) {
        return firstPos.x === secondPos.x && firstPos.y === secondPos.y;
    };
    //在可消除路径上添加空节点 用以显示路径
    Algorithm.createNodes = function () {
    };
    //删除在路径上添加的空节点
    Algorithm.removeNodes = function () {
    };
    Algorithm.routes = []; //路径记录
    Algorithm = __decorate([
        ccclass
    ], Algorithm);
    return Algorithm;
}(cc.Component));
exports.Algorithm = Algorithm;

cc._RF.pop();