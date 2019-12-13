import state from "./model.js";

const Loader = () => (state.women.itemsLoaded ? "" : "<div>Loading...</div>");
const brands = [
  ...new Set(state.women.items.map(item => item.itemBrand)),
  "All"
];
// function calculateCheckbox() {
//   let el = document.getElementById("filters");
//   let checkboxes = el !== null ? el.getElementsByTagName("input") : "";
//   for (let i = 0; i < checkboxes.length; i++) {
//     if (checkboxes[i].type === "checkbox") {
//       checkboxes[i].addEventListener("change", function(e) {
//         console.log(this.checked);
//       });
//     }
//   }
// }
// function getCheckedCheckboxesFor(checkboxName) {
//   let checkboxes = document.querySelectorAll(
//       'input[name="' + checkboxName + '"]:checked'
//     ),
//     values = [];
//   console.log(checkboxes);
//   Array.prototype.forEach.call(checkboxes, function(el) {
//     values.push(el.value);
//   });
//   console.log(values);
// }
export default function render() {
  let slider = document.getElementById("myRange");
  // console.log(slider.value);
  //   let output = document.getElementById("maxPrice");
  //   output.innerText = slider.value ? slider.value : null;

  //   slider.oninput = () => {
  //     output.innerHTML = this.value;
  //   };
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
            <input type="range" min="500" max="2000" value="2000" class="slider" id="myRange" />
            <p>Max Price: <span id="maxPrice"></span></p>
        </div>
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
                  ] === "All"
                ) {
                  return true;
                }
                return state.women.filterByBrand.includes(item.itemBrand);
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
}
