import { login } from "../../api/auth/login.js";

//export async function onLogin(event) {}
// From https://www.youtube.com/watch?v=rLAGHFr8bvU&t=2306s


export function setLoginFormListener () {
    const form = document.querySelector("#loginForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())
        
            login(profile)
        })
    }
}
