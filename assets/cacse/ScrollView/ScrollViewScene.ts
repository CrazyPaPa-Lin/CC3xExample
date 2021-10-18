
import { _decorator, Component, Node } from 'cc';
import { RecyclerView } from './RecyclerView';
import { TestAdapter } from './TestAdapter';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ScrollViewScene
 * DateTime = Sun Oct 17 2021 10:42:07 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = ScrollViewScene.ts
 * FileBasenameNoExtension = ScrollViewScene
 * URL = db://assets/cacse/ScrollView/ScrollViewScene.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('ScrollViewScene')
export class ScrollViewScene extends Component {

    @property(RecyclerView)
    recyclerView:RecyclerView = null;

    @property(TestAdapter)
    adapter:TestAdapter = null;

    start () {
        // [3]

        this.recyclerView.adapter = this.adapter;
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
