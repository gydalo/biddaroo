import { isLoggedIn, load } from "../../api/auth/key.js";
import { getPost } from "../../api/post/read.js";
import { getPostIdFromUrl } from "../views/post.js";
import * as postMethods from "../../api/post/index.js";
import { placeBid, fetchUserProfile } from "../views/bid.js";


async function handleBidPlacement() {
  const currentUrl = window.location.pathname;
  const postId = getPostIdFromUrl();

  const expectedUrl = `/biddaroo/post/index.html`;

  if (currentUrl === expectedUrl && postId) {
    console.log("On the correct bid page. Initializing bid placement...");
  document
    .getElementById("place-bid-button")
    .addEventListener("click", async () => {
      const bidAmountInput = document.getElementById("bid-amount");
      const bidAmount = parseFloat(bidAmountInput.value);

      if (isNaN(bidAmount) || bidAmount <= 0) {
        alert("Please enter a valid bid amount.");
        return;
      }

      const listingId = getPostIdFromUrl();

      try {
        const userProfile = await fetchUserProfile();
        console.log("Fetched user profile:", userProfile);

        if (!userProfile) {
          alert("Failed to retrieve user profile. Please log in again.");
          return;
        }

        const userCredits = userProfile.credits;

        if (bidAmount > userCredits) {
          alert(
            `You do not have enough credits to place this bid. Available credits: ${userCredits}`
          );
          return;
        }

        const result = await placeBid(listingId, bidAmount);
        console.log("Bid result:", result);
        location.reload()
      } catch (error) {
        alert("Failed to place bid. Please try again.");
        console.error("Bid error:", error);
      }
    });
}
}

document.addEventListener("DOMContentLoaded", handleBidPlacement);

handleBidPlacement(); 


function getLoggedInUserName() {
  const profileData = load("profile");
  return profileData?.data?.name || profileData?.name || null;
}

function logOut() {
  if (isLoggedIn()) {
    const container = document.querySelector("#logOutButton");

    if (container) {
      const button = document.createElement("button");
      button.innerText = "Logout";
      button.addEventListener("click", () => {
        localStorage.clear();

        window.location.href = '/biddaroo/index.html';
      });

      container.appendChild(button);
    }
  }
}

logOut();

function renderProfileButton() {
  if (isLoggedIn()) {
    const container = document.querySelector("#loggedInProfileButton");

    if (container) {
      const button = document.createElement("button");
      button.innerText = "Profile";
      button.addEventListener("click", () => {
        // Change to /Biddaroo/ for github version
        window.location.href = `/biddaroo/profile/index.html`;
      });

      container.appendChild(button);
    }
  }
}

renderProfileButton();

async function renderEditProfileButton() {
  if (
    window.location.pathname === "/profile/index.html" ||
    ("/biddaroo/profile/index.html" && isLoggedIn())
  ) {
    const container = document.querySelector("#editProfileButton");

    if (container) {
      try {
        const loggedInUser = getLoggedInUserName();

        if (loggedInUser) {
          const button = document.createElement("button");
          button.innerText = "Edit Profile";
          button.classList.add("p-2", "font-h2", "text-center", "bg-button", "py-1", "px-3", "hover:bg-hover")
          button.addEventListener("click", () => {
            window.location.href = `/biddaroo/profile/edit/index.html?name=${loggedInUser}`;
          });
          container.appendChild(button);
        }
      } catch (error) {
        console.error("Failed to render edit button:", error);
      }
    }
  }
}

renderEditProfileButton();

function renderCreateButton() {
  if (isLoggedIn()) {
    const container = document.querySelector("#loggedInCreateButton");

    if (container) {
      const button = document.createElement("button");
      button.innerText = "Create Listing";
      button.classList.add("p-2", "font-h2", "text-center", "bg-button", "py-1", "px-3", "hover:bg-hover")
      button.addEventListener("click", () => {
        // Change to /Biddaroo/ for github version
        window.location.href = `/biddaroo/post/create/index.html`;
      });

      container.appendChild(button);
    }
  }
}

renderCreateButton();

async function renderRemoveButton() {
  if (
    window.location.pathname === "/post/index.html" ||
    ("/biddaroo/post/index.html" && isLoggedIn())
  ) {
    const container = document.querySelector("#deleteButton");
    const id = getPostIdFromUrl();

    if ((container, id)) {
      try {
        const post = await getPost(id);

        const loggedInUser = getLoggedInUserName();

        if (post.seller && post.seller.name === loggedInUser) {
          const button = document.createElement("button");
          button.innerText = "Delete Post";

          button.classList.add("p-2", "font-h2", "text-center", "bg-button", "py-1", "px-3", "hover:bg-hover")

          button.addEventListener("click", () => {
            postMethods.removePost(id);
          });

          container.appendChild(button);
        }
      } catch (error) {
        console.error("Failed to render edit button:", error);
      }
    }
  }
}

renderRemoveButton();

async function renderEditButton() {
  if (
    window.location.pathname === "/post/index.html" ||
    ("/biddaroo/post/index.html" && isLoggedIn())
  ) {
    const container = document.querySelector("#editButton");
    const id = getPostIdFromUrl();

    if (container && id) {
      try {
        const post = await getPost(id);

        const loggedInUser = getLoggedInUserName();

        if (post.seller && post.seller.name === loggedInUser) {
          const button = document.createElement("button");
          button.innerText = "Edit Post";
          button.classList.add("p-2", "font-h2", "text-center", "bg-button", "py-1", "px-3", "hover:bg-hover")
          button.addEventListener("click", () => {
            window.location.href = `/biddaroo/post/edit/index.html?id=${id}`;
          });
          container.appendChild(button);
        }
      } catch (error) {
        console.error("Failed to render edit button:", error);
      }
    }
  }
}

renderEditButton();

