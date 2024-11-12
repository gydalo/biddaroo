import { authFetch } from "../../api/auth/key";
import { API_SOCIAL_PROFILES } from "../../api/constants";

export async function getProfiles() {
    const updateProfileURL = `${API_SOCIAL_URL}`;
    
    const response = await authFetch(updateProfileURL)
  
    return await response.json();
  }
  

  export async function getProfile(name) {
    if (!name) {
      throw new Error("Get requires a name");
    }
  
    const getProfileURL = `${API_SOCIAL_PROFILES}$/${name}`;
    
    const response = await authFetch(getProfileURL)
  
    return await response.json();
  }

console.log('hei')