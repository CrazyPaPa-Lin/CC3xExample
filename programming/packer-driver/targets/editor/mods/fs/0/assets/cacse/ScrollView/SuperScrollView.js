System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, ScrollView, game, Layout, Vec2, UITransform, Vec3, EventHandler, _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp, _crd, ccclass, property, requireComponent, RecyclerView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseAdapter(extras) {
    _reporterNs.report("BaseAdapter", "./BaseAdapter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseViewHolder(extras) {
    _reporterNs.report("BaseViewHolder", "./BaseViewHolder", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      ScrollView = _cc.ScrollView;
      game = _cc.game;
      Layout = _cc.Layout;
      Vec2 = _cc.Vec2;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
      EventHandler = _cc.EventHandler;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d8f96GWQ3pBjJkmugHM3gLV", "SuperScrollView", undefined);

      ({
        ccclass,
        property,
        requireComponent
      } = _decorator);
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

      _export("RecyclerView", RecyclerView = (_dec = ccclass('RecyclerView'), _dec2 = requireComponent(ScrollView), _dec3 = property({
        type: [EventHandler],
        tooltip: '节点刷新函数'
      }), _dec(_class = _dec2(_class = (_class2 = (_temp = class RecyclerView extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_adapter", null);

          _initializerDefineProperty(this, "refreshItemEvents", _descriptor, this);

          _defineProperty(this, "_scrollView", void 0);

          _defineProperty(this, "_layout", void 0);

          _defineProperty(this, "_layoutType", void 0);

          _defineProperty(this, "_pdLeft", void 0);

          _defineProperty(this, "_pdRight", void 0);

          _defineProperty(this, "_pdTop", void 0);

          _defineProperty(this, "_pdBottom", void 0);

          _defineProperty(this, "_spaceX", void 0);

          _defineProperty(this, "_spaceY", void 0);

          _defineProperty(this, "_startAxis", void 0);

          _defineProperty(this, "halfScrollView", 0);

          _defineProperty(this, "lastContentPosY", 0);

          _defineProperty(this, "_gener", void 0);

          _defineProperty(this, "_isActive", true);

          _defineProperty(this, "_pool", new Map());

          _defineProperty(this, "_childrens", new Array());

          _defineProperty(this, "updateFun", function () {});
        }

        set adapter(v) {
          this._adapter = v;
          this.initLayout();
        }

        get adapter() {
          return this._adapter;
        }

        get scrollView() {
          return this._scrollView;
        }

        start() {
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
          this._startAxis = layout.startAxis; //取消布局约束

          layout.type = Layout.Type.NONE;
          this._layout = layout;
          this.reset();
          this.node.on(Node.EventType.SIZE_CHANGED, this.sizeChanged, this);
        }

        onDestroy() {
          this.node.off(Node.EventType.SIZE_CHANGED, this.sizeChanged, this);
          this.adapter = null;
          this._scrollView = null;
          this._isActive = false;
        } //重置数据


        reset() {
          var _this$_gener;

          (_this$_gener = this._gener) === null || _this$_gener === void 0 ? void 0 : _this$_gener.return(""); //取消上一次的分帧任务（如果任务正在执行）

          this._pool.clear();

          this._childrens.length = 0;
        } //节点大小改变


        sizeChanged() {
          if (this.adapter) {
            this.reset();
            this.initLayout();
          }
        } //初始化面板


        initLayout() {
          let layout = this._layout;

          if (!layout) {
            console.error("请在content里面添加item布局方式");
            return;
          }

          this.countParam();
          this.createItems(0, new Vec2(0, this.scrollView.view.height));
        }

        countParam() {
          let type = this._layoutType;
          this.halfScrollView = this.scrollView.view.width / 2;

          if (type == Layout.Type.VERTICAL) {
            this.updateFun = this.updateV;
          } else if (type == Layout.Type.HORIZONTAL) {} else if (type == Layout.Type.GRID) {
            let startAxis = this._startAxis;
          }
        }
        /**
         * 
         * @param startIndex 创建的起始节点
         * @param offset 创建的偏移量
         */


        createItems(startIndex, offset) {
          var _this$_gener2;

          //取消上一次的分帧任务（如果任务正在执行）
          (_this$_gener2 = this._gener) === null || _this$_gener2 === void 0 ? void 0 : _this$_gener2.return("");

          if (startIndex < 0) {
            startIndex = 0;
          }

          let type = this._layoutType;
          let maxNum = this.adapter.getItemCount();
          let total = 0;

          if (type == Layout.Type.VERTICAL) {
            total = Math.abs(offset.y);
          }

          this._gener = this.getGeneratorLength(total, i => {
            if (!this._isActive) {
              return;
            }

            let index = startIndex;

            if (type == Layout.Type.VERTICAL) {
              if (offset.y > 0) {
                index += 1;
              } else {
                index -= 1;
              }
            }

            if (index >= maxNum) {
              var _this$_gener3;

              //超出范围 则直接退出
              (_this$_gener3 = this._gener) === null || _this$_gener3 === void 0 ? void 0 : _this$_gener3.return("");
              return;
            }

            let item;
            let itemType = this.adapter.getType(index);
            item = this.getItem(itemType, i);
            item.itemIndex = i;

            this._layout.node.addChild(item.node);

            this._childrens.push(item);

            if (type == Layout.Type.VERTICAL) {
              if (offset.y > 0) {
                let bottomY = this._pdTop;
                let lastItem = this._childrens[this._childrens.length - 1];

                if (lastItem) {
                  bottomY = lastItem.node.position.y + lastItem.view.height / 2 + this._spaceY;
                }

                item.node.position = new Vec3(this.scrollView.view.width / 2, bottomY + item.view.height / 2);

                if (!this.isInWindow(item)) {
                  var _this$_gener4;

                  //创建结束
                  (_this$_gener4 = this._gener) === null || _this$_gener4 === void 0 ? void 0 : _this$_gener4.return("");
                  return;
                }

                if (i == maxNum - 1) {
                  this._layout.node.getComponent(UITransform).height = Math.abs(item.node.position.y) + item.view.height / 2;
                }
              } else {//let top
              }
            }
          });
        } //判断是否在窗口


        isInWindow(item) {
          let point = this.getPositionInView(item);
          let type = this._layoutType;

          if (type == Layout.Type.VERTICAL) {
            if (point.y + item.view.height / 2 >= -this.halfScrollView || point.y - item.view.height / 2 <= this.halfScrollView) {
              return true;
            }
          }

          return false;
        }
        /**获取item在scrollView的局部坐标 */


        getPositionInView(item) {
          let worldPos = item.view.convertToWorldSpaceAR(item.node.position);
          let viewPos = this.scrollView.view.convertToNodeSpaceAR(worldPos);
          return viewPos;
        }
        /**获取一个列表项 */


        getItem(type, index) {
          let child;

          let datas = this._pool.get(type);

          if (datas && datas.length) {
            child = datas.pop();
          } else {
            child = this.adapter.onCreateViewHolder(index);
          }

          this.adapter.onBindViewHolder(child, index);
          return child;
        }

        removeItem(item) {
          if (!item) {
            return;
          }

          item.node.removeFromParent();
          let type = this.adapter.getType(item.itemIndex);

          let datas = this._pool.get(type);

          if (!datas) {
            datas = new Array();
          }

          datas.push(item);
          this._pool[type] = datas;
        }

        updateV() {
          let isUp = this._layout.node.position.y > this.lastContentPosY;
          let childs = this._childrens;

          for (let i = 0; i < childs.length; ++i) {
            let item = childs[i];
            let viewPos = this.getPositionInView(item);

            if (isUp) {
              //如果item超过上边界 那么就移除
              if (viewPos.y - item.view.height / 2 > this.halfScrollView) {
                this.removeItem(item);
                childs.splice(i, 1);
                i--;
              }
            } else {
              if (viewPos.y + item.view.height / 2 < this.halfScrollView) {
                this.removeItem(item);
                childs.splice(i, 1);
                i--;
              }
            }
          }

          if (isUp) {
            this.createItems(childs[childs.length - 1].itemIndex + 1, new Vec2(0, this.scrollView.view.height));
          } else {}

          this.lastContentPosY = this._layout.node.position.y;
        }
        /** 分帧加载 */


        *getGeneratorLength(length, callback, ...params) {
          for (let i = 0; i < length; i++) {
            let result = callback(i, ...params);

            if (result) {
              yield;
            } else {
              return;
            }
          }
        }
        /** 分帧执行 */


        exeGenerator(generator, duration) {
          return new Promise((resolve, reject) => {
            let gen = generator;

            let execute = () => {
              let startTime = new Date().getTime();

              for (let iter = gen.next();; iter = gen.next()) {
                if (iter == null || iter.done) {
                  resolve();
                  return;
                }

                if (new Date().getTime() - startTime > duration) {
                  setTimeout(() => execute(), game.deltaTime * 1000);
                  return;
                }
              }
            };

            execute();
          });
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "refreshItemEvents", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class) || _class));
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
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=SuperScrollView.js.map