import { getPost } from "../../api/post/read.js";

export function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  return postId;
}

const postId = getPostIdFromUrl();
if (postId) {
  getPost(postId)
    .then((postData) => {
      renderPostData(postData);
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

  if (postData.media && postData.media.length > 0) {
    const auctionImage = document.createElement("img");

    auctionImage.setAttribute("src", postData.media[0].url);
    auctionImage.alt = `Image from ${postData.title}`;

    postContainer.appendChild(auctionImage);
  } else {
    console.log("No media available for this post.");
  }

  postContainer.appendChild(auctionTitle);
  postContainer.appendChild(auctionDescription);
  postContainer.appendChild(sellerName);
  postContainer.appendChild(auctionEnds);
  postContainer.appendChild(auctionDate);
}