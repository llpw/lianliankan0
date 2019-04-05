
const {ccclass, property} = cc._decorator;
import { Picitem } from './Picitem';
import { Algorithm } from './Algorithm';
import { Game } from './Game';


@ccclass
export class Map extends cc.Component {

    @property(Game)
    game: Game = null;
    @property(cc.Prefab)
    public pic: cc.Prefab = null;//图片预置资源
    @property(cc.SpriteFrame)
    private pics: cc.SpriteFrame[] = new Array();
    @property
    private readonly picCount: number = 8;//图片个数（与pics数组的length一致）
    
    private readonly length: number = 60;//单元格长度
    private rows: number = 0;//行
    private colmns: number = 0;//列
    public mapArray: number[][];//地图二维数组
    public static twoPics: Picitem[] = []//存取两个被点击的图片
    
    start () {  
        this.initMapArray();    
        this.addPicItems();
    }
    update (dt) {
         if(Map.twoPics.length > 1){
            if(Algorithm.canBeRemoved(Map.twoPics[0].pos, Map.twoPics[1].pos, this.mapArray)){               
                this.removePicNodes(Map.twoPics);           
                this.game.getScore();
            }else{
                this.goBackPicsStyle(Map.twoPics);
            }
            Map.twoPics = [];
         }
         if(this.node.children.length < 2){
            this.game.gameOver();
         }      
     }
    /**
     * @description: 初始化二维数组
     * @param {type} 
     * @return: 
     */
    private initMapArray (){
        this.rows = Math.floor(this.node.width / this.length);
        this.colmns = Math.floor(this.node.height / this.length);
        this.mapArray = [];
        for(let i=0; i<this.rows; ++i){
            this.mapArray[i] = Array(this.colmns);
            for(let j=0; j<this.colmns; ++j){
                this.mapArray[i][j] = 0;
            }
        }
    }
    /**
     * @description: 在本节点添加多张图片精灵
     * @param {type} 
     * @return: 
     */
    private addPicItems () {
        let randomList = this.getDoubleRandomList();
        for(let i=1; i<this.rows-1; ++i){
            for(let j=1; j<this.colmns-1; ++j){
                //实例化预制资源图
                let picitem = cc.instantiate(this.pic);
                //添加到地图
                this.node.addChild(picitem);
                //设置每个实例的位置
                picitem.setPosition(i*this.length+this.length/2, -j*this.length-this.length/2);
                //得到随机数组里的值
                const temp = randomList[(i-1)*(this.colmns-2) + (j-1)];
                //初始化每个图片的位置、名字信息
                picitem.getComponent(Picitem).pos = cc.v2(i,j);
                picitem.getComponent(Picitem).picId = temp;
                //随机填充图片
                picitem.getComponent(cc.Sprite).spriteFrame = this.pics[temp-1];
                this.mapArray[i][j] = temp;
            }
        }
    }
    /**
     * @description: 得到每个数字都有偶数个的一维数组
     * @param {type} 
     * @return: 随机且每项数目为偶数的数组
     */
    private getDoubleRandomList (){
        //保证生成的每个数字都有偶数个
        let randomList: number[] = new Array();
        for(let i=(this.rows-2)*(this.colmns-2)/2-1; i>=0; --i){
            let randomNum = Math.floor(Math.random()*this.picCount+1);// 1~8
            randomList.push(randomNum);
            randomList.push(randomNum);
        }
        //对数组随机排序
        randomList.sort(()=> Math.random()>0.5 ? -1 : 1);
        return randomList;
    } 
    /**
     * @description: 消除多张图片 
     * @param {Picitem[]} 图片数组 
     * @return: 无
     */
    private removePicNodes(pics: Picitem[]){
        pics.forEach((item)=>{
            item.isRemoved = true;
            item.removePic();
            this.mapArray[item.pos.x][item.pos.y] = 0; 
        })
    }
    /**
     * @description: 还原多张图的样式
     * @param {Picitem[]} 图片数组 
     * @return: 无
     */
    private goBackPicsStyle (pics: Picitem[]){
        pics.forEach((item)=>{item.isSelected = false; item.changeStyle();});
    }
    /**
     * @description: 遍历多维数组，判断是否所有值都为0
     * @param {type} 无
     * @return: true/false
     */    
    private allValueIsZero (){
      return (this.mapArray+'').split(',').every((item)=>{return item==='0'});
    }
}
