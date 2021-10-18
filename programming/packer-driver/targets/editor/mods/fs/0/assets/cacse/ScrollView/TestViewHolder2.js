System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Label, BaseViewHolder, TestViewHolder2, _crd;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfBaseViewHolder(extras) {
    _reporterNs.report("BaseViewHolder", "./BaseViewHolder", _context.meta, extras);
  }

  _export("TestViewHolder2", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      BaseViewHolder = _unresolved_2.BaseViewHolder;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "95b9bpCK0xN8Zy8ShE12apL", "TestViewHolder2", undefined);

      _export("TestViewHolder2", TestViewHolder2 = class TestViewHolder2 extends (_crd && BaseViewHolder === void 0 ? (_reportPossibleCrUseOfBaseViewHolder({
        error: Error()
      }), BaseViewHolder) : BaseViewHolder) {
        constructor(node) {
          super(node);

          _defineProperty(this, "text", null);

          let textNode = node.getChildByName("text");
          this.text = textNode.getComponent(Label);
        }

        onBind(num) {
          this.text.string = `${num}`;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=TestViewHolder2.js.map