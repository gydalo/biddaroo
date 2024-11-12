import { getPost } from "/src/js/api/post/index.js";

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
  postTitle.classList.add("font-h2", "pb-10", "text-lg");

  const postBody = document.createElement("p");
  postBody.textContent = postData.body;
  postBody.classList.add("pb-10", "font-p");

  const postAuthor = document.createElement("p");
  postAuthor.textContent = `Author: ${postData.author}`;
  postAuthor.classList.add("font-p", "text-tiny");

  const postDate = document.createElement("p");
  postDate.textContent = `Created on: ${new Date(
    postData.created
  ).toLocaleDateString()}`;
  postDate.classList.add("font-p", "text-tiny", "pb-10");

  if (postData.media && postData.media.url) {
    const postImage = document.createElement("img");
    postImage.setAttribute("src", postData.media.url);
    postImage.alt = `Image from ${postData.title}`;
    postImage.classList.add("pt-20", "pb-10", "max-w-4xl", "max-h-screen");
    postContainer.appendChild(postImage);
  }

  postContainer.appendChild(postTitle);
  postContainer.appendChild(postBody);
  postContainer.appendChild(postAuthor);
  postContainer.appendChild(postDate);
}
