import { isLoggedIn, load } from '../../api/auth/key.js';

console.log("Loading profile from Local Storage:", load('profile')); 

export const profilePage = async () => {
  if (!isLoggedIn()) {
    location.href = './';
  } else {
    try {
      const profileData = load('profile'); 

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

  const creditsElement = document.createElement("p");
  creditsElement.textContent = data.credits !== undefined ? `Credits: ${data.credits}` : "Credits: Not available";
  profileContainer.appendChild(creditsElement);


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

  const listings = data.listings || (data._count?.listings || []);
  const wins = data.wins || (data._count?.wins || []);


  if (listings.length > 0) {
    const listingsTitle = document.createElement("h2");
    listingsTitle.textContent = "Listings";
    profileContainer.appendChild(listingsTitle);

    listings.forEach(listing => {
      const listingContainer = document.createElement("div");
      const listingTitle = document.createElement("p");
      listingTitle.textContent = `${listing.title}`;
      listingContainer.appendChild(listingTitle);

      profileContainer.appendChild(listingContainer);
    });
  }


  if (wins.length > 0) {
    const winsTitle = document.createElement("h2");
    winsTitle.textContent = "Wins";
    profileContainer.appendChild(winsTitle);

    wins.forEach(win => {
      const winContainer = document.createElement("div");
      const winTitle = document.createElement("p");
      winTitle.textContent = `${win.title}`;
      winContainer.appendChild(winTitle);

      profileContainer.appendChild(winContainer);
    });

  }

}

const data = JSON.parse(localStorage.getItem('profile'));
