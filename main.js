import controller from "./controller.js";
import render from "./miniFlipkart.js";
import state from "./model.js";

const actions = {
  INTIAL_ITEMS_LOADED: "INTIAL_ITEMS_LOADED",
  FILTER_BY_BRAND: "FILTER_BY_BRAND",
  SORT_BY_PRICE: "SORT_BY_PRICE",
  UPDATE_BY_PRICE: "UPDATE_BY_PRICE",
  UPDATE_BY_COLOR: "UPDATE_BY_COLOR",
  UPDATE_BY_SIZE: "UPDATE_BY_SIZE"
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
  },
  sortByPrice(preference) {
    controller({ action: "SORT_BY_PRICE", payload: preference });
  },
  updateByPrice(price) {
    controller({ action: "UPDATE_BY_PRICE", payload: price });
  },
  updateByColor(color) {
    controller({ action: "UPDATE_BY_COLOR", payload: color });
  },
  updateBySize(size) {
    controller({ action: "UPDATE_BY_SIZE", payload: size });
  }
};

function init() {
  app.getInitialData();
  render();
  window.app = app;
}
init();

// document.getElementById("root").innerText = "Hi...."
