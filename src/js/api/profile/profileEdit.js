import { getProfile } from "../profile/index.js";
import { updateProfile } from "../profile/index.js";
import { load, save } from "../auth/key.js";

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
