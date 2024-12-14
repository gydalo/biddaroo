import { getProfile } from "../profile/index.js";
import { updateProfile } from "../profile/index.js";
import { load, save } from "../auth/key.js";
import { getPosts } from "../post/read.js";

const form = document.querySelector("#editProfile");

if (form) {
  const profileData = load("profile");

  const profileName = profileData?.data?.name || profileData?.name || null;

  async function loadProfileData() {
    try {
      console.log("Fetching profile data for:", profileName);
      const profile = await getProfile(profileName);
      console.log("Fetched profile data:", profile);

      const profileDetails = profile?.data;

      if (!profileDetails || !profileDetails.name) {
        console.error("Profile data is missing or invalid.");
        return;
      }

      if (form.username) form.username.value = profileDetails.name || "";
      if (form.bio) form.bio.value = profileDetails.bio || "";
      if (form.avatarURL)
        form.avatarURL.value =
          profileDetails.avatar?.url ||
          "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";
      if (form.bannerURL)
        form.bannerURL.value =
          profileDetails.banner?.url ||
          "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500";
      
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  }

  loadProfileData();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    const updatedProfile = {
      name: profileName,
      username: formValues.username,
      bio: formValues.bio,
      avatar: {
        url: formValues.avatarURL,
        alt: formValues.avatarALT,
      },
      banner: {
        url: formValues.bannerURL,
        alt: formValues.bannerALT,
      },
    };

    try {
      const response = await updateProfile(updatedProfile);

      if (response) {
        console.log("Profile updated successfully:", response);
        save("profile", response);
        window.location.href = "/biddaroo/profile/index.html";
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  });
} else {
  console.error("Edit profile form not found");
}

async function displayActiveAuctions() {
  const postContainer = document.getElementById("auctionContainer");
  if (!postContainer) {
    console.error(`Container with id "auctionContainer" not found.`);
    return;
  }
  
  try {
    const posts = await getPosts(1, 10);

    if (!posts || !posts.data) {
      console.error("Unexpected posts structure:", posts);
      return;
    }

    const activePostsWithImages = posts.data.filter((post) => {
      const endsAtDate = new Date(post.endsAt);
      return endsAtDate > new Date() && post.media?.length > 0 && post.media[0]?.url;
    });

    if (activePostsWithImages.length < 2) {
      console.log("Not enough posts with images found.");
      postContainer.classList.add('font-p')
      postContainer.innerHTML = "<p>No active auctions available.</p>";
      return;
    }

    activePostsWithImages.slice(0, 2).forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      const title = document.createElement("h2");
      title.textContent = post.title;
      title.classList.add("font-h2", "cursor-pointer", "mb-4")
      postElement.appendChild(title);
      title.addEventListener("click", () => {
        const targetUrl = `/biddaroo/post/index.html?id=${post.id}`;
        window.location.href = targetUrl;

      });
      title.classList.add('font-h2')

        const img = document.createElement("img");
        img.src = post.media[0].url;
        img.alt = `Image of ${post.title}`;
        img.classList.add('w-80', "hover:cursor-pointer","hover:opacity-60")
        postElement.appendChild(img);
        img.addEventListener("click", () => {
          const targetUrl = `/biddaroo/post/index.html?id=${post.id}`;
          window.location.href = targetUrl;
        });


      postContainer.appendChild(postElement);
    });

  } catch (error) {
    console.error("Error fetching or displaying posts:", error);
  }
}

displayActiveAuctions();
