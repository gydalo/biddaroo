import { isLoggedIn } from "../../api/auth/key.js";


// For showing either login or register on homepage:
document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("loginForm");
    const formCreateAcc = document.getElementById("registerForm");

    const loggedInButton = document.getElementById("loggedInButton");
    const loggedInHeading = document.getElementById("loggedInHeading");
  
    if (isLoggedIn()) {
        hide(formLogin);
        hide(formCreateAcc);
        
        show(loggedInButton);
        show(loggedInHeading);
    } else {
    document.addEventListener("click", function (e) {
      if (e.target.id === "linkRegisterForm") {
        e.preventDefault();
        toggleForms(formLogin, formCreateAcc);
      } else if (e.target.id === "linkLogin") {
        e.preventDefault();
        toggleForms(formCreateAcc, formLogin);
      }
    });
}
  
    function toggleForms(formToHide, formToShow) {
        hide(formToHide);
        show(formToShow);
    }

    function hide(elem) {
        elem.classList.add("form--hidden");
        elem.classList.remove("form--unhidden");
    }

    function show(elem) {
        elem.classList.add("form--unhidden");
        elem.classList.remove("form--hidden");
    }
  });

  