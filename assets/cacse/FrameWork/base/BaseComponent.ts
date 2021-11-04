
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BaseComponent
 * DateTime = Mon Oct 25 2021 15:03:19 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = BaseComponent.ts
 * FileBasenameNoExtension = BaseComponent
 * URL = db://assets/cacse/FrameWork/base/BaseComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('BaseComponent')
export class BaseComponent extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    protected mIsActivated = true;
    
    onDestroy(){
        this.mIsActivated = false;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
