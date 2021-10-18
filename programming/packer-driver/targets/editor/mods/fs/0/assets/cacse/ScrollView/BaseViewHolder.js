System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, UITransform, BaseViewHolder, _crd;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BaseViewHolder", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "921186rrHJIO4aWsmKezN+5", "BaseViewHolder", undefined);

      /**
       * Predefined variables
       * Name = BaseViewHolder
       * DateTime = Sun Oct 17 2021 10:49:25 GMT+0400 (GMT+04:00)
       * Author = lin
       * FileBasename = BaseViewHolder.ts
       * FileBasenameNoExtension = BaseViewHolder
       * URL = db://assets/cacse/ScrollView/BaseViewHolder.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
       *
       */
      _export("BaseViewHolder", BaseViewHolder = class BaseViewHolder {
        constructor(node) {
          _defineProperty(this, "node", void 0);

          _defineProperty(this, "view", void 0);

          _defineProperty(this, "itemIndex", void 0);

          this.node = node;
          this.view = node.getComponent(UITransform);
        }

      });
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
//# sourceMappingURL=BaseViewHolder.js.map