
import { _decorator, Component, Node, AnimationClip } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BaseAnimation
 * DateTime = Mon Oct 25 2021 15:16:10 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = BaseAnimation.ts
 * FileBasenameNoExtension = BaseAnimation
 * URL = db://assets/cacse/FrameWork/Animation/BaseAnimation.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('BaseAnimation')
export class BaseAnimation extends Component {

    private callback:Function;

    public onAnimationStart(func:Function){
        this.callback = func;
        this.play();
    }

    protected play(){
        this.onAnimationEnd();
    }

    public onAnimationEnd(){
        this.callback && this.callback();
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
