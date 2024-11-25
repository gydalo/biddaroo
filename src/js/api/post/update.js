//export async function updatePost(id, { title, body, tags, media }) {}

import { API_AUCTION_LISTINGS } from "../constants.js";
import { authFetch } from "../auth/key.js";

const method = "put";

export async function updatePost(postData) {
    if (!postData.id){
        throw new Error("Update requires a post ID");
    }

    const updatePostURL = `${API_AUCTION_LISTINGS}/${postData.id}`;

    const response = await authFetch(updatePostURL, {
        method,
        body:JSON.stringify(postData)
    })

    if (response.ok) {
        alert("Post updated successfully!");
        window.location.href = "/index.html";
    } else {
        alert("Failed to update the post");
    }

    return await response.json();
}

