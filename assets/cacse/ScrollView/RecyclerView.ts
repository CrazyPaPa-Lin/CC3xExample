
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


    private _view: UITransform;

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
    /**上一次content的X值，用于和现在content的X值比较，得出是向左还是向右滚动 */
    private lastContentPosX: number = 0;
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
        this._startAxis = layout.startAxis; //HORIZONTAL = 0, VERTICAL = 1
        //取消布局约束
        layout.type = Layout.Type.NONE;
        this._layout = layout;
        this._view = layout.getComponent(UITransform);
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
        this.startCreateItems(0);
    }
    private countParam() {
        let type = this._layoutType;
        if (type == Layout.Type.VERTICAL) {
            this.halfScrollView = this.scrollView.view.height / 2;
            this._view.height = this.scrollView.view.height * this.adapter.getItemCount();
            this.updateFun = this.updateV;
        } else if (type == Layout.Type.HORIZONTAL) {
            this.halfScrollView = this.scrollView.view.width / 2;
            this._view.width = this.scrollView.view.width * this.adapter.getItemCount();
            this.updateFun = this.updateH;
        } else if (type == Layout.Type.GRID) {
            let startAxis = this._startAxis;
            /**
             * @en The horizontal axis.
             * HORIZONTAL = 0,
             * @zh 进行水平方向布局。
             */

            /**
             * @en The vertical axis.
             * VERTICAL = 1
             * @zh 进行垂直方向布局。
             */
            if (startAxis == 0) {

            } else if (startAxis == 1) {
                this.halfScrollView = this.scrollView.view.height / 2;
                this._view.height = this.scrollView.view.height * this.adapter.getItemCount();
                this.updateFun = this.updateGridV;
            }
        }
    }

    /**
     * 
     * @param startIndex 创建的起始节点
     */
    private startCreateItems(startIndex: number) {
        //取消上一次的分帧任务（如果任务正在执行）
        this._gener?.return("");

        if (startIndex < 0) {
            startIndex = 0;
        }

        let type = this._layoutType;
        let maxNum = this.adapter.getItemCount();
        let total = 0;
        if (type == Layout.Type.VERTICAL) {
            total = Math.abs(this._view.height);
        } else if (type == Layout.Type.HORIZONTAL) {
            total = Math.abs(this._view.width)
        } else if (type == Layout.Type.GRID) {
            if (this._startAxis == 0) {

            } else if (this._startAxis == 1) {
                total = Math.abs(this._view.height);
            }
        }

        this._gener = this.getGeneratorLength(total, (i, gener) => {
            if (!this._isActive) {
                gener?.return("")
                return false;
            }


            let index = startIndex + i;
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
                let bottomY = -this._pdTop;
                let lastItem = this._childrens[this._childrens.length - 1];
                if (lastItem) {
                    bottomY = lastItem.node.position.y - lastItem.view.height / 2
                        - this._spaceY;
                }
                item.node.position = new Vec3(item.node.position.x,
                    bottomY - item.view.height / 2);
                if (!this.isInWindow(item)) {
                    this._childrens.push(item);
                    gener?.return("")
                    //创建结束
                    return false;
                }
                if (i == maxNum - 1) {
                    this._view.height
                        = Math.abs(item.node.position.y) + item.view.height / 2 + this._pdBottom;
                }
            } else if (type == Layout.Type.HORIZONTAL) {
                let leftX = this._pdLeft;
                let lastItem = this._childrens[this._childrens.length - 1];
                if (lastItem) {
                    leftX = lastItem.node.position.x + lastItem.view.width / 2
                        + this._spaceX;

                }
                item.node.position = new Vec3(leftX + item.view.width / 2,
                    item.node.position.y);
                if (!this.isInWindow(item)) {
                    this._childrens.push(item);
                    gener?.return("")
                    return false;
                }
                if (i == maxNum - 1) {
                    this._view.width
                        = Math.abs(item.node.position.x) + item.view.width / 2 + this._pdRight;
                }
            } else if (type == Layout.Type.GRID) {
                let startAxis = this._startAxis;

                if (startAxis == 0) {
                    //水平
                } else if (startAxis == 1) {
                    //垂直
                    let lastItem = this._childrens[this._childrens.length - 1];
                    //获取同一级最低节点
                    if (lastItem) {
                        //最后一个节点的 当前节点是否超出 当前宽度
                        if (this.isInGrid(lastItem, item)) {
                            //可以容纳在一个网格内
                            let topY = lastItem.node.position.y + lastItem.view.height / 2;
                            let x = lastItem.node.position.x + lastItem.view.width / 2 + this._spaceX + item.view.width / 2;
                            item.node.position = new Vec3(x, topY - item.view.height / 2);
                            item.gIndex = lastItem.gIndex;
                        } else {
                            //不可以容纳在一个网格内
                            //获取当前节点高度最高的节点
                            let zIndex = lastItem.gIndex;
                            let maxHeightItem = this.getMaxItem(zIndex);
                            let topY = maxHeightItem.node.position.y - maxHeightItem.view.height / 2;
                            let x = -this._view.anchorX * this._view.width + this._pdLeft + item.view.width / 2;
                            item.node.position = new Vec3(x, topY - item.view.height / 2 - this._spaceY);
                            item.gIndex = maxHeightItem.gIndex + 1;
                        }
                    } else {
                        let topY = -this._pdTop;
                        let x = -this._view.anchorX * this._view.width + this._pdLeft + item.view.width / 2;
                        item.node.position = new Vec3(x, topY - item.view.height / 2);
                        item.gIndex = 0;
                    }

                    if (i == maxNum - 1) {
                        let maxHeightItem = this.getMaxItem(item.gIndex);
                        this._view.height
                            = Math.abs(maxHeightItem.node.position.y) + maxHeightItem.view.height / 2 + this._pdBottom;
                    }
                }
                if (!this.isInWindow(item)) {
                    this._childrens.push(item);
                    gener?.return("")
                    return false;
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
                item.node.position = new Vec3(item.node.position.x,
                    bottomY - item.view.height / 2);
                if (index == this.adapter.getItemCount() - 1) {
                    this._view.height
                        = Math.abs(item.node.position.y) + item.view.height / 2 + this._pdBottom;
                }
            } else if (type == Layout.Type.HORIZONTAL) {
                let leftX = this._pdLeft;
                let lastItem = this._childrens[this._childrens.length - 1];
                if (lastItem) {
                    leftX = lastItem.node.position.x + lastItem.view.width / 2
                        + this._spaceX;
                }
                item.node.position = new Vec3(leftX + item.view.width / 2,
                    item.node.position.y);
                if (index == this.adapter.getItemCount() - 1) {
                    this._view.width
                        = Math.abs(item.node.position.x) + item.view.width / 2 + this._pdRight;
                }
            } else if (type == Layout.Type.GRID) {
                if (this._startAxis == 0) {

                } else if (this._startAxis == 1) {
                    let lastItem = this._childrens[this._childrens.length - 1];
                    if (lastItem) {
                        if (this.isInGrid(lastItem, item)) {
                            //可以容纳在一个网格内
                            let topY = lastItem.node.position.y + lastItem.view.height / 2;
                            let x = lastItem.node.position.x + lastItem.view.width / 2 + this._spaceX + item.view.width / 2;
                            item.node.position = new Vec3(x, topY - item.view.height / 2);
                            item.gIndex = lastItem.gIndex;
                        } else {
                            //不可以容纳在一个网格内
                            //获取当前节点高度最高的节点
                            let zIndex = lastItem.gIndex;
                            let maxHeightItem = this.getMaxItem(zIndex);
                            let topY = maxHeightItem.node.position.y - maxHeightItem.view.height / 2;
                            let x = -this._view.anchorX * this._view.width + this._pdLeft + item.view.width / 2;
                            item.node.position = new Vec3(x, topY - item.view.height / 2 - this._spaceY);
                            item.gIndex = maxHeightItem.gIndex + 1;
                        }
                    }
                    if (index == this.adapter.getItemCount() - 1) {
                        let maxHeightItem = this.getMaxItem(item.gIndex);
                        maxHeightItem = maxHeightItem ? maxHeightItem : item;
                        this._view.height
                            = Math.abs(maxHeightItem.node.position.y) + maxHeightItem.view.height / 2 + this._pdBottom;
                    }
                }
            }

            this._childrens.push(item);
            this.createNextItem();
        }
    }

    private createPreviousItem() {
        let firstItem = this._childrens[0];
        if (!firstItem) {
            return
        }
        let index = firstItem.itemIndex - 1;
        if (index < 0) {
            return
        }
        if (this.isInWindow(firstItem)) {
            let item: BaseViewHolder;
            let type = this._layoutType;
            let itemType = this.adapter.getType(index);
            item = this.getItem(itemType, index);
            item.itemIndex = index;
            this._layout.node.addChild(item.node);


            if (type == Layout.Type.VERTICAL) {
                let topY = firstItem.node.position.y + firstItem.view.height / 2 + this._spaceY;
                item.node.position = new Vec3(item.node.position.x, topY + item.view.height / 2);
            } else if (type == Layout.Type.HORIZONTAL) {
                let leftX = firstItem.node.position.x - firstItem.view.width / 2 - this._spaceX;
                item.node.position = new Vec3(leftX - item.view.width / 2, item.node.position.y);
            }
            this._childrens.unshift(item);
            this.createPreviousItem();
        }
    }

    private createGrildPreviousItem() {
        let firstItem = this._childrens[0];
        if (!firstItem) {
            return
        }
        let index = firstItem.itemIndex - 1;
        if (index < 0) {
            return
        }

        let maxItem = this.getMaxItem(firstItem.gIndex);
        if (this.isInWindow(maxItem)) {
            let items: Array<BaseViewHolder> = [];
            this.createGrildItems(index, maxItem.gIndex - 1, null, items);
            let length = items.length;

            let maxHeight = 0;
            for (let i = 0; i < length; ++i) {
                if (items[i].view.height > maxHeight) {
                    maxHeight = items[i].view.height;
                }
                this._childrens.unshift(items[i]);
            }

            let topY = firstItem.node.position.y + firstItem.view.height / 2 + this._spaceY + maxHeight;
            let leftItem: BaseViewHolder = null;
            for (let i = length - 1; i >= 0; i--) {
                let item: BaseViewHolder = items[i];
                if (leftItem) {
                    let x = leftItem.node.position.x + leftItem.view.width / 2 + this._spaceX + item.view.width / 2;
                    item.node.position = new Vec3(x, topY - item.view.height / 2);
                } else {
                    let x = -this._view.anchorX * this._view.width + this._pdLeft + item.view.width / 2;
                    item.node.position = new Vec3(x, topY - item.view.height / 2);
                }
                leftItem = item;
            }
            this.createGrildPreviousItem();
        }
    }

    private createGrildItems(index: number, gIndex: number, rightItem: BaseViewHolder, items) {
        if (index < 0) {
            return
        }
        let item: BaseViewHolder;
        let itemType = this.adapter.getType(index);
        item = this.getItem(itemType, index);
        item.itemIndex = index;
        item.gIndex = gIndex;
        let limitW = this._view.anchorX * this._view.width;
        if (rightItem) {
            if (rightItem.node.position.x - rightItem.view.width / 2 - this._spaceX - item.view.width - this._pdLeft < -limitW) {
                return;
            }
            item.node.position = new Vec3(rightItem.node.position.x - rightItem.view.width / 2 - this._spaceX - item.view.width / 2, 0);
        } else {
            item.node.position = new Vec3(limitW - item.view.width / 2, 0);
        }
        this._layout.node.addChild(item.node);
        items.push(item);
        this.createGrildItems(index - 1, gIndex, item, items);
    }



    //判断是否在窗口
    private isInWindow(item: BaseViewHolder): boolean {
        let point = this.getPositionInView(item);
        let type = this._layoutType;
        let startAxis = this._startAxis;
        if (type == Layout.Type.VERTICAL) {
            if (point.y - item.view.height / 2 > this.halfScrollView
                || point.y + item.view.height / 2 < -this.halfScrollView) {
                return false;
            }
        } else if (type == Layout.Type.HORIZONTAL) {
            if (point.x + item.view.width / 2 < -this.halfScrollView
                || point.x - item.view.width / 2 > this.halfScrollView) {
                return false;
            }
        } else if (type == Layout.Type.GRID) {
            if (startAxis == 0) {
                if (point.x + item.view.width / 2 < -this.halfScrollView
                    || point.x - item.view.width / 2 > this.halfScrollView) {
                    return false;
                }
            } else if (startAxis == 1) {
                if (point.y - item.view.height / 2 > this.halfScrollView
                    || point.y + item.view.height / 2 < -this.halfScrollView) {
                    return false;
                }
            }
        }
        return true;
    }

    //判断是否能容纳在同一个网格内
    private isInGrid(last: BaseViewHolder, current: BaseViewHolder): boolean {
        if (this._layoutType != Layout.Type.GRID) {
            return false
        }

        let startAxis = this._startAxis;
        if (startAxis == 0) {
            //水平
        } else if (startAxis == 1) {
            //垂直
            //let bottomY = -this._pdTop;
            let limitW = this._view.anchorX * this._view.width;
            //let startX = -limitW; //最左侧的点 坐标
            if (last.node.position.x + last.view.width / 2 + this._spaceX + current.view.width > limitW) {
                return false;//不能容纳在一个网格内
            }
        }
        return true;
    }

    private getRightItem(zIndex: number): BaseViewHolder {
        let childs = this._childrens;
        let rightItem: BaseViewHolder = null;
        for (let i = 0; i < childs.length; ++i) {
            if (childs[i].gIndex == zIndex) {
                if (rightItem) {
                    if (this._startAxis == 1) {
                        rightItem = childs[i];
                    }
                } else {
                    rightItem = childs[i];
                }
            }
        }
        return rightItem;
    }


    private getMaxItem(zIndex: number): BaseViewHolder {
        let childs = this._childrens;
        let maxItem: BaseViewHolder = null;
        for (let i = 0; i < childs.length; ++i) {
            if (childs[i].gIndex == zIndex) {
                if (maxItem) {
                    if (this._startAxis == 1) {
                        if (maxItem.view.height < childs[i].view.height) {
                            maxItem = childs[i];
                        }
                    }
                } else {
                    maxItem = childs[i];
                }
            }
        }
        return maxItem;
    }

    /**获取item在scrollView的局部坐标 */
    private getPositionInView(item: BaseViewHolder): Vec3 {
        let worldPos = this._view.convertToWorldSpaceAR(item.node.position);
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
            if (childs.length <= 1) {
                //必须要剩一个 不然就全部被删除了
                break
            }
            if (isUp) {
                //如果item超过上边界 那么就移除
                if (viewPos.y - item.view.height / 2 > this.halfScrollView) {
                    this.removeItem(item);
                    childs.splice(i, 1);
                    i--;
                }
            } else {
                if (viewPos.y + item.view.height / 2 < -this.halfScrollView) {
                    this.removeItem(item);
                    childs.splice(i, 1);
                    i--;
                }
            }
        }

        if (isUp) {
            //创建下一个
            this.createNextItem();
        } else {
            //创建上一个
            this.createPreviousItem();
        }
        this.lastContentPosY = this._layout.node.position.y;
    }

    public updateH() {
        let isLeft = this._layout.node.position.x < this.lastContentPosX;
        let childs = this._childrens;
        for (let i = 0; i < childs.length; ++i) {
            let item = childs[i];
            let viewPos = this.getPositionInView(item);
            if (childs.length <= 1) {
                break
            }
            if (isLeft) {
                //如果item超过左边界 那么就移除
                if (viewPos.x + item.view.width / 2 < -this.halfScrollView) {
                    this.removeItem(item);
                    childs.splice(i, 1);
                    i--;
                }
            } else {
                if (viewPos.x - item.view.width / 2 > this.halfScrollView) {
                    this.removeItem(item);
                    childs.splice(i, 1);
                    i--;
                }
            }
        }
        if (isLeft) {
            //创建下一个
            this.createNextItem();
        } else {
            //创建上一个
            this.createPreviousItem();
        }
        this.lastContentPosX = this._layout.node.position.x;
    }

    public updateGridV() {
        let isUp = this._layout.node.position.y > this.lastContentPosY;
        let childs = this._childrens;

        let items = {};
        let gIndex = 0;
        for (let i = 0; i < childs.length; ++i) {
            if (childs[i].gIndex != gIndex) {
                gIndex = childs[i].gIndex;
            }
            if (!items[gIndex]) {
                items[gIndex] = [];
            }
            items[gIndex].push(childs[i]);
        }

        let deleteItems = [];

        let length = Object.keys(items).length;
        let startIndex = 0;
        for (let key in items) {
            if(isUp){
                if(startIndex >= length - 1){
                    break;
                }
            }else{
                if(startIndex == 0){
                    startIndex += 1;
                    continue;
                }
            }
            let datas: Array<BaseViewHolder> = items[key];
            let maxItem = this.getMaxItem(datas[0].gIndex);
            let viewPos = this.getPositionInView(maxItem);
            if (isUp) {
                if (viewPos.y - maxItem.view.height / 2 > this.halfScrollView) {
                    datas.forEach((v) => {
                        deleteItems.push(v)
                    })
                }
            } else {
                if (viewPos.y + maxItem.view.height / 2 < -this.halfScrollView) {
                    datas.forEach((v) => {
                        deleteItems.push(v)
                    })
                }
            }
            startIndex += 1;
        }

        for (let i = 0; i < childs.length; ++i) {
            if (childs.length <= 1) {
                break;
            }
            for (let j = 0; j < deleteItems.length; ++j) {
                if (childs[i].itemIndex == deleteItems[j].itemIndex) {
                    this.removeItem(childs[i]);
                    childs.splice(i, 1);
                    deleteItems.splice(j, 1);
                    i--;
                    break;
                }
            }
        }

        if (isUp) {
            //创建下一个
            this.createNextItem();
        } else {
            //创建上一个
            this.createGrildPreviousItem();
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
