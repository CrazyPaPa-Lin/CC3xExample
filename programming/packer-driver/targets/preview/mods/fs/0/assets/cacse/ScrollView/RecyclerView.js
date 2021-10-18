System.register(["__unresolved_0", "cc"], function (_export, _context2) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, ScrollView, game, Layout, Vec2, UITransform, Vec3, _dec, _dec2, _class, _temp, _crd, ccclass, property, requireComponent, RecyclerView;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfBaseAdapter(extras) {
    _reporterNs.report("BaseAdapter", "./BaseAdapter", _context2.meta, extras);
  }

  function _reportPossibleCrUseOfBaseViewHolder(extras) {
    _reporterNs.report("BaseViewHolder", "./BaseViewHolder", _context2.meta, extras);
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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "45c65lklXZP7aDrVe1nlKg/", "RecyclerView", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;
      requireComponent = _decorator.requireComponent;
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

      _export("RecyclerView", RecyclerView = (_dec = ccclass('RecyclerView'), _dec2 = requireComponent(ScrollView), _dec(_class = _dec2(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RecyclerView, _Component);

        function RecyclerView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_adapter", null);

          _defineProperty(_assertThisInitialized(_this), "_scrollView", void 0);

          _defineProperty(_assertThisInitialized(_this), "_layout", void 0);

          _defineProperty(_assertThisInitialized(_this), "_layoutType", void 0);

          _defineProperty(_assertThisInitialized(_this), "_pdLeft", void 0);

          _defineProperty(_assertThisInitialized(_this), "_pdRight", void 0);

          _defineProperty(_assertThisInitialized(_this), "_pdTop", void 0);

          _defineProperty(_assertThisInitialized(_this), "_pdBottom", void 0);

          _defineProperty(_assertThisInitialized(_this), "_spaceX", void 0);

          _defineProperty(_assertThisInitialized(_this), "_spaceY", void 0);

          _defineProperty(_assertThisInitialized(_this), "_startAxis", void 0);

          _defineProperty(_assertThisInitialized(_this), "halfScrollView", 0);

          _defineProperty(_assertThisInitialized(_this), "lastContentPosY", 0);

          _defineProperty(_assertThisInitialized(_this), "_gener", void 0);

          _defineProperty(_assertThisInitialized(_this), "_isActive", true);

          _defineProperty(_assertThisInitialized(_this), "_pool", new Map());

          _defineProperty(_assertThisInitialized(_this), "_childrens", new Array());

          _defineProperty(_assertThisInitialized(_this), "updateFun", function () {});

          _defineProperty(_assertThisInitialized(_this), "bScrolling", false);

          return _this;
        }

        var _proto = RecyclerView.prototype;

        _proto.onLoad = function onLoad() {
          this._scrollView = this.node.getComponent(ScrollView);

          var layout = this._scrollView.content.getComponent(Layout);

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
          this.scrollView.node.on(ScrollView.EventType.SCROLLING, this.onScrolling, this);
        };

        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.SIZE_CHANGED, this.sizeChanged, this);
          this.scrollView.node.off(ScrollView.EventType.SCROLLING, this.onScrolling, this);
          this.adapter = null;
          this._scrollView = null;
          this._isActive = false;
        } //重置数据
        ;

        _proto.reset = function reset() {
          var _this$_gener;

          (_this$_gener = this._gener) === null || _this$_gener === void 0 ? void 0 : _this$_gener["return"](""); //取消上一次的分帧任务（如果任务正在执行）

          this._pool.clear();

          this._childrens.length = 0;
        } //节点大小改变
        ;

        _proto.sizeChanged = function sizeChanged() {
          if (this.adapter) {
            this.reset();
            this.initLayout();
          }
        } //初始化面板
        ;

        _proto.initLayout = function initLayout() {
          var layout = this._layout;

          if (!layout) {
            console.error("请在content里面添加item布局方式");
            return;
          }

          this.countParam();
          this.createItems(0, new Vec2(0, this.scrollView.view.height));
        };

        _proto.countParam = function countParam() {
          var type = this._layoutType;

          if (type == Layout.Type.VERTICAL) {
            this.halfScrollView = this.scrollView.view.height / 2;
            this._layout.getComponent(UITransform).height = this.scrollView.view.height * this.adapter.getItemCount();
            this.updateFun = this.updateV;
          } else if (type == Layout.Type.HORIZONTAL) {} else if (type == Layout.Type.GRID) {
            var startAxis = this._startAxis;
          }
        }
        /**
         * 
         * @param startIndex 创建的起始节点
         * @param offset 创建的偏移量
         */
        ;

        _proto.createItems = function createItems(startIndex, offset) {
          var _this$_gener2,
              _this2 = this;

          //取消上一次的分帧任务（如果任务正在执行）
          (_this$_gener2 = this._gener) === null || _this$_gener2 === void 0 ? void 0 : _this$_gener2["return"]("");

          if (startIndex < 0) {
            startIndex = 0;
          }

          var type = this._layoutType;
          var maxNum = this.adapter.getItemCount();
          var total = 0;

          if (type == Layout.Type.VERTICAL) {
            total = Math.abs(offset.y);
          }

          this._gener = this.getGeneratorLength(total, function (i, gener) {
            if (!_this2._isActive) {
              gener === null || gener === void 0 ? void 0 : gener["return"]("");
              return false;
            }

            var index = startIndex + i; // if (type == Layout.Type.VERTICAL) {
            //     if (offset.y > 0) {
            //         index += 1;
            //     } else {
            //         index -= 1;
            //     }
            // }

            if (index >= maxNum) {
              //超出范围 则直接退出
              gener === null || gener === void 0 ? void 0 : gener["return"]("");
              return false;
            }

            var item;

            var itemType = _this2.adapter.getType(index);

            item = _this2.getItem(itemType, index);
            item.itemIndex = index;

            _this2._layout.node.addChild(item.node);

            if (type == Layout.Type.VERTICAL) {
              if (offset.y > 0) {
                var bottomY = -_this2._pdTop;
                var lastItem = _this2._childrens[_this2._childrens.length - 1];

                if (lastItem) {
                  bottomY = lastItem.node.position.y - lastItem.view.height / 2 - _this2._spaceY;
                }

                item.node.position = new Vec3(0, bottomY - item.view.height / 2);

                if (!_this2.isInWindow(item)) {
                  _this2._childrens.push(item);

                  gener === null || gener === void 0 ? void 0 : gener["return"](""); //创建结束

                  return false;
                }

                if (i == maxNum - 1) {
                  _this2._layout.node.getComponent(UITransform).height = Math.abs(item.node.position.y) + item.view.height / 2 + _this2._pdBottom;
                }
              } else {//let top
              }
            }

            _this2._childrens.push(item);

            return true;
          }, this._gener);
          this.exeGenerator(this._gener, 4);
        };

        _proto.createNextItem = function createNextItem() {
          var lastItem = this._childrens[this._childrens.length - 1];

          if (!lastItem) {
            return;
          }

          var index = lastItem.itemIndex + 1;

          if (index >= this.adapter.getItemCount()) {
            return;
          }

          if (this.isInWindow(lastItem)) {
            var item;
            var type = this._layoutType;
            var itemType = this.adapter.getType(index);
            item = this.getItem(itemType, index);
            item.itemIndex = index;

            this._layout.node.addChild(item.node);

            if (type == Layout.Type.VERTICAL) {
              var bottomY = -this._pdTop;
              var _lastItem = this._childrens[this._childrens.length - 1];

              if (_lastItem) {
                bottomY = _lastItem.node.position.y - _lastItem.view.height / 2 - this._spaceY;
              }

              item.node.position = new Vec3(0, bottomY - item.view.height / 2);

              if (index == this.adapter.getItemCount() - 1) {
                this._layout.node.getComponent(UITransform).height = Math.abs(item.node.position.y) + item.view.height / 2 + this._pdBottom;
              }
            }

            this._childrens.push(item);

            this.createNextItem();
          }
        };

        _proto.createPreviousItem = function createPreviousItem() {
          var firstItem = this._childrens[0];

          if (!firstItem) {
            return;
          }

          var index = firstItem.itemIndex - 1;

          if (index < 0) {
            return;
          }

          if (this.isInWindow(firstItem)) {
            var item;
            var type = this._layoutType;
            var itemType = this.adapter.getType(index);
            item = this.getItem(itemType, index);
            item.itemIndex = index;

            this._layout.node.addChild(item.node);

            if (type == Layout.Type.VERTICAL) {
              var topY = firstItem.node.position.y + firstItem.view.height / 2 + this._spaceY;
              item.node.position = new Vec3(0, topY + item.view.height / 2);
            }

            this._childrens.unshift(item);

            this.createPreviousItem();
          }
        } //判断是否在窗口
        ;

        _proto.isInWindow = function isInWindow(item) {
          var point = this.getPositionInView(item);
          var type = this._layoutType;

          if (type == Layout.Type.VERTICAL) {
            if (point.y - item.view.height / 2 > this.halfScrollView || point.y + item.view.height / 2 < -this.halfScrollView) {
              return false;
            }
          }

          return true;
        }
        /**获取item在scrollView的局部坐标 */
        ;

        _proto.getPositionInView = function getPositionInView(item) {
          var worldPos = this._layout.node.getComponent(UITransform).convertToWorldSpaceAR(item.node.position);

          var viewPos = this.scrollView.view.convertToNodeSpaceAR(worldPos);
          return viewPos;
        }
        /**获取一个列表项 */
        ;

        _proto.getItem = function getItem(type, index) {
          var child;

          var datas = this._pool.get(type);

          if (datas && datas.length) {
            child = datas.pop();
          } else {
            child = this.adapter.onCreateViewHolder(index);
          }

          this.adapter.onBindViewHolder(child, index);
          return child;
        };

        _proto.removeItem = function removeItem(item) {
          if (!item) {
            return;
          }

          item.node.removeFromParent();
          var type = this.adapter.getType(item.itemIndex);

          var datas = this._pool.get(type);

          if (!datas) {
            datas = new Array();
          }

          datas.push(item);
          this._pool[type] = datas;
        };

        _proto.updateV = function updateV() {
          var isUp = this._layout.node.position.y > this.lastContentPosY;
          var childs = this._childrens;

          for (var i = 0; i < childs.length; ++i) {
            var item = childs[i];
            var viewPos = this.getPositionInView(item);

            if (childs.length <= 1) {
              //必须要剩一个 不然就全部被删除了
              break;
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
        /**是否滚动容器 */
        ;

        _proto.lateUpdate = function lateUpdate(dt) {
          if (this.bScrolling == false) {
            return;
          }

          this.bScrolling = false;
          this.updateFun();
        };

        _proto.onScrolling = function onScrolling(ev) {
          if (ev === void 0) {
            ev = null;
          }

          this.bScrolling = true;
        }
        /** 分帧加载 */
        ;

        _proto.getGeneratorLength =
        /*#__PURE__*/
        regeneratorRuntime.mark(function getGeneratorLength(length, callback) {
          var _len2,
              params,
              _key2,
              i,
              result,
              _args = arguments;

          return regeneratorRuntime.wrap(function getGeneratorLength$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  for (_len2 = _args.length, params = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                    params[_key2 - 2] = _args[_key2];
                  }

                  i = 0;

                case 2:
                  if (!(i < length)) {
                    _context.next = 13;
                    break;
                  }

                  result = callback.apply(void 0, [i].concat(params));

                  if (!result) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 7;
                  return;

                case 7:
                  _context.next = 10;
                  break;

                case 9:
                  return _context.abrupt("return");

                case 10:
                  i++;
                  _context.next = 2;
                  break;

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, getGeneratorLength);
        })
        /** 分帧执行 */
        ;

        _proto.exeGenerator = function exeGenerator(generator, duration) {
          return new Promise(function (resolve, reject) {
            var gen = generator;

            var execute = function execute() {
              var startTime = new Date().getTime();

              for (var iter = gen.next();; iter = gen.next()) {
                if (iter == null || iter.done) {
                  resolve();
                  return;
                }

                if (new Date().getTime() - startTime > duration) {
                  setTimeout(function () {
                    return execute();
                  }, game.deltaTime * 1000);
                  return;
                }
              }
            };

            execute();
          });
        };

        _createClass(RecyclerView, [{
          key: "adapter",
          get: function get() {
            return this._adapter;
          },
          set: function set(v) {
            this._adapter = v;
            this.initLayout();
          }
        }, {
          key: "scrollView",
          get: function get() {
            return this._scrollView;
          }
        }]);

        return RecyclerView;
      }(Component), _temp)) || _class) || _class));
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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=RecyclerView.js.map