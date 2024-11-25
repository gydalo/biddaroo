import { isLoggedIn } from "../../api/auth/key.js";
/*
import { getPostIdFromUrl } from "/src/js/router/views/post.js";
import * as postMethods from "/src/js/api/post/index.js"; */

function logOut() {
    if (isLoggedIn()) {
        const container = document.querySelector("#logOutButton");

    if (container) {
        const button = document.createElement("button");
        button.innerText = "Logout";
        button.addEventListener("click", () => {
            localStorage.clear();

            alert("You are now logged out");
            location.reload()
        });

        container.appendChild(button);
    }
}
}


logOut();


function renderCreateButton() {
    if (isLoggedIn()) {
        const container = document.querySelector("#loggedInButton");

        if (container) { 
            const button = document.createElement("button");
            button.innerText = "Create Listing";
            button.addEventListener("click", () => {
                // Change to /Biddaroo/ for github version
                window.location.href = `/biddaroo/post/create/index.html`;
            });
            
            container.appendChild(button);
        }
    }
}


renderCreateButton();
/*

function renderRemoveButton() {
    if (window.location.pathname === "/post/index.html" && isLoggedIn()) {
        const container = document.querySelector("#deleteButton");
        const id = getPostIdFromUrl(); 

        if (container, id) { 
            const button = document.createElement("button");
            button.innerText = "Delete Post";
            button.classList.add(
                "py-2",
                "px-4",
                "bg-button",
                "rounded",
                "font-button",
                "hover:bg-buttonHover"
            )
            button.addEventListener("click", () => {
                postMethods.removePost(id);
            });

            container.appendChild(button);

        } else {
            if (!container) {
                console.error("No container found with the selector #deleteButton");
            }
            if (!id) {
                console.error("No post ID found in URL");
            }
        }
    }
}

renderRemoveButton(); 

function renderEditButton() {
    if (window.location.pathname === "/post/index.html" && isLoggedIn()) {
        const container = document.querySelector("#editButton");
        const id = getPostIdFromUrl(); 

        if (container, id) { 
            const button = document.createElement("button");
            button.innerText = "Edit Post";
            button.classList.add(
                "py-2",
                "px-4",
                "bg-button",
                "rounded",
                "font-button",
                "hover:bg-buttonHover"
            )
            button.addEventListener("click", () => {
                window.location.href = `/post/edit/index.html?id=${id}`;
            });
            container.appendChild(button);
        }
    }
}


renderEditButton(); 


function loginButtonNotLoggedIn() {
    if (isLoggedIn()) {
    } else {
        const container = document.querySelector("#notLoggedIn");

        if (container) { 
            const buttonLogin = document.createElement("button");
            buttonLogin.innerText = "Login";
            buttonLogin.addEventListener("click", () => {
                window.location.href = `/auth/login.html`;

            });
            container.appendChild(buttonLogin);
        }
        
}
}

loginButtonNotLoggedIn();

function registerButtonNotLoggedIn() {
    if (isLoggedIn()) {
    } else {
        const container = document.querySelector("#notLoggedIn");

        if (container) { 
            const buttonRegister = document.createElement("button");
            buttonRegister.innerText = "Register";
            buttonRegister.addEventListener("click", () => {
                window.location.href = `/auth/register.html`;

            });
            container.appendChild(buttonRegister);
        }
        
}
}

registerButtonNotLoggedIn(); */


