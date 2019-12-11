"use strict";

import state from "./model.js";
import render from "./miniFlipkart.js";

const actions = {
  INTIAL_ITEMS_LOADED: "INTIAL_ITEMS_LOADED",
  FILTER_BY_BRAND: "FILTER_BY_BRAND"
};

export default function controller({ action, payload }) {
  switch (action) {
    case actions.INTIAL_ITEMS_LOADED:
      state.women.items = payload;
      state.women.itemsLoaded = true;
      render();
      break;

    case actions.FILTER_BY_BRAND:
      if (payload) {
        state.women.filterByBrand = payload;
      }
      render();
      break;

    default:
      break;
  }
}
