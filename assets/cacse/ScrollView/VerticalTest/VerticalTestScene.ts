
import { _decorator, Component } from 'cc';
import { RecyclerView } from '../RecyclerView';
import { VerticalAdapter } from './VerticalAdapter';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = VerticalTestScene
 * DateTime = Tue Oct 19 2021 15:32:08 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = VerticalTestScene.ts
 * FileBasenameNoExtension = VerticalTestScene
 * URL = db://assets/cacse/ScrollView/VerticalTest/VerticalTestScene.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('VerticalTestScene')
export class VerticalTestScene extends Component {

    @property(RecyclerView)
    recyclerView:RecyclerView = null;

    @property(VerticalAdapter)
    adapter:VerticalAdapter = null;

    start () {
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
