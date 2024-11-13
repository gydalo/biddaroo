import { API_AUTH_REGISTER } from "../constants";

const method = "post";

export async function register(profile) {
  const registerURL = API_AUTH_REGISTER;
  const body = JSON.stringify(profile);

 const response = await fetch(registerURL, {
      headers: {
          "Content-Type": "application/json"
      },
      method,
      body
  });

  const result = await response.json();
  alert("You are now registered");
  console.log(result);

window.location.href = "/auth/login/index.html";
}
