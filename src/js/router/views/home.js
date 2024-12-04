import { isLoggedIn } from "../../api/auth/key.js";
import { getPosts } from "../../api/post/read.js";


// For showing either login or register on homepage:
document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("loginForm");
    const formCreateAcc = document.getElementById("registerForm");
    const loggedOutHeading = document.getElementById("loggedOutHeading");

    const loggedInProfileButton = document.getElementById("loggedInProfileButton");
    const loggedInCreateButton = document.getElementById("loggedInCreateButton");
    const loggedInHeading = document.getElementById("loggedInHeading");
  
    if (isLoggedIn()) {
        hide(formLogin);
        hide(formCreateAcc);
        hide(loggedOutHeading);
        
        show(loggedInProfileButton);
        show(loggedInCreateButton);
        show(loggedInHeading);
    } else {
    document.addEventListener("click", function (e) {
      if (e.target.id === "linkRegisterForm") {
        e.preventDefault();
        toggleForms(formLogin, formCreateAcc);
      } else if (e.target.id === "linkLogin") {
        e.preventDefault();
        toggleForms(formCreateAcc, formLogin);
      }
    });
}
  
    function toggleForms(formToHide, formToShow) {
        hide(formToHide);
        show(formToShow);
    }

    function hide(elem) {
        elem.classList.add("form--hidden");
        elem.classList.remove("form--unhidden");
    }

    function show(elem) {
        elem.classList.add("form--unhidden");
        elem.classList.remove("form--hidden");
    }
  });

let currentIndex = 0;

async function loadPosts() {
  const postContainer = document.getElementById('post-container');
  const searchBar = document.getElementById('searchInput');
  const posts = await getPosts();

  const postList = posts.data || posts;

   const activePosts = postList.filter(post => {
    const endsAtDate = new Date(post.endsAt);
    const currentDate = new Date();
    return endsAtDate > currentDate;
  });

  let filteredPosts = activePosts;

  if (activePosts.length > 0) {
    const sortedPosts = activePosts.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

    renderFilteredPosts(sortedPosts, postContainer);

  searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPosts = sortedPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      (post.seller?.name && post.seller.name.toLowerCase().includes(searchTerm))
  );

    postContainer.innerHTML = '';
    renderFilteredPosts(filteredPosts, postContainer);
});

function renderFilteredPosts(posts, container) {
  if (posts.length > 0) {
      posts.forEach(post => {
          const postElement = postTemplate(post);
          container.appendChild(postElement);
      });
  } else {
      container.innerHTML = '<p>No posts match your search.</p>';
  }
}

    const loadMoreButton = document.getElementById("load-more");
    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", () => {
        loadNextPosts(sortedPosts, postContainer);
      });
    }
  } else {
    postContainer.innerHTML = '<p>No active posts found.</p>';
  }
}

function loadNextPosts(sortedPosts, postContainer) {
  const nextPosts = getNextPosts(sortedPosts, currentIndex);
  
  if (nextPosts.length === 0) {
    const loadMoreButton = document.getElementById("load-more");
    loadMoreButton.disabled = true; 
    loadMoreButton.innerText = "No more posts available"; 
    return;
  }

  renderPostTemplates(nextPosts, postContainer);
  currentIndex += nextPosts.length;
}

function getNextPosts(posts, startIndex) {
  return posts.slice(startIndex, startIndex + 12);
}

document.addEventListener("DOMContentLoaded", loadPosts);



export function postTemplateA(postData) {
    return `<div class="post" id=${postData.id}>${postData.title}</div>`;
}

export function postTemplate(postData) {
    const post = document.createElement("div");
    post.classList.add("post");

    const postTitle = document.createElement('h2');
    postTitle.textContent = postData.title;
    post.append(postTitle);

    if (postData.media && postData.media.length > 0) {
      const postImage = document.createElement("img");
  
      postImage.setAttribute("src", postData.media[0].url);
      postImage.alt = `Image from ${postData.title}`;
  
      post.appendChild(postImage);
    } else {
      console.log("No media available for this post.");
    }

    /* REMEMBER TO ADD /BIDDAROO */

    post.addEventListener("click", () => {
        const targetUrl = /*add /biddaroo/ for the github version*/`/biddaroo/post/index.html?id=${postData.id}`;
        window.location.href = targetUrl;
    });

    const sellerName = document.createElement("p");
    sellerName.textContent = `Seller: ${postData.seller?.name}`;
    post.append(sellerName);

    const auctionDate = document.createElement('p');
    auctionDate.textContent = `Created on: ${new Date(
    postData.created
  ).toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}`;

  const auctionEnds = document.createElement('p');
  auctionEnds.textContent = `Auction ends ${new Date(
    postData.endsAt
  ).toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}`;




    post.append(auctionDate, auctionEnds);

    return post;
}


export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate));
}
