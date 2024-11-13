
/*
import * as storage from "./key.js";
import { API_AUTH_LOGIN } from "../constants.js";

const method = "POST";

export async function login(profile) {
    const loginURL = API_AUTH_LOGIN;
    const body = JSON.stringify(profile);
    try {
        const response = await fetch(loginURL, {
            headers: {
                "Content-Type": "application/json"
            },
            method,
            body
        });

        if (!response.ok) {
            throw new Error("Username or password is incorrect");
        }

    const jsonResponse = await response.json();
    const { accessToken, ...user } = jsonResponse.data; 

    storage.save("token", accessToken);
    storage.save("profile", user);

    alert("You are now logged in");

    window.location.href = "/index.html";
} catch (error) {
    alert("Wrong username or password");
}

}

*/