
const {ccclass, property} = cc._decorator;
import { Map } from './Map';
@ccclass
export class Picitem extends cc.Component {

    public picId: number = 0;//图片名称 
    public pos: cc.Vec2;//图片位置 
    public isSelected: Boolean = false;//是否被选中 
    public isRemoved: Boolean = false;//是否可消除
   
    onLoad (){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, ()=>{Map.twoPics.push(this),this.isSelected = true,this.changeStyle()}, this);
    }
    /**
     * @description: 销毁图片自身节点
     * @param {type} 
     * @return: 
     */
    removePic () {
        if(this.isRemoved){
            this.node.destroy();
        }
    }
    /**
     * @description: 改变图片自身样式
     * @param {type} 
     * @return: 
     */
    changeStyle (){
        if(this.isSelected){
            this.node.color = cc.Color.MAGENTA;
            this.node.scale = 1.06;
            this.node.opacity = 200;
        }else{
            this.node.color = cc.color(255, 255, 255);
            this.node.scale = 1;
            this.node.opacity = 255;
        } 
    }
   
}
