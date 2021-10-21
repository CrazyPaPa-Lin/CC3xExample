
import { _decorator, Component } from 'cc';
import { RecyclerView } from '../RecyclerView';
import { GridVerticalAdapter } from './GridVerticalAdapter';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = HorizontalTestScene
 * DateTime = Tue Oct 19 2021 15:40:18 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = HorizontalTestScene.ts
 * FileBasenameNoExtension = HorizontalTestScene
 * URL = db://assets/cacse/ScrollView/HorizontalTest/HorizontalTestScene.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('GridVerticalTestScene')
export class GridVerticalTestScene extends Component {
    
    @property(RecyclerView)
    recyclerView:RecyclerView = null;

    @property(GridVerticalAdapter)
    adapter:GridVerticalAdapter = null;

    start () {

        let datas = [
            {type: 0},
            {type: 0},
            {type: 1},
            {type: 1},
            {type: 0},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2},
            {type: 2}
        ]

        this.adapter.datas = datas;
        this.recyclerView.adapter = this.adapter;
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
