
import { _decorator, Component, Node, Button, EventHandler, AudioClip, utils } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

/**
 * Predefined variables
 * Name = CustomButton
 * DateTime = Sun Oct 24 2021 09:33:25 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * 
 * 
 * 
 * FileBasename = CustomButton.ts
 * FileBasenameNoExtension = CustomButton
 * URL = db://assets/cacse/Button/CustomButton.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('CustomButton')
@requireComponent(Button)
export class CustomButton extends Component {

    // @property({type: EventHandler,tooltip: '节点动画'})
    // animtionEvent: EventHandler = new EventHandler();
    @property(AudioClip)
    clip:AudioClip = null;

    start () {
        // [3]
    }

    onDestroy(){

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
