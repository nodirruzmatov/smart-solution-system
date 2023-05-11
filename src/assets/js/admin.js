const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function () {
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "open menu"
    ? this.setAttribute("aria-label", "close menu")
    : this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
  link.addEventListener("mouseenter", function () {
    if (
      body.classList.contains(collapsedClass) &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      const tooltip = this.querySelector("span").textContent;
      this.setAttribute("title", tooltip);
    } else {
      this.removeAttribute("title");
    }
  });
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem("dark-mode") === "false") {
  html.classList.add(lightModeClass);
  switchInput.checked = false;
  switchLabelText.textContent = "Light";
}

switchInput.addEventListener("input", function () {
  html.classList.toggle(lightModeClass);
  if (html.classList.contains(lightModeClass)) {
    switchLabelText.textContent = "Light";
    localStorage.setItem("dark-mode", "false");
  } else {
    switchLabelText.textContent = "Dark";
    localStorage.setItem("dark-mode", "true");
  }
});

// !--------------------
const elOpenBtn = document.querySelector(".create")
const elCloseBtn = document.querySelector(".close")
const elForm = document.querySelector(".form")
// const elsectionBtn = document.querySelector(".alert")





elOpenBtn.addEventListener("click", function () {
  elForm.classList.remove("open")
})


elCloseBtn.addEventListener("click", function () {
  elForm.classList.toggle("open")
})

// ! put -------


const fn = (id) => {
  document.getElementById("add__form-put").action = id;
}

const elChangeBtn = document.querySelectorAll(".put_btn")
const elClosePutBtn = document.querySelector(".close__put")

const elFormPut = document.querySelector(".form_put")

elChangeBtn.forEach(e => e.addEventListener('click', function () {
  elFormPut.classList.remove('open')
}))


elClosePutBtn.addEventListener("click", function () {
  elFormPut.classList.toggle("open")
})



// ! ---------------------

const fn2 = (id) => {
  document.getElementById('add__form-img').action = id
}

const elImgBtn = document.querySelectorAll(".add_img")
const elCloseImgBtn = document.querySelector(".close__img")

const elFormImg = document.querySelector(".form_img")


elImgBtn.forEach(e => e.addEventListener('click', function () {
  elFormImg.classList.remove('open')
}))

elCloseImgBtn.addEventListener("click", function () {
  elFormImg.classList.toggle("open")
})





