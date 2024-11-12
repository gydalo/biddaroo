import { authGuard } from "/src/js/utilities/authGuard.js";
import { getPosts } from "/src/js/api/post/index.js";



https://norofffeu.github.io/src/js/router/views/src/js/utilities/authGuard.js

authGuard();

// https://www.youtube.com/watch?v=rLAGHFr8bvU&t=2306s


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

    const postTitle = document.createElement('h1');
    postTitle.textContent = postData.title;
    postTitle.classList.add(
        "font-h2",
        "pb-5"
    );
    post.append(postTitle);

    if (postData.media) {
        const img = document.createElement('img');
        img.setAttribute("src", postData.media.url);
        img.alt = `Image from ${postData.title}`;
        img.classList.add(
            "size-80",
            "object-cover",
            "hover:cursor-pointer",
            "hover:opacity-60"
        )
        post.append(img);
        
  } else {
        const postImgPlaceholder = document.createElement('img');
        postImgPlaceholder.setAttribute("src", "https://i.postimg.cc/JzqHnfnV/Skjermbilde-11.png");
        postImgPlaceholder.alt = `Image not provided`;
        postImgPlaceholder.classList.add(
            "size-80",
            "object-cover",
            "hover:cursor-pointer",
            "hover:opacity-60"
        );

        post.append(postImgPlaceholder);

    }


    post.addEventListener("click", () => {
        const targetUrl = `/post/index.html?id=${postData.id}`;
        console.log(`Navigating to: ${targetUrl}`);
        window.location.href = targetUrl;
    });

    const postAuthor = document.createElement('p');
    postAuthor.textContent = `Author: ${postData.author}`;
    postAuthor.classList.add(
        "text-tiny",
        "font-p",
        "pt-5"
    );
    post.append(postAuthor);

    const postDate = document.createElement('p');
    postDate.textContent = `Created on: ${new Date(postData.created).toLocaleDateString()} at ${new Date(postData.created).toLocaleTimeString()}`;
    postDate.classList.add(
        "text-tiny",
        "font-p",
        "pb-10"
    );
    post.append(postDate);

    return post;
}


export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate));
}

