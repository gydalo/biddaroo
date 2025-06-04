import * as storage from './key.js'
import { API_AUTH_LOGIN } from '../constants.js'
import { getProfile } from '../profile/read.js'

const method = 'POST'

/**
 * Logs in the user and saves tokens/profile to storage.
 * @param {Object} profile - The login credentials { email, password }
 * @returns {Promise<boolean>} true on success, false on failure
 */
export async function login(profile) {
  const loginURL = API_AUTH_LOGIN;
  const body = JSON.stringify(profile);
  const errorMessageEl = document.getElementById('errorMessage');

  errorMessageEl.textContent = '';

  try {
    const response = await fetch(loginURL, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      errorMessageEl.textContent = 'Username or password is incorrect';
      return false;
    }

    const jsonResponse = await response.json();
    const { accessToken, ...user } = jsonResponse.data;

    storage.save('token', accessToken);
    storage.save('name', user.name);

    try {
      const profileData = await getProfile(user.name);
      if (profileData) {
        storage.save('profile', profileData);
      }
    } catch {
      // skip storing profile if it fails
    }

    location.reload();
    return true;
  } catch {
    errorMessageEl.textContent = 'Wrong username or password';
    return false;
  }
}