
import { _decorator, Component, Node, ScrollView, game, Layout, Vec2, View, UITransform, Vec3, EventHandler } from 'cc';
import { BaseAdapter } from './BaseAdapter';
import { BaseViewHolder } from './BaseViewHolder';
const { ccclass, property, requireComponent } = _decorator;

/**
 * Predefined variables
 * Name = SuperScrollView
 * DateTime = Sun Oct 17 2021 10:42:48 GMT+0400 (GMT+04:00)
 * Author = lin
 * FileBasename = RecyclerView.ts
 * FileBasenameNoExtension = RecyclerView
 * URL = db://assets/cacse/ScrollView/RecyclerView.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('RecyclerView')
@requireComponent(ScrollView)
export class RecyclerView extends Component {


    private _adapter: BaseAdapter = null;
    public set adapter(v: BaseAdapter) {
        this._adapter = v;
        this.initLayout();
    }
    public get adapter(): BaseAdapter {
        return this._adapter;
    }


    private _scrollView: ScrollView;
    public get scrollView(): ScrollView {
        return this._scrollView;
    }

    private _layout: Layout;

    /**
    * @en No layout.
    * NONE = 0,
    * @zh 禁用布局。
    */

    /**
     * @en Horizontal layout.
     *HORIZONTAL = 1,
     * @zh 水平布局。
     */

    /**
     * @en Vertical layout.
     * VERTICAL = 2,
     * @zh 垂直布局。
     */

    /**
     * @en Grid layout.
     * GRID = 3
     * @zh 网格布局。
     */
    private _layoutType: number;
    private _pdLeft: number;
    private _pdRight: number;
    private _pdTop: number;
    private _pdBottom: number;
    private _spaceX: number;
    private _spaceY: number;
    private _startAxis: number;
    private halfScrollView: number = 0;
    /**上一次content的Y值，用于和现在content的Y值比较，得出是向上还是向下滚动 */
    private lastContentPosY: number = 0;
    //分帧创建器
    private _gener: Generator

    private _isActive = true;

    private _pool: Map<number, Array<BaseViewHolder>> = new Map();
    private _childrens: Array<BaseViewHolder> = new Array();

    /**刷新的函数 */
    private updateFun: Function = function () { };

    onLoad() {
        this._scrollView = this.node.getComponent(ScrollView);
        let layout = this._scrollView.content.getComponent(Layout);
        if (!layout) {
            console.error("请在content里面添加item布局方式");
        }
        this._layoutType = layout.type;
        this._pdLeft = layout.paddingLeft;
        this._pdRight = layout.paddingRight;
        this._pdTop = layout.paddingTop;
        this._pdBottom = layout.paddingBottom;
        this._spaceX = layout.spacingX;
        this._spaceY = layout.spacingY;
        this._startAxis = layout.startAxis;
        //取消布局约束
        layout.type = Layout.Type.NONE;
        this._layout = layout;

        this.reset();
        this.node.on(Node.EventType.SIZE_CHANGED, this.sizeChanged, this);
        this.scrollView.node.on(ScrollView.EventType.SCROLLING, this.onScrolling, this);
    }

    onDestroy() {
        this.node.off(Node.EventType.SIZE_CHANGED, this.sizeChanged, this);
        this.scrollView.node.off(ScrollView.EventType.SCROLLING, this.onScrolling, this);
        this.adapter = null;
        this._scrollView = null;
        this._isActive = false;
    }

    //重置数据
    private reset() {
        this._gener?.return("")//取消上一次的分帧任务（如果任务正在执行）
        this._pool.clear();
        this._childrens.length = 0;
    }

    //节点大小改变
    private sizeChanged() {
        if (this.adapter) {
            this.reset();
            this.initLayout();
        }
    }

    //初始化面板
    private initLayout() {
        let layout = this._layout;
        if (!layout) {
            console.error("请在content里面添加item布局方式");
            return;
        }
        this.countParam();
        this.createItems(0, new Vec2(0, this.scrollView.view.height));
    }

    private countParam() {
        let type = this._layoutType;
        if (type == Layout.Type.VERTICAL) {
            this.halfScrollView = this.scrollView.view.height / 2;
            this._layout.getComponent(UITransform).height = this.scrollView.view.height * this.adapter.getItemCount();
            this.updateFun = this.updateV;
        } else if (type == Layout.Type.HORIZONTAL) {

        } else if (type == Layout.Type.GRID) {
            let startAxis = this._startAxis;
        }
    }

    /**
     * 
     * @param startIndex 创建的起始节点
     * @param offset 创建的偏移量
     */
    private createItems(startIndex: number, offset: Vec2) {
        //取消上一次的分帧任务（如果任务正在执行）
        this._gener?.return("");

        if (startIndex < 0) {
            startIndex = 0;
        }

        let type = this._layoutType;
        let maxNum = this.adapter.getItemCount();
        let total = 0;
        if (type == Layout.Type.VERTICAL) {
            total = Math.abs(offset.y);
        }

        this._gener = this.getGeneratorLength(total, (i, gener) => {
            if (!this._isActive) {
                gener?.return("")
                return false;
            }


            let index = startIndex + i;
            // if (type == Layout.Type.VERTICAL) {
            //     if (offset.y > 0) {
            //         index += 1;
            //     } else {
            //         index -= 1;
            //     }
            // }

            if (index >= maxNum) {
                //超出范围 则直接退出
                gener?.return("")
                return false
            }

            let item: BaseViewHolder;
            let itemType = this.adapter.getType(index);
            item = this.getItem(itemType, index);
            item.itemIndex = index;


            this._layout.node.addChild(item.node);


            if (type == Layout.Type.VERTICAL) {
                if (offset.y > 0) {
                    let bottomY = -this._pdTop;
                    let lastItem = this._childrens[this._childrens.length - 1];
                    if (lastItem) {
                        bottomY = lastItem.node.position.y - lastItem.view.height / 2
                            - this._spaceY;
                    }
                    item.node.position = new Vec3(0,
                        bottomY - item.view.height / 2);
                    if (!this.isInWindow(item)) {
                        this._childrens.push(item);
                        gener?.return("")
                        //创建结束
                        return false;
                    }
                    if (i == maxNum - 1) {
                        this._layout.node.getComponent(UITransform).height
                            = Math.abs(item.node.position.y) + item.view.height / 2 + this._pdBottom;
                    }
                } else {
                    //let top
                }
            }
            this._childrens.push(item);
            return true;
        }, this._gener)

        this.exeGenerator(this._gener, 4);
    }

    private createNextItem() {
        let lastItem = this._childrens[this._childrens.length - 1];
        if (!lastItem) {
            return
        }
        let index = lastItem.itemIndex + 1;
        if (index >= this.adapter.getItemCount()) {
            return;
        }
        if (this.isInWindow(lastItem)) {
            let item: BaseViewHolder;
            let type = this._layoutType;
            let itemType = this.adapter.getType(index);
            item = this.getItem(itemType, index);
            item.itemIndex = index;
            this._layout.node.addChild(item.node);


            if (type == Layout.Type.VERTICAL) {
                let bottomY = -this._pdTop;
                let lastItem = this._childrens[this._childrens.length - 1];
                if (lastItem) {
                    bottomY = lastItem.node.position.y - lastItem.view.height / 2
                        - this._spaceY;
                }
                item.node.position = new Vec3(0,
                    bottomY - item.view.height / 2);
                if (index == this.adapter.getItemCount() - 1) {
                    this._layout.node.getComponent(UITransform).height
                        = Math.abs(item.node.position.y) + item.view.height / 2 + this._pdBottom;
                }
            }
            this._childrens.push(item);
            this.createNextItem();
        }
    }

    private createPreviousItem(){
        let firstItem = this._childrens[0];
        if(!firstItem){
            return
        }
        let index = firstItem.itemIndex - 1;
        if(index < 0){
            return
        }
        if(this.isInWindow(firstItem)){
            let item: BaseViewHolder;
            let type = this._layoutType;
            let itemType = this.adapter.getType(index);
            item = this.getItem(itemType, index);
            item.itemIndex = index;
            this._layout.node.addChild(item.node);


            if (type == Layout.Type.VERTICAL) {
                let topY = firstItem.node.position.y + firstItem.view.height / 2 + this._spaceY;
                item.node.position = new Vec3(0,topY+item.view.height / 2);
            }
            this._childrens.unshift(item);
            this.createPreviousItem();
        }
    }

    //判断是否在窗口
    private isInWindow(item: BaseViewHolder): boolean {
        let point = this.getPositionInView(item);
        let type = this._layoutType;
        if (type == Layout.Type.VERTICAL) {
            if (point.y - item.view.height / 2 > this.halfScrollView
                || point.y + item.view.height / 2 < -this.halfScrollView) {
                return false;
            }
        }
        return true;
    }

    /**获取item在scrollView的局部坐标 */
    private getPositionInView(item: BaseViewHolder): Vec3 {
        let worldPos = this._layout.node.getComponent(UITransform).convertToWorldSpaceAR(item.node.position);
        let viewPos = this.scrollView.view.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }


    /**获取一个列表项 */
    private getItem(type, index) {
        let child: BaseViewHolder;
        let datas = this._pool.get(type);
        if (datas && datas.length) {
            child = datas.pop();
        } else {
            child = this.adapter.onCreateViewHolder(index)
        }
        this.adapter.onBindViewHolder(child, index);
        return child;
    }

    private removeItem(item: BaseViewHolder) {
        if (!item) { return }
        item.node.removeFromParent();

        let type = this.adapter.getType(item.itemIndex);
        let datas = this._pool.get(type);
        if (!datas) {
            datas = new Array();
        }
        datas.push(item);
        this._pool[type] = datas;
    }

    public updateV() {
        let isUp = this._layout.node.position.y > this.lastContentPosY;
        let childs = this._childrens;
        for (let i = 0; i < childs.length; ++i) {
            let item = childs[i];
            let viewPos = this.getPositionInView(item);
            if(childs.length <= 1){
                //必须要剩一个 不然就全部被删除了
                break
            }
            if (isUp) {
                //如果item超过上边界 那么就移除
                if (viewPos.y - item.view.height / 2 > this.halfScrollView) {
                    this.removeItem(item);
                    childs.splice(i,1);
                    i--;
                }
            } else {
                if (viewPos.y + item.view.height / 2 < -this.halfScrollView) {
                    this.removeItem(item);
                    childs.splice(i,1);
                    i--;
                }
            }
        }

        if (isUp) {
            //创建下一个
            this.createNextItem();
        }else{
            //创建上一个
            this.createPreviousItem();
        }
        this.lastContentPosY = this._layout.node.position.y;
    }



    /**是否滚动容器 */
    private bScrolling: boolean = false;
    lateUpdate(dt) {
        if (this.bScrolling == false) {
            return;
        }
        this.bScrolling = false;
        this.updateFun();
    }

    public onScrolling(ev: Event = null) {
        this.bScrolling = true;
    }

    /** 分帧加载 */
    private * getGeneratorLength(length: number, callback: Function, ...params: any): Generator {
        for (let i = 0; i < length; i++) {
            let result = callback(i, ...params)
            if (result) {
                yield
            } else {
                return
            }
        }
    }

    /** 分帧执行 */
    private exeGenerator(generator: Generator, duration: number) {
        return new Promise<void>((resolve, reject) => {
            let gen = generator
            let execute = () => {
                let startTime = new Date().getTime()
                for (let iter = gen.next(); ; iter = gen.next()) {
                    if (iter == null || iter.done) {
                        resolve()
                        return
                    }
                    if (new Date().getTime() - startTime > duration) {
                        setTimeout(() => execute(), game.deltaTime * 1000)
                        return
                    }
                }
            }
            execute()
        })
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

/**
 * type
 * node h * 10;
 *
 * 垂直布局
 * anchor 0.5  1.0
 *
 * 创建 1个 item
 * 填充位置
 * 添加至content
 *
 * 判断该节点底部是否 超过 下边界
 * 超过
 * 则判断是否是创建的最后一个节点
 * 是 那么 内容高度 = 当前节点的bottom位置 + bottom边界值
 * 则退出创建
 *
 * 不超过 则判断是否是创建的最后一个节点
 * 是 那么 内容高度 = 当前节点的bottom位置 + bottom边界值
 * 不是 那么继续创建下一个item
 *
 * 滑动
 * 向上滑动
 * 判断最后一个节点是否在屏幕内
 * 在
 * 则判断是否是创建的最后一个节点
 * 不是 则创建（滑动距离的item）
 * 是 则退出
 *
 * 向下滑动
 * 判断第一个节点是否在屏幕内
 * 在
 * 则判断index是否为0
 * 是
 * 则退出
 * 不是 则创建（滑动距离的item）
 * 退出
 *
 * 获取最大节点的宽高 * 总个数
 *
 *
 */
