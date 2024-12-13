import { isLoggedIn, load, save } from '../../api/auth/key.js';
import { getProfile } from '../../api/profile/read.js';

console.log("Loading profile from Local Storage:", load('profile')); 

export const profilePage = async () => {
  if (!isLoggedIn()) {
    location.href = './';
  } else {
    try {
      const storedProfile = load('profile');

      const profileName = storedProfile?.data?.name;

      if (!profileName) {
        console.error("Profile name is missing");
        return;
      }

      const updatedProfile = await getProfile(profileName);

      save('profile', updatedProfile);

      renderProfilePage(updatedProfile.data);
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

  

  const profileInfoSection = document.createElement("div");
  profileInfoSection.classList.add("profile-info-section", "flex", "justify-center", "gap-16", "mt-20", "mb-32", "flex-wrap", "md:flex-nowrap" 
  );

  const bioCreditsSection = document.createElement("div");
  bioCreditsSection.classList.add("bio-credits-section", "self-center");

  const bioElement = document.createElement("p");
  bioElement.textContent = data.bio || "No bio available";
  bioElement.classList.add("font-p");
  bioCreditsSection.appendChild(bioElement);

  const creditsElement = document.createElement("p");
  creditsElement.textContent = data.credits !== undefined ? `Credits: ${data.credits}` : "Credits: Not available";
  creditsElement.classList.add("font-p");
  bioCreditsSection.appendChild(creditsElement);

  const nameAvatarSection = document.createElement("div");
  nameAvatarSection.classList.add("name-avatar-section", "justify-center", "text-center");

  const nameElement = document.createElement("h3");
  nameElement.textContent = data.name || "No name provided";
  nameElement.classList.add("font-h2", "text-lg", "mb-12");
  nameAvatarSection.appendChild(nameElement);

  if (data.avatar?.url) {
    const avatarImage = document.createElement("img");
    avatarImage.src = data.avatar.url;
    avatarImage.alt = data.avatar.alt || "Profile Avatar";

    //avatarImage.classList.add("w-20", "h-20", "rounded-full", "object-cover"); 



    //Didn't get the classList to work on the image, will try again later
    const size = data.avatar.size || 200;
    avatarImage.style.width = `${size}px`;
    avatarImage.style.height = `${size}px`;
    avatarImage.style.borderRadius = "50%"; 
    avatarImage.style.objectFit = "cover"; 

    nameAvatarSection.appendChild(avatarImage);
  }

  const bannerSection = document.createElement("div");
  bannerSection.classList.add("banner-section", "w-full", "relative", "overflow-hidden", "h-80");

  if (data.banner?.url) {
    const bannerImage = document.createElement("img");
    bannerImage.src = data.banner.url;
    bannerImage.alt = data.banner.alt || "Profile Banner";
    bannerSection.appendChild(bannerImage);
  }

  profileContainer.appendChild(bannerSection);
  profileInfoSection.appendChild(nameAvatarSection);
  profileInfoSection.appendChild(bioCreditsSection);
  profileContainer.appendChild(profileInfoSection);


  const listingsWinsSection = document.createElement("div");
  listingsWinsSection.classList.add("flex", "flex-col", "justify-center", "md:flex-row", "gap-4", "items-center");


  const listings = data.listings || (data._count?.listings || []);
  const listingsSection = document.createElement("div");
  listingsSection.classList.add("listings-section", "md:basis-1/3", "justify-center", "md:flex-row");

  if (listings.length > 0) {
    const listingsTitle = document.createElement("h2");
    listingsTitle.textContent = "Listings";
    listingsTitle.classList.add("font-h2", "text-lg");
    listingsSection.appendChild(listingsTitle);

    listings.forEach(listing => {
      const listingContainer = document.createElement("div");
      listingContainer.classList.add("listing-container");

      const listingTitle = document.createElement("p");
      listingTitle.textContent = listing.title;
      listingTitle.classList.add("font-p");
      listingContainer.appendChild(listingTitle);

      listingContainer.addEventListener("click", () => {
        const targetUrl = `/biddaroo/post/index.html?id=${listing.id}`;
        console.log(`Navigating to: ${targetUrl}`);
        window.location.href = targetUrl;
      });

      listingsSection.appendChild(listingContainer);
    });
  }

  listingsWinsSection.appendChild(listingsSection);

  const wins = data.wins || (data._count?.wins || []);
  const winsSection = document.createElement("div");
  winsSection.classList.add("wins-section", "md:basis-1/3", "md:flex-row", "max-w-sm");

  if (wins.length > 0) {
    const winsTitle = document.createElement("h2");
    winsTitle.textContent = "Wins";
    winsTitle.classList.add("font-h2", "text-lg");
    winsSection.appendChild(winsTitle);

    wins.forEach(win => {
      const winContainer = document.createElement("div");
      winContainer.classList.add("win-container");

      const winTitle = document.createElement("p");
      winTitle.textContent = win.title;
      winTitle.classList.add("font-p");
      winContainer.appendChild(winTitle);

      winContainer.addEventListener("click", () => {
        const targetUrl = `/biddaroo/post/index.html?id=${win.id}`;
        console.log(`Navigating to: ${targetUrl}`);
        window.location.href = targetUrl;
      });

      winsSection.appendChild(winContainer);
    });
  }

  listingsWinsSection.appendChild(winsSection);
  profileContainer.appendChild(listingsWinsSection);
}


const data = JSON.parse(localStorage.getItem('profile'));
