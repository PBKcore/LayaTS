var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var sear;
(function (sear) {
    var Browser = /** @class */ (function (_super) {
        __extends(Browser, _super);
        function Browser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Browser;
    }(laya.utils.Browser));
    sear.Browser = Browser;
    var Stage = /** @class */ (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Stage;
    }(laya.display.Stage));
    sear.Stage = Stage;
    var Node = /** @class */ (function (_super) {
        __extends(Node, _super);
        function Node() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Node;
    }(laya.display.Node));
    sear.Node = Node;
    var Sprite = /** @class */ (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Sprite;
    }(laya.display.Sprite));
    sear.Sprite = Sprite;
    var Event = /** @class */ (function (_super) {
        __extends(Event, _super);
        function Event() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Event;
    }(laya.events.Event));
    sear.Event = Event;
    var Keyboard = /** @class */ (function (_super) {
        __extends(Keyboard, _super);
        function Keyboard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Keyboard;
    }(laya.events.Keyboard));
    sear.Keyboard = Keyboard;
    var Render = /** @class */ (function (_super) {
        __extends(Render, _super);
        function Render() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Render;
    }(laya.renders.Render));
    sear.Render = Render;
    var Texture = /** @class */ (function (_super) {
        __extends(Texture, _super);
        function Texture() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Texture;
    }(laya.resource.Texture));
    sear.Texture = Texture;
    var Matrix = /** @class */ (function (_super) {
        __extends(Matrix, _super);
        function Matrix() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Matrix;
    }(laya.maths.Matrix));
    sear.Matrix = Matrix;
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Component;
    }(laya.ui.Component));
    sear.Component = Component;
    sear.superGet = Laya.superGet;
    sear.superSet = Laya.superSet;
    sear.getset = Laya.getset;
})(sear || (sear = {}));
//# sourceMappingURL=Layaex.js.map