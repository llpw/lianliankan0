const {ccclass, property} = cc._decorator;

@ccclass
export class Painter extends cc.Component {
    //线条颜色
    public lineColor: cc.Color = cc.Color.YELLOW;
    //画图组件接口
    public ctx;
    //在某点画圆
    public drawCircle (pos: cc.Vec2) {
        let x = pos.x*60+30,
            y = -pos.y*60-30,
            r = 10;
        this.ctx.circle(x, y, r);
        this.ctx.fillColor = this.lineColor;
        this.ctx.fill();
    }
}
