System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, RecyclerView, TestAdapter, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _crd, ccclass, property, ScrollViewScene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfRecyclerView(extras) {
    _reporterNs.report("RecyclerView", "./RecyclerView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTestAdapter(extras) {
    _reporterNs.report("TestAdapter", "./TestAdapter", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      RecyclerView = _unresolved_2.RecyclerView;
    }, function (_unresolved_3) {
      TestAdapter = _unresolved_3.TestAdapter;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "80fe7tdsaBGqLwTV8JR5QG9", "ScrollViewScene", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * Predefined variables
       * Name = ScrollViewScene
       * DateTime = Sun Oct 17 2021 10:42:07 GMT+0400 (GMT+04:00)
       * Author = xl000000
       * FileBasename = ScrollViewScene.ts
       * FileBasenameNoExtension = ScrollViewScene
       * URL = db://assets/cacse/ScrollView/ScrollViewScene.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
       *
       */

      _export("ScrollViewScene", ScrollViewScene = (_dec = ccclass('ScrollViewScene'), _dec2 = property(_crd && RecyclerView === void 0 ? (_reportPossibleCrUseOfRecyclerView({
        error: Error()
      }), RecyclerView) : RecyclerView), _dec3 = property(_crd && TestAdapter === void 0 ? (_reportPossibleCrUseOfTestAdapter({
        error: Error()
      }), TestAdapter) : TestAdapter), _dec(_class = (_class2 = (_temp = class ScrollViewScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "recyclerView", _descriptor, this);

          _initializerDefineProperty(this, "adapter", _descriptor2, this);
        }

        start() {
          // [3]
          this.recyclerView.adapter = this.adapter;
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "recyclerView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "adapter", [_dec3], {
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
//# sourceMappingURL=ScrollViewScene.js.map