
import { _decorator, Node, UITransform } from 'cc';
/**
 * Predefined variables
 * Name = BaseViewHolder
 * DateTime = Sun Oct 17 2021 10:49:25 GMT+0400 (GMT+04:00)
 * Author = lin
 * FileBasename = BaseViewHolder.ts
 * FileBasenameNoExtension = BaseViewHolder
 * URL = db://assets/cacse/ScrollView/BaseViewHolder.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
export abstract class BaseViewHolder {

    public node: Node;

    public view: UITransform;

    public itemIndex:number;

    constructor(node: Node){
        this.node = node;
        this.view = node.getComponent(UITransform);
    }


    abstract onBind(data:any);
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
