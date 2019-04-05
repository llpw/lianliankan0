
const {ccclass, property} = cc._decorator;

@ccclass
export  class Game extends cc.Component {

    @property(cc.Label)
    scoreDisplay: cc.Label = null;
    @property(cc.Label)
    timeDisplay: cc.Label = null;

    private score: number = 0;//分数
    private time: number = 60;//界面倒计时
    private isGameOver: boolean = false;
    private timer: number = 0;//保存setInterval函数返回值

    start () {
        this.score = 0;
        this.time = 60;
        this.isGameOver = false;
        this.timer = setInterval(()=>{this.getTime()}, 1000);
    }
    onDestroy (){
        clearInterval(this.timer);
    }
    /**
     * @description: 消除一组图得分
     * @param {type} 无
     * @return: 无
     */
    public getScore (){
        ++this.score;
        this.scoreDisplay.string = `Score: ${this.double(this.score)}`;
    }
    /**
     * @description: 倒计时
     * @param {type} 无
     * @return: 无
     */
    public getTime (){
        --this.time;
        this.timeDisplay.string = `00:00:${this.double(this.time)}`;
        if(this.time === 0){this.gameOver();}
    }
    /**
     * @description: 游戏结束，下一局
     * @param {type} 
     * @return: 
     */
    public gameOver (){
        this.isGameOver = true;
        cc.director.loadScene("game");
    }
    /**
     * @description: 将小于10的数字前面加0显示
     * @param {type} num
     * @return: 
     */
    private double (num: number){
        return num<10 ? `0${num}` : num;
    }

    
    
}
