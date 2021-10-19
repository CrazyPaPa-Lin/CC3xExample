import { Label, Node } from "cc";
import { BaseViewHolder } from "../BaseViewHolder";

export class VerticalHolder extends BaseViewHolder {

    private text: Label = null;

    constructor(node: Node) {
        super(node);
        let textNode = node.getChildByName("text");
        this.text = textNode.getComponent(Label);
    }

    onBind(num: number) {
        this.text.string = `${num}`;
    }
}
