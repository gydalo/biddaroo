import { isLoggedIn } from "../../api/auth/key.js";
import { getPosts } from "../../api/post/read.js";


// For showing either login or register on homepage:
document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("loginForm");
    const formCreateAcc = document.getElementById("registerForm");

    const loggedInButton = document.getElementById("loggedInButton");
    const loggedInHeading = document.getElementById("loggedInHeading");
  
    if (isLoggedIn()) {
        hide(formLogin);
        hide(formCreateAcc);
        
        show(loggedInButton);
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

  



  // Load posts test
  async function loadPosts() {
    const postContainer = document.getElementById('post-container');
    
    const posts = await getPosts();

    console.log("Fetched posts:", posts);

    const postList = posts.data || posts;

   
    if (Array.isArray(postList) && postList.length > 0) {
        const sortedPosts = postList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const last12Posts = getLast12Posts(sortedPosts); 

        console.log("Last 12 posts:", last12Posts); 

       
        renderPostTemplates(last12Posts, postContainer);
    } else {
        postContainer.innerHTML = '<p>No posts found.</p>'; 
    }
}

function getLast12Posts(posts) {
    return posts.slice(0, 12);
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

    if (postData.media) {
        const img = document.createElement('img');
        img.setAttribute("src", postData.media.url);
        img.alt = `Image from ${postData.title}`;
        post.append(img);
        
  } else {
        const postImgPlaceholder = document.createElement('img');
        postImgPlaceholder.setAttribute("src");
        postImgPlaceholder.alt = `Image not provided`;

        post.append(postImgPlaceholder);

    }


    post.addEventListener("click", () => {
        const targetUrl = `/biddaroo/post/index.html?id=${postData.id}`;
        console.log(`Navigating to: ${targetUrl}`);
        window.location.href = targetUrl;
    });

    const postAuthor = document.createElement('p');
    postAuthor.textContent = `Author: ${postData.author}`;
    post.append(postAuthor);

    const postDate = document.createElement('p');
    postDate.textContent = `Created on: ${new Date(postData.created).toLocaleDateString()} at ${new Date(postData.created).toLocaleTimeString()}`;
    
    post.append(postDate);

    return post;
}


export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate));
}

