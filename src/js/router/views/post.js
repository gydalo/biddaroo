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

  const postTitle = document.createElement("h2");
  postTitle.textContent = postData.title;

  const postDescription = document.createElement("p");
  postDescription.textContent = postData.description;

  const sellerName = document.createElement("p");
  sellerName.textContent = `Seller: ${postData.seller?.name}`;

  const postDate = document.createElement("p");
  postDate.textContent = `Created on: ${new Date(
    postData.created
  ).toLocaleDateString()}`;

  if (postData.media && postData.media.length > 0) {
    const postImage = document.createElement("img");

    postImage.setAttribute("src", postData.media[0].url);
    postImage.alt = `Image from ${postData.title}`;

    postContainer.appendChild(postImage);
  } else {
    console.log("No media available for this post.");
  }

  postContainer.appendChild(postTitle);
  postContainer.appendChild(postDescription);
  postContainer.appendChild(sellerName);
  postContainer.appendChild(postDate);
}