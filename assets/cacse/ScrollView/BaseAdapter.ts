
import { _decorator, Component, Node } from 'cc';
import { BaseViewHolder } from './BaseViewHolder';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BaseAdapter
 * DateTime = Sun Oct 17 2021 10:48:24 GMT+0400 (GMT+04:00)
 * Author = lin
 * FileBasename = BaseAdapter.ts
 * FileBasenameNoExtension = BaseAdapter
 * URL = db://assets/cacse/ScrollView/BaseAdapter.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('BaseAdapter')
export abstract class BaseAdapter extends Component {
     //节点数量
     abstract getItemCount(): number;

     //创建节点
     abstract onCreateViewHolder(index: number): BaseViewHolder;
 
     //绑定节点信息
     abstract onBindViewHolder(holder: BaseViewHolder, index);
 
     abstract getType(index:number):number;
 
     private _dataDirty = false;
     public get dataDirty() : boolean {
         return this._dataDirty;
     }
     //数据刷新
     public notifyDataSetChanged(){
         this._dataDirty = true;
     }
     //数据刷新完成
     public dataRefreshComplete(){
         this._dataDirty = false;
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
