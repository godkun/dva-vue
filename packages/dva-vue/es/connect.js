var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { isFunction } from 'dva-core/lib/utils';

export default function connect(mapStateToComputed) {
  return function (component) {
    var beforeCreate = function beforeCreate() {
      var _this = this;

      var store = this.$root.$options.store;
      this.dispatch = store.dispatch;
      store.subscribe(function () {
        var computeds = mapStateToComputed(store.getState());
        Object.keys(computeds).forEach(function (key) {
          _this['' + key] = computeds['' + key];
        });
      });
      var computeds = mapStateToComputed(store.getState());
      Object.keys(computeds).forEach(function (key) {
        _this.$root.constructor.util.defineReactive(_this, key, computeds['' + key]);
      });
    };
    return _extends({}, component, {
      beforeCreate: Array.isArray(component.beforeCreate) ? component.beforeCreate.concat(beforeCreate) : isFunction(component.beforeCreate) ? [component.beforeCreate, beforeCreate] : beforeCreate
    });
  };
}