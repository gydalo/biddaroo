
// Auth key save in storage

export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
export function load(key) {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch {
      return null
    } 
  }
  
export function remove(key) {
    localStorage.removeItem(key);
  }


  // Auth key
export function headers() {
    const token = load("token");
  
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      'X-Noroff-API-Key': '72735a77-9e47-4c8a-889b-3ae8bdfd8904'
    }
  }
  
export async function authFetch(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: headers()
    })
  }


export function isLoggedIn() {
    const token = load("token"); 
    return !!token;
}
