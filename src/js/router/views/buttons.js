import { isLoggedIn, load } from "../../api/auth/key.js";
import { getPost } from "../../api/post/read.js";
import { getPostIdFromUrl } from "../views/post.js";
import * as postMethods from "../../api/post/index.js";

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

function renderProfileButton() {
    if (isLoggedIn()) {
        const container = document.querySelector("#loggedInProfileButton");

        if (container) { 
            const button = document.createElement("button");
            button.innerText = "Profile";
            button.addEventListener("click", () => {
                // Change to /Biddaroo/ for github version
                window.location.href = `/biddaroo/profile/index.html`;
            });
            
            container.appendChild(button);
        }
    }
}

renderProfileButton();


function renderCreateButton() {
    if (isLoggedIn()) {
        const container = document.querySelector("#loggedInCreateButton");

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



async function renderRemoveButton() {
    if (window.location.pathname === "/post/index.html" || "/biddaroo/post/index.html" && isLoggedIn()) {
        const container = document.querySelector("#deleteButton");
        const id = getPostIdFromUrl(); 

        if (container, id) { 
            try {
                const post = await getPost(id);
                const userProfile = load("profile");
                const loggedInUser = userProfile ? userProfile.name : null;

            if (post.seller && post.seller.name === loggedInUser) {
            const button = document.createElement("button");
            button.innerText = "Delete Post";

            button.addEventListener("click", () => {
                postMethods.removePost(id);
            });

            container.appendChild(button);

        }
    } catch (error) {
        console.error("Failed to render edit button:", error);
    }
}
}
}

renderRemoveButton(); 


async function renderEditButton() {
    if (window.location.pathname === "/post/index.html" || "/biddaroo/post/index.html" && isLoggedIn()) {
        const container = document.querySelector("#editButton");
        const id = getPostIdFromUrl();

        if (container && id) {
            try {
                const post = await getPost(id);

                const userProfile = load("profile");
                const loggedInUser = userProfile ? userProfile.name : null;

                if (post.seller && post.seller.name === loggedInUser) {

                    const button = document.createElement("button");
                    button.innerText = "Edit Post";
                    button.addEventListener("click", () => {
                        window.location.href = `/biddaroo/post/edit/index.html?id=${id}`;
                    });
                    container.appendChild(button);
                }
            } catch (error) {
                console.error("Failed to render edit button:", error);
            }
        }
    }
}

renderEditButton();

/*

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


