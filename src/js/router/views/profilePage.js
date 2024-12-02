import { isLoggedIn, load } from '../../api/auth/key.js';

console.log("Loading profile from Local Storage:", load('profile')); 

export const profilePage = async () => {
  if (!isLoggedIn()) {
    location.href = './';
  } else {
    try {
      const profileData = load('profile'); 
      console.log("Loaded profile data:", profileData);

      const data = profileData.data ? profileData.data : profileData;

      if (!data || Object.keys(data).length === 0) {
        console.error("Profile data is missing");
        return;
      }

      renderProfilePage(data);  

    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }
};

function renderProfilePage(data) {
  const profileContainer = document.getElementById("profile-container");

  if (!profileContainer) {
    console.error("Profile container not found");
    return;
  }

  profileContainer.innerHTML = "";

  const nameElement = document.createElement("h3");
  nameElement.textContent = data.name || "No name provided";
  profileContainer.appendChild(nameElement);

  const bioElement = document.createElement("p");
  bioElement.textContent = data.bio || "No bio available";
  profileContainer.appendChild(bioElement);

  if (data.avatar?.url) {
    const avatarImage = document.createElement("img");
    avatarImage.src = data.avatar.url;
    avatarImage.alt = data.avatar.alt || "Profile Avatar";
    profileContainer.appendChild(avatarImage);
  }

  if (data.banner?.url) {
    const bannerImage = document.createElement("img");
    bannerImage.src = data.banner.url;
    bannerImage.alt = data.banner.alt || "Profile Banner";
    profileContainer.appendChild(bannerImage);
  }

}

