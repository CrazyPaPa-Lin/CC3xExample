
import { _decorator, Component, Node, instantiate } from 'cc';
import { BaseAdapter } from './BaseAdapter';
import { BaseViewHolder } from './BaseViewHolder';
import { TestViewHolder } from './TestViewHolder';
import { TestViewHolder2 } from './TestViewHolder2';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TestAdapter
 * DateTime = Sun Oct 17 2021 20:00:27 GMT+0400 (GMT+04:00)
 * Author = lin
 * FileBasename = TestAdapter.ts
 * FileBasenameNoExtension = TestAdapter
 * URL = db://assets/cacse/ScrollView/TestAdapter.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('TestAdapter')
export class TestAdapter extends BaseAdapter {

    @property(Node)
    testNode1:Node = null;

    @property(Node)
    testNode2:Node = null;

    getItemCount(): number {
        return 100;
    }
    onCreateViewHolder(index: number): BaseViewHolder {

        let type = this.getType(index);
        let holder;
        if(type == 0){
            let node = instantiate(this.testNode1);
            node.active = true;
            holder = new TestViewHolder(node);
        }else if(type == 1){
            let node = instantiate(this.testNode2);
            node.active = true;
            holder = new TestViewHolder2(node);
        }
        return holder;
    }
    onBindViewHolder(holder: BaseViewHolder, index: any) {
        holder.onBind(index);
    }
    getType(index: number): number {
        return index % 2;
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
