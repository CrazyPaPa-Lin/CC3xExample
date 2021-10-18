
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MainScene
 * DateTime = Mon Oct 18 2021 15:31:46 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = MainScene.ts
 * FileBasenameNoExtension = MainScene
 * URL = db://assets/MainScene.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('MainScene')
export class MainScene extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onClickScrollViewScene(){
        director.loadScene('ScrollView', function () {

        });
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
