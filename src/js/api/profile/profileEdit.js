import { getProfile } from "../profile/index.js";
import { updateProfile } from "../profile/index.js";
import { load, save } from "../auth/key.js";

const form = document.querySelector("#editProfile");

if (form) {
  const profileData = load("profile");
  console.log("Loaded profile data:", profileData);
  const profileName = profileData?.data?.name || null;

  if (!profileName) {
    console.error("Profile name is missing.");
  }

  async function loadProfileData() {
    try {
      const profile = await getProfile(profileName);
      if (!profile.data) {
        console.error("Profile data is missing.");
        return;
      }

      const { data } = profile;

      if (form.username) form.username.value = data.name || "";
      if (form.bio) {
        form.bio.value = data.bio || "";
      }
      if (form.avatarURL) {
        form.avatarURL.value =
          data.avatar?.url ||
          "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";
      }
      if (form.bannerURL) {
        form.bannerURL.value =
          data.banner?.url ||
          "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500";
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  }

  loadProfileData();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!profileName) {
      console.error("Profile data is not loaded yet.");
      return;
    }

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
        window.location.href = "/biddaroo/profile.html";
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  });
} else {
  console.error("Edit profile form not found");
}
