import controller from "./controller.js";
import render from "./miniFlipkart.js";
import state from "./model.js";

const actions = {
  INTIAL_ITEMS_LOADED: "INTIAL_ITEMS_LOADED",
  FILTER_BY_BRAND: "FILTER_BY_BRAND"
};

const app = {
  getInitialData() {
    controller({
      action: actions.INTIAL_ITEMS_LOADED,
      payload: state.women.items
    });
  },
  getCheckboxValue(value) {
    controller({ action: "FILTER_BY_BRAND", payload: value });
  }
};

function init() {
  app.getInitialData();
  render();
  window.app = app;
}
init();
