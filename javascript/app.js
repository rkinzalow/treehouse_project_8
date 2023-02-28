const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const card = document.querySelector(".card");
const search = document.getElementById("search");
const nextArrow = document.querySelector(".next");
const beforeArrow = document.querySelector(".before");

// fetch data from API
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

function displayEmployees(employeeData) {
  employees = employeeData;
  // store the employee HTML as we create it
  let employeeHTML = "";
  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    // template literals make this so much cleaner!
    employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `;
  });
  gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  overlay.style.display = "block";
  // use object destructuring make our template literal cleaner
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr>
    <p>${phone}</p>
    <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
  modalContainer.innerHTML = modalHTML;
}
gridContainer.addEventListener("click", (e) => {
  // make sure the click is not on the gridContainer itself
  if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    currentIndex = parseInt(index);
    displayModal(index);
  }
});
modalClose.addEventListener("click", () => {
  overlay.style.display = "none";
});
// filter names with search bar
search.addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();
  let names = document.querySelectorAll(".name");
  let employeeNames = [];
  names.forEach((employeeNames) => {
    if (employeeNames.textContent.toLowerCase().includes(searchQuery)) {
      employeeNames.parentNode.parentNode.style.display = "";
    } else {
      employeeNames.parentNode.parentNode.style.display = "none";
    }
  });
});
// adds functional arrows to scroll through overlay
nextArrow.addEventListener("click", () => {
  if (currentIndex === 11) {
    currentIndex = 0;
    displayModal(currentIndex);
  } else {
    currentIndex++;
    displayModal(currentIndex);
  }
});
beforeArrow.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = 11;
    displayModal(currentIndex);
  } else {
    currentIndex--;
    displayModal(currentIndex);
  }
});
