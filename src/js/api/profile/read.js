import { authFetch } from "../../api/auth/key.js";
import { API_AUCTION_PROFILES } from "../../api/constants.js";


export async function getProfiles() {
    const updateProfileURL = `${API_AUCTION_PROFILES}`;
    
    const response = await authFetch(updateProfileURL)
  
    return await response.json();
  }
  

  export async function getProfile(name) {
    if (!name) {
        throw new Error("Get requires a name");
    }
    
    // Correct API endpoint
    const getProfileURL = `${API_AUCTION_PROFILES}/${name}`;
    const response = await authFetch(getProfileURL);

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    return await response.json();
}