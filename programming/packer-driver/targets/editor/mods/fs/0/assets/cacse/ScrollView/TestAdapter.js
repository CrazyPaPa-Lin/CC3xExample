System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Node, instantiate, BaseAdapter, TestViewHolder, TestViewHolder2, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _crd, ccclass, property, TestAdapter;

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

  function _reportPossibleCrUseOfTestViewHolder(extras) {
    _reporterNs.report("TestViewHolder", "./TestViewHolder", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTestViewHolder2(extras) {
    _reporterNs.report("TestViewHolder2", "./TestViewHolder2", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      BaseAdapter = _unresolved_2.BaseAdapter;
    }, function (_unresolved_3) {
      TestViewHolder = _unresolved_3.TestViewHolder;
    }, function (_unresolved_4) {
      TestViewHolder2 = _unresolved_4.TestViewHolder2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6995f5ECc9P9bXkq8oMdniY", "TestAdapter", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * Predefined variables
       * Name = TestAdapter
       * DateTime = Sun Oct 17 2021 20:00:27 GMT+0400 (GMT+04:00)
       * Author = lin
       * FileBasename = TestAdapter.ts
       * FileBasenameNoExtension = TestAdapter
       * URL = db://assets/cacse/ScrollView/TestAdapter.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
       *
       */

      _export("TestAdapter", TestAdapter = (_dec = ccclass('TestAdapter'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = (_temp = class TestAdapter extends (_crd && BaseAdapter === void 0 ? (_reportPossibleCrUseOfBaseAdapter({
        error: Error()
      }), BaseAdapter) : BaseAdapter) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "testNode1", _descriptor, this);

          _initializerDefineProperty(this, "testNode2", _descriptor2, this);
        }

        getItemCount() {
          return 100;
        }

        onCreateViewHolder(index) {
          let type = this.getType(index);
          let holder;

          if (type == 0) {
            let node = instantiate(this.testNode1);
            node.active = true;
            holder = new (_crd && TestViewHolder === void 0 ? (_reportPossibleCrUseOfTestViewHolder({
              error: Error()
            }), TestViewHolder) : TestViewHolder)(node);
          } else if (type == 1) {
            let node = instantiate(this.testNode2);
            node.active = true;
            holder = new (_crd && TestViewHolder2 === void 0 ? (_reportPossibleCrUseOfTestViewHolder2({
              error: Error()
            }), TestViewHolder2) : TestViewHolder2)(node);
          }

          return holder;
        }

        onBindViewHolder(holder, index) {
          holder.onBind(index);
        }

        getType(index) {
          return index % 2;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "testNode1", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "testNode2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=TestAdapter.js.map