
import { _decorator, instantiate, Prefab } from 'cc';
import { BaseAdapter } from '../BaseAdapter';
import { BaseViewHolder } from '../BaseViewHolder';
import { HorizontalHolder } from './HorizontalHolder';

const { ccclass, property } = _decorator;
@ccclass('HorizontalAdapter')
export class HorizontalAdapter extends BaseAdapter {

    @property(Prefab)
    HorizontalP1: Prefab = null;

    @property(Prefab)
    HorizontalP2: Prefab = null;

    @property(Prefab)
    HorizontalP3: Prefab = null;

    getItemCount(): number {
        return 100;
    }
    onCreateViewHolder(index: number): BaseViewHolder {
        let type = this.getType(index);
        let holder;
        let node;
        if (type == 0) {
            node = instantiate(this.HorizontalP1);
        } else if (type == 1) {
            node = instantiate(this.HorizontalP2);
        } else if (type == 2) {
            node = instantiate(this.HorizontalP3);
        }
        holder = new HorizontalHolder(node);
        return holder;
    }
    onBindViewHolder(holder: BaseViewHolder, index: any) {
        holder.onBind(index);
    }
    getType(index: number): number {
        return index % 3;
    }
}
