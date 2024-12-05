import { getPost } from "../../api/post/read.js";
import { isLoggedIn, load } from "../../api/auth/key.js";
import { placeBid } from "./bid.js";
import { initializeCarousel } from "./carousel.js";

export function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  return postId;
}

const postId = getPostIdFromUrl();
if (postId) {
  getPost(postId)
    .then((postData) => {
      renderPostData(postData),
      renderBidderInformation(postData);
      renderBidInput(postData);

      if (postData.media && Array.isArray(postData.media) && postData.media.length > 0) {
        initializeCarousel(postData.media);
      } else {
        console.log("No media available for this post.");
      }
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
    });
}

function renderPostData(postData) {
  const postContainer = document.getElementById("post-container");

  if (!postContainer) {
    console.error("Post container not found");
    return;
  }

  const auctionTitle = document.createElement("h2");
  auctionTitle.textContent = postData.title;

  const auctionDescription = document.createElement("p");
  auctionDescription.textContent = postData.description;

  const sellerName = document.createElement("p");
  sellerName.textContent = `Seller: ${postData.seller?.name}`;

  const auctionEnds = document.createElement("p");

  auctionEnds.textContent = `Auction ends ${new Date(
    postData.endsAt
  ).toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}`;

  const auctionDate = document.createElement("p");
  auctionDate.textContent = `Created on: ${new Date(
    postData.created
  ).toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}`;

  const bidsCount = document.createElement("p");
  bidsCount.textContent = `Total Bids: ${postData._count?.bids ?? 0}`;

/*
  if (postData.media && Array.isArray(postData.media) && postData.media.length > 0) {
    postData.media.forEach((mediaItem) => {
      if (mediaItem && mediaItem.url) { 
        const auctionImage = document.createElement("img");
  

    auctionImage.setAttribute("src", mediaItem.url);
    auctionImage.alt = mediaItem.alt || `Image from ${postData.title}`;

    postContainer.appendChild(auctionImage);
        }
      });
  } else {
    console.log("No media available for this post.");
  }
    */


  postContainer.appendChild(auctionTitle);
  postContainer.appendChild(auctionDescription);
  postContainer.appendChild(sellerName);
  postContainer.appendChild(bidsCount);
  postContainer.appendChild(auctionEnds);
  postContainer.appendChild(auctionDate);
}



function renderBidderInformation(postData) {
  const bidderContainer = document.getElementById("bidder-container");

  if (!bidderContainer) {
    console.error("Post container not found");
    return;
  }

  const bidsContainer = document.createElement("div");
  bidsContainer.classList.add("bids-container");

  const bidsTitle = document.createElement("h3");
  bidsTitle.textContent = "Bids:";
  bidsContainer.appendChild(bidsTitle);

  if (postData.bids && postData.bids.length > 0) {
    postData.bids.forEach((bid) => {
      const bidElement = document.createElement("p");
      bidElement.textContent = `Bidder: ${bid.bidder.name}, Amount: ${bid.amount}`;
      bidsContainer.appendChild(bidElement);
    });
  } else {
    const noBidsMessage = document.createElement("p");
    noBidsMessage.textContent = "No bids placed yet.";
    bidsContainer.appendChild(noBidsMessage);
  }

  bidderContainer.appendChild(bidsContainer);
}


function renderBidInput(postData) {
  const bidContainer = document.getElementById("bid-container");

  if (!bidContainer) {
    console.error("Bid container not found");
    return;
  }

  if (!isLoggedIn()) {
    bidContainer.innerHTML = "<p>You need to log in to place a bid.</p>";
    return;
  }

  const userProfile = load("profile");
  const loggedInUser = userProfile?.data?.name;
  const sellerName = postData.seller?.name;

  console.log(load("profile"))

  if (loggedInUser === sellerName) {
    bidContainer.innerHTML = "<p>You cannot bid on your own auction.</p>";
    return;
  }

  const bidForm = document.createElement("form");

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.placeholder = "Enter your bid amount";
  bidInput.required = true;
  bidInput.name = "bidAmount";

  const bidButton = document.createElement("button");
  bidButton.type = "submit";
  bidButton.textContent = "Place Bid";

  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidButton);

  bidForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const bidAmount = parseFloat(bidInput.value);

    if (isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    placeBid(postData.id, bidAmount)
      .then(() => {
        alert("Bid placed successfully!");
        location.reload();
      })
      .catch((error) => {
        console.error("Failed to place bid:", error);
        alert("Error placing bid. Please try again.");
      });
  });

  bidContainer.appendChild(bidForm);
}