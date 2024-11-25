import { isLoggedIn } from '../../api/auth/key.js';
import { getProfile } from '../../api/profile/read.js';
import { load } from '../../api/auth/key.js';

export const profilePage = async () => {
    if (!isLoggedIn()) {
      location.href = './'; 
    } else {
      try {
        const profileData = load('profile');
  
        renderProfilePage(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  };
  
  function renderProfilePage(profileData) {
    const profileContainer = document.getElementById("profile-container");
  
    if (!profileContainer) {
      console.error("Profile container not found");
      return;
    }
  
    const nameElement = document.createElement("h1");
    nameElement.textContent = profileData.name;
    profileContainer.appendChild(nameElement);
  
    const emailElement = document.createElement("p");
    emailElement.textContent = `Email: ${profileData.email}`;
    profileContainer.appendChild(emailElement);
  
    const bioElement = document.createElement("p");
    bioElement.textContent = `Bio: ${profileData.bio}`;
    profileContainer.appendChild(bioElement);
  
    if (profileData.avatar && profileData.avatar.url) {
      const avatarImage = document.createElement("img");
      avatarImage.src = profileData.avatar.url;
      avatarImage.alt = profileData.avatar.alt || "Profile Avatar";
      profileContainer.appendChild(avatarImage);
    }
  
    if (profileData.banner && profileData.banner.url) {
      const bannerImage = document.createElement("img");
      bannerImage.src = profileData.banner.url;
      bannerImage.alt = profileData.banner.alt || "Profile Banner";
      profileContainer.appendChild(bannerImage);
    }
  

    console.log(profileData);
  }