import state from "./model.js";

const Loader = () => (state.women.itemsLoaded ? "" : "<div>Loading...</div>");
const brands = [
  ...new Set(state.women.items.map(item => item.itemBrand)),
  "All"
];
const colors = [...new Set(state.women.items.map(item => item.color)), "All"];

export default function render() {
  document.getElementById("root").innerHTML = `
  <div class="grid-container">
    ${Loader()}
    <div class="grid-layout1">
        <h3>Filters</h3>
        <hr>
        <h4>Brand</h4>
        <form>
            <div id="filters">
            ${brands
              .map(brand => {
                return `<label><input 
                            type="checkbox" 
                            name="brands"
                            ${
                              state.women.filterByBrand.includes(brand)
                                ? "checked"
                                : null
                            }
                            value="${brand}"                             
                            onclick="app.getCheckboxValue(value)"                   
                        />${brand}</label><br>`;
              })
              .join("")}
            </div>
        </form>
        <hr>
        <h4>Price Range</h4>
        <div class="slidecontainer">
            <input type="range" min="200" max="700" step="100" value=${
              state.women.updateByPrice
            } onchange="app.updateByPrice(value)" class="slider" id="myRange" />
            <p>Price Range: < <span id="maxPrice"></span></p>
        </div>
        <hr>
        <h4>Color</h4>
        <form>
            ${colors
              .map(color => {
                return `<label>
                        <input 
                          type="checkbox" 
                          name="colors" 
                          value="${color}"
                          ${
                            state.women.updateByColor.includes(color)
                              ? "checked"
                              : null
                          }
                          onclick="app.updateByColor(value)"
                        />${color}
                      </label><br>`;
              })
              .join("")}
        </form>
        <hr>
        <h4>Size</h4>
        <form>
            ${state.women.sizes
              .map(size => {
                return `<label>
                        <input 
                          type="checkbox" 
                          name="sizes" 
                          value="${size}"
                          ${
                            state.women.updateBySize.includes(size)
                              ? "checked"
                              : null
                          }
                          onclick="app.updateBySize(value)"
                        />${size}
                      </label><br>`;
              })
              .join("")}
        </form>
    </div>
    <div class="grid-layout">    
        Sort By:<button onclick="app.sortByPrice('lowToHigh')">Low to High</button>
        <button onclick="app.sortByPrice('highToLow')">High to Low</button>
        <hr>
        <div class="grid-layout2">
            ${state.women.items
              .sort((a, b) => {
                if (state.women.sortByPrice === "highToLow") {
                  return b.itemPrice - a.itemPrice;
                } else if (state.women.sortByPrice === "lowToHigh") {
                  return a.itemPrice - b.itemPrice;
                } else {
                  return true;
                }
              })
              .filter(item => {
                if (
                  state.women.filterByBrand[
                    state.women.filterByBrand.length - 1
                  ] === "All" ||
                  state.women.filterByBrand.length === 0
                ) {
                  return true;
                }
                return state.women.filterByBrand.includes(item.itemBrand);
              })
              .filter(item => {
                if (state.women.updateByPrice !== "") {
                  return item.itemPrice <= state.women.updateByPrice;
                }
                return true;
              })
              .filter(item => {
                if (
                  state.women.updateByColor[
                    state.women.updateByColor.length - 1
                  ] === "All" ||
                  state.women.updateByColor.length === 0
                ) {
                  return true;
                }
                return state.women.updateByColor.includes(item.color);
              })
              .filter(item => {
                if (
                  state.women.updateBySize[
                    state.women.updateBySize.length - 1
                  ] === "All" ||
                  state.women.updateBySize.length === 0
                ) {
                  return true;
                }
                return state.women.updateBySize.forEach(
                  size => item.itemSizes.includes(size) === true
                );
              })
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
        </div>
    </div>
  </div>`;
  let sliderValue = document.getElementById("myRange").value;
  document.getElementById("maxPrice").innerText = " INR " + sliderValue;
}
