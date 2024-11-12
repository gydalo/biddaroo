export async function deletePost(id) {}

import { API_SOCIAL_POSTS } from "/src/js/api/constants.js";
import { authFetch } from "/src/js/api/auth/key.js";


// From https://www.youtube.com/watch?v=rLAGHFr8bvU&t=2306s

const method = "delete";

export async function removePost(id) {
    if (!id){
        throw new Error("Delete requires a post ID");
    }
    
    const deletePostURL = `${API_SOCIAL_POSTS}/${id}`;

    const response = await authFetch(deletePostURL, {
        method
    })

    
    alert("You have deleted the post");

    window.location.href = "/index.html";


}


