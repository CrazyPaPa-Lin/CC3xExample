
import { _decorator, instantiate, Prefab } from 'cc';
import { BaseAdapter } from '../BaseAdapter';
import { BaseViewHolder } from '../BaseViewHolder';
import { VerticalHolder } from './VerticalHolder';

const { ccclass, property } = _decorator;
@ccclass('VerticalAdapter')
export class VerticalAdapter extends BaseAdapter {

    @property(Prefab)
    verticalP1: Prefab = null;

    @property(Prefab)
    verticalP2: Prefab = null;

    @property(Prefab)
    verticalP3: Prefab = null;

    getItemCount(): number {
        return 100;
    }
    onCreateViewHolder(index: number): BaseViewHolder {
        let type = this.getType(index);
        let holder;
        let node;
        if (type == 0) {
            node = instantiate(this.verticalP1);
        } else if (type == 1) {
            node = instantiate(this.verticalP2);
        } else if (type == 2) {
            node = instantiate(this.verticalP3);
        }
        holder = new VerticalHolder(node);
        return holder;
    }
    onBindViewHolder(holder: BaseViewHolder, index: any) {
        holder.onBind(index);
    }
    getType(index: number): number {
        return index % 3;
    }
}
