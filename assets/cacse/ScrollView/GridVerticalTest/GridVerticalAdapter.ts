
import { _decorator, instantiate, Prefab } from 'cc';
import { BaseAdapter } from '../BaseAdapter';
import { BaseViewHolder } from '../BaseViewHolder';
import { GridVerticalHolder } from './GridVerticalHolder';

const { ccclass, property } = _decorator;
@ccclass('GridVerticalAdapter')
export class GridVerticalAdapter extends BaseAdapter {

    @property(Prefab)
    gVerticalP1: Prefab = null;

    @property(Prefab)
    gVrticalP2: Prefab = null;

    @property(Prefab)
    gVrticalP3: Prefab = null;

    @property(Prefab)
    gVrticalP4: Prefab = null;

    public datas

    getItemCount(): number {
        return this.datas.length;
    }
    onCreateViewHolder(index: number): BaseViewHolder {
        let type = this.getType(index);
        let holder;
        let node;
        if (type == 0) {
            node = instantiate(this.gVerticalP1);
        } else if (type == 1) {
            node = instantiate(this.gVrticalP3);
        } else if (type == 2) {
            node = instantiate(this.gVrticalP2);
        }else if (type == 3) {
            node = instantiate(this.gVrticalP4);
        }
        holder = new GridVerticalHolder(node);
        return holder;
    }
    onBindViewHolder(holder: BaseViewHolder, index: any) {
        holder.onBind(index);
    }
    getType(index: number): number {
        return  this.datas[index].type;
    }
}
