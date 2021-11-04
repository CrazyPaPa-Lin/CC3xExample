
import { _decorator, Node, Sprite, view, UITransform, } from 'cc';
import { DEV } from 'cc/env';
import { BaseAnimation } from '../Animation/BaseAnimation';
import { BaseComponent } from './BaseComponent';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BaseScene
 * DateTime = Mon Oct 25 2021 13:50:53 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = BaseScene.ts
 * FileBasenameNoExtension = BaseScene
 * URL = db://assets/cacse/FrameWork/base/BaseScene.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('BaseScene')
export  class BaseScene<Options = any> extends BaseComponent {
    private _bgAdapterEnable = true;
    @property({
        tooltip: DEV && '背景图适配开关',
    })
    public get bgAdapterEnable() : boolean {
        return this._bgAdapterEnable;
    }
    public set bgAdapterEnable(v : boolean) {
        this._bgAdapterEnable = v;
    }
    @property({
        type:Sprite,
        tooltip: DEV && '背景图',
        visible(){
            return this._bgAdapterEnable;
        }
    })
    private _backGround:Sprite = null;

    private _startAnimation:BaseAnimation = null;

    private _hideComplete:Function = null;
    
    @property({
        type:BaseAnimation,
        tooltip: DEV && '入场动画'
    })
    public get startAnimation() : BaseAnimation {
        return this._startAnimation;
    }
    public set startAnimation(v : BaseAnimation) {
        this._startAnimation = v;
    }
    
    


    private _exitAnimation:BaseAnimation = null;
    @property({
        type:BaseAnimation,
        tooltip: DEV && '退场动画'
    })
    public get exitAnimation() : BaseAnimation {
        return this._exitAnimation;
    }
    
    public set exitAnimation(v : BaseAnimation) {
        this._exitAnimation = v;
    }
    
    


    //@property()

    /**自定义切换场景的参数 可在SceneManager open方法中传递，在BaseScene onShow方法中获取*/
    protected options: Options = null;

    onLoad(){
        this.initComponents();
        this.regEvents();
    }

    onDestroy(){
        super.onDestroy();
        this.unRegEvents();
        this.onRemove();
    }

    start () {
        this.adapterBg();
        this.onShow();
    }

    //初始化组件
     initComponents():void{}

    //注册事件
     regEvents():void{}

    //start时调用
     onShow():void{}
      
    //界面关闭时调用
     onHide():void{}

    //销毁事件
     unRegEvents():void{}

    //界面销毁时调用
     onRemove():void{}

    //入场动画播放结束
    protected onStartAnimationEnd():void{

    }

    //退场动画播放结束
    protected onExitAnimationEnd():void{
        if(this._hideComplete){
            this._hideComplete();
        }
    }
    
    //只能被SceneManger 调用 不可私自调用
    public show(options:Options):void{
        this.options = options;

        //播放开场动画
        if(this._startAnimation){
            this._startAnimation.onAnimationStart(this.onStartAnimationEnd.bind(this));
        }else{
            this.onStartAnimationEnd();
        }
    }
    
    //只能被SceneManger 调用 不可私自调用
    public hide(cb:Function):void{
        this._hideComplete = cb;
        //播放闭场动画
        if(this._exitAnimation){
            this._exitAnimation.onAnimationStart(this.onExitAnimationEnd.bind(this));
        }else{
            this.onExitAnimationEnd();
        }
    }

    private adapterBg():void{
        if(!this._bgAdapterEnable){
            return
        }
        if(!this._backGround){
            return
        }
        let bgView = this._backGround.node.getComponent(UITransform);
        if(!bgView){
            return;
        }

        let selfView = this.node.getComponent(UITransform);
         //当设备的宽度高度 大于背景图的真实宽高 那么根据设计分辨率进行图片适配
        if(selfView.width <= bgView.width && selfView.height <= bgView.height){
            return
        }
        let width = view.getCanvasSize().width;
        let height = view.getCanvasSize().height;
        let srcScaleForShowAll = Math.min(width,height / bgView.height);
        let realWidth = bgView.width * srcScaleForShowAll;
        let realHeight = bgView.height * srcScaleForShowAll;
        let sclae = Math.max(width / realWidth, height / realHeight);
        bgView.width  = bgView.width * sclae;
        bgView.height = bgView.height * sclae;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
