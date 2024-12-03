import { authFetch } from "../../api/auth/key.js";
import { API_AUCTION_PROFILES } from "../../api/constants.js";


export async function getProfiles() {
    const updateProfileURL = `${API_AUCTION_PROFILES}?_listings=true&_wins=true&_count=true`;
    
    const response = await authFetch(updateProfileURL)
  
    return await response.json();
  }
  

export async function getProfile(name) {
    if (!name) {
        throw new Error("Get requires a name");
    }

    const getProfileURL = `${API_AUCTION_PROFILES}/${name}?_listings=true&_wins=true&_count=true`;

    const response = await authFetch(getProfileURL);

    if (!response.ok) {
        console.error("Failed to fetch profile:", response.status, response.statusText);
        throw new Error("Failed to fetch profile");
    }

    const profile = await response.json();
    return profile;
}
    


/*
export async function getProfile(name) {
  const profileData = load('profile');
  if (!profileData || !profileData.data || !profileData.data.name) {
      throw new Error("Get requires a name, but it's missing.");
  }
  return profileData.data; 
}

*/