"use strict";

import state from "./model.js";
import render from "./miniFlipkart.js";

const actions = {
  INTIAL_ITEMS_LOADED: "INTIAL_ITEMS_LOADED",
  FILTER_BY_BRAND: "FILTER_BY_BRAND",
  SORT_BY_PRICE: "SORT_BY_PRICE",
  UPDATE_BY_PRICE: "UPDATE_BY_PRICE",
  UPDATE_BY_COLOR: "UPDATE_BY_COLOR"
};

export default function controller({ action, payload }) {
  switch (action) {
    case actions.INTIAL_ITEMS_LOADED:
      state.women.items = payload;
      state.women.itemsLoaded = true;
      render();
      break;

    case actions.SORT_BY_PRICE:
      state.women.sortByPrice = payload;
      render();
      break;

    case actions.UPDATE_BY_PRICE:
      state.women.updateByPrice = payload;
      render();
      break;

    case actions.FILTER_BY_BRAND:
      if (state.women.filterByBrand.includes(payload)) {
        state.women.filterByBrand = state.women.filterByBrand.filter(
          brand => brand !== payload
        );
      } else if (
        payload !== "All" &&
        state.women.filterByBrand.includes("All")
      ) {
        state.women.filterByBrand.push(payload);
        state.women.filterByBrand = state.women.filterByBrand.filter(
          brand => brand !== "All"
        );
      } else {
        state.women.filterByBrand.push(payload);
      }
      render();
      break;

    case actions.UPDATE_BY_COLOR:
      if (state.women.updateByColor.includes(payload)) {
        state.women.updateByColor = state.women.updateByColor.filter(
          color => color !== payload
        );
      } else if (
        state.women.updateByColor.includes("All") &&
        payload !== "All"
      ) {
        state.women.updateByColor.push(payload);
        state.women.updateByColor = state.women.updateByColor.filter(
          color => color !== "All"
        );
      } else {
        state.women.updateByColor.push(payload);
      }
      render();
      break;

    default:
      break;
  }
}
