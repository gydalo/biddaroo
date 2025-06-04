import { API_AUTH_REGISTER } from '../constants.js'

const method = 'POST'

/**
 * Registers a new user with the given profile data.
 * @param {Object} profile - The user's registration info.
 * @returns {Promise<void>}
 */
export async function register(profile) {
  const registerURL = API_AUTH_REGISTER;
  const body = JSON.stringify(profile);
  const errorMessageEl = document.getElementById('errorMessage');
  const successMessageEl = document.getElementById('registerMessage');

  errorMessageEl.textContent = '';
  successMessageEl.textContent = '';

  try {
    const response = await fetch(registerURL, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const result = await response.json();

    if (!response.ok) {
      errorMessageEl.textContent =
        result?.errors?.[0]?.message || 'Registration failed.';
      return;
    }

    successMessageEl.textContent = 'You are now registered.';
  } catch {
    errorMessageEl.textContent =
      'Something went wrong. Please try again later.';
  }
}