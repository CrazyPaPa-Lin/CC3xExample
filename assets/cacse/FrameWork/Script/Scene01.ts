
import { _decorator, Component, Node } from 'cc';
import { BaseScene } from '../base/BaseScene';
import { Entity } from './Entity/Entity';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Scene01
 * DateTime = Mon Oct 25 2021 20:58:58 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = Scene01.ts
 * FileBasenameNoExtension = Scene01
 * URL = db://assets/cacse/FrameWork/Script/Scene01.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('Scene01')
export class Scene01<Options = Entity.SceneTest> extends BaseScene {

    protected options: Entity.SceneTest;

    public static getRes(): Entity.Res {
        return {
            //是否是bundle模块
            isBundle: true,
            //需要加载的资源["",{type:"json | spine",url:""}] //{type:Entity.ResType.IMG,urls:["img/txt_dt_dhty/spriteFrame"]}
            res: [],
            //bundle
            bundleName: "string",
            //prefabPath
            prefabPath: "string"
        }
    }

    //初始化组件
    initComponents(): void {

    }

    //注册事件
    regEvents(): void {

    }

    //start时调用
    onShow(): void {
        this.options && console.log("日志============" + this.options.text)
    }

    //界面关闭时调用
    onHide(): void {

    }

    //销毁事件
    unRegEvents(): void {

    }

    //界面销毁时调用
    onRemove(): void {

    }

    //入场动画播放结束
    protected onStartAnimationEnd(): void {
        console.log("日志============onStartAnimationEnd")
    }

    //退场动画播放结束
    protected onExitAnimationEnd(): void {
        console.log("日志============onExitAnimationEnd")
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
