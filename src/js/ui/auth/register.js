// export async function onRegister(event) {}

import { register } from "../../api/auth/register.js";


export function setRegisterFormListener () {
    const form = document.querySelector("#registerForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())
        
            console.log(profile);
            register(profile)
        });
    }
}
