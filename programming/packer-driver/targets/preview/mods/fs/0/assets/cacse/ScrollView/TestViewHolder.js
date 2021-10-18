System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Label, BaseViewHolder, _crd, TestViewHolder;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfBaseViewHolder(extras) {
    _reporterNs.report("BaseViewHolder", "./BaseViewHolder", _context.meta, extras);
  }

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

      _cclegacy._RF.push({}, "8edcc5UgcxCb77Wui09sN/R", "TestViewHolder", undefined);

      _export("TestViewHolder", TestViewHolder = /*#__PURE__*/function (_ref) {
        _inheritsLoose(TestViewHolder, _ref);

        function TestViewHolder(node) {
          var _this;

          _this = _ref.call(this, node) || this;

          _defineProperty(_assertThisInitialized(_this), "text", null);

          var textNode = node.getChildByName("text");
          _this.text = textNode.getComponent(Label);
          return _this;
        }

        var _proto = TestViewHolder.prototype;

        _proto.onBind = function onBind(num) {
          this.text.string = "" + num;
        };

        return TestViewHolder;
      }(_crd && BaseViewHolder === void 0 ? (_reportPossibleCrUseOfBaseViewHolder({
        error: Error()
      }), BaseViewHolder) : BaseViewHolder));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=TestViewHolder.js.map