import state from "./model.js";

const Loader = () => (state.women.itemsLoaded ? "" : "<div>Loading...</div>");
const brands = [
  ...new Set(state.women.items.map(item => item.itemBrand)),
  "All"
];
export default function render() {
  document.getElementById("root").innerHTML = `<div class="grid-container">
  ${Loader()}
    <div class="grid-layout1">
        <h3>Filters</h3>
        <hr>
        <h4>Brand</h4>
        ${brands
          .map(brand => {
            return `<input 
                        type="checkbox" 
                        multiple
                        name="${brand}"
                        value="${brand}"
                        ${state.women.filterByBrand === brand ? "checked" : ""}
                        onclick="app.getCheckboxValue(value)"
                    />${brand}<br>`;
          })
          .join("")}
    </div>
    <div class="grid-layout2">
    ${state.women.items
      .filter(itemFilter =>
        state.women.filterByBrand != "All"
          ? itemFilter.itemBrand === state.women.filterByBrand
          : state.women.items
      )
      .map(item => {
        return `<div class="item-style">
                <div class="item-img">
                    <img src=${item.itemImage} alt=${item.itemName} />
                </div>
                <div class="details-div">
                    <p class="brand">${item.itemBrand}</p>
                    <p>${item.itemName}</p>
                    <p><strong>INR ${item.itemPrice}</strong></p>
                </div>
                </div>`;
      })
      .join("")}
    </div></div>`;
}
