System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, _dec, _class, _temp, _crd, ccclass, property, BaseAdapter;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3db65oFSfhH2opOYCf0umYe", "BaseAdapter", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * Predefined variables
       * Name = BaseAdapter
       * DateTime = Sun Oct 17 2021 10:48:24 GMT+0400 (GMT+04:00)
       * Author = lin
       * FileBasename = BaseAdapter.ts
       * FileBasenameNoExtension = BaseAdapter
       * URL = db://assets/cacse/ScrollView/BaseAdapter.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
       *
       */

      _export("BaseAdapter", BaseAdapter = (_dec = ccclass('BaseAdapter'), _dec(_class = (_temp = class BaseAdapter extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_dataDirty", false);
        }

        get dataDirty() {
          return this._dataDirty;
        } //数据刷新


        notifyDataSetChanged() {
          this._dataDirty = true;
        } //数据刷新完成


        dataRefreshComplete() {
          this._dataDirty = false;
        }

      }, _temp)) || _class));
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
//# sourceMappingURL=BaseAdapter.js.map