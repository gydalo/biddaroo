export async function deletePost(id) {}

import { API_AUCTION_LISTINGS } from "../constants.js";
import { authFetch } from "../auth/key.js";


const method = "delete";

export async function removePost(id) {
    if (!id){
        throw new Error("Delete requires a post ID");
    }
    
    const deletePostURL = `${API_AUCTION_LISTINGS}/${id}`;

    const response = await authFetch(deletePostURL, {
        method
    })

    
    alert("You have deleted the post");

    window.location.href = "/index.html";


}


