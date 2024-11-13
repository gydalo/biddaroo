// For showing either login or register on homepage:
document.addEventListener("DOMContentLoaded", function () {
  let create = document.getElementById("linkRegisterForm");
  let haveAcc = document.getElementById("linkLogin");
  let formLogin = document.getElementById("loginForm");
  let formCreateAcc = document.getElementById("registerForm");

  create.addEventListener("click", function (e) {
    e.preventDefault();

    hide(formLogin);
    show(formCreateAcc);
  });

  haveAcc.addEventListener("click", function (e) {
    e.preventDefault();

    show(formLogin);
    hide(formCreateAcc);
  });
});

function hide(elem) {
  elem.classList.add("form--hidden");
  elem.classList.remove("form--unhidden");
}

function show(elem) {
  elem.classList.add("form--unhidden");
  elem.classList.remove("form--hidden");
}

