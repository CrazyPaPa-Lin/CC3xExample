import { Label, Node, UITransform } from "cc";
import { BaseViewHolder } from "./BaseViewHolder";

 
export  class TestViewHolder extends BaseViewHolder{

    private text:Label = null;

    
    constructor(node: Node){
        super(node);
        let textNode = node.getChildByName("text");
        this.text = textNode.getComponent(Label);
    }

    onBind(num: number) {
        this.text.string = `${num}`;
    }


}
