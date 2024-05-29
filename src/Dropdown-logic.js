// // script.js
// document.addEventListener("DOMContentLoaded", () => {
//   const dropdownContainer = document.getElementById("dropdown-container");

//   const createDropdown = (options) => {
//     const dropdown = document.createElement("div");
//     dropdown.classList.add("dropdown");

//     const toggleButton = document.createElement("button");
//     toggleButton.classList.add("dropdown-toggle");
//     toggleButton.textContent = "Select an option";
//     dropdown.appendChild(toggleButton);

//     const menu = document.createElement("ul");
//     menu.classList.add("dropdown-menu");
//     dropdown.appendChild(menu);

//     options.forEach((option) => {
//       const item = document.createElement("li");
//       item.classList.add("dropdown-item");
//       item.textContent = option;
//       menu.appendChild(item);

//       item.addEventListener("click", () => {
//         toggleButton.textContent = option;
//         menu.classList.remove("show");
//       });
//     });

//     toggleButton.addEventListener("click", () => {
//       menu.classList.toggle("show");
//     });

//     document.addEventListener("click", (event) => {
//       if (!dropdown.contains(event.target)) {
//         menu.classList.remove("show");
//       }
//     });

//     return dropdown;
//   };

//   const options = ["Option 1", "Option 2", "Option 3"];
//   const dropdown = createDropdown(options);
//   dropdownContainer.appendChild(dropdown);
// });
