
import { _decorator, Component, Node, AnimationClip ,Animation, __private} from 'cc';
import { BaseAnimation } from '../../Animation/BaseAnimation';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SceneAnimation
 * DateTime = Tue Oct 26 2021 10:29:35 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = SceneAnimation.ts
 * FileBasenameNoExtension = SceneAnimation
 * URL = db://assets/cacse/FrameWork/Script/Animation/SceneAnimation.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('FadeInAnimation')
export class FadeInAnimation extends BaseAnimation {

    private animation:Animation = null;

    onLoad(){
        this.animation =  this.node.getComponent(Animation);
    }

    protected playAnimation(){
        this.animation.once(__private.cocos_core_animation_animation_state_EventType.FINISHED,  this.onFinished,  this);
        this.animation.play();
    }

    private onFinished(){
        this.onAnimationEnd();
    }

    onDestroy(){

        this.animation.off(__private.cocos_core_animation_animation_state_EventType.FINISHED,  this.onFinished,  this);
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
