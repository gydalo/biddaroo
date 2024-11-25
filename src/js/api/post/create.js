import { API_AUCTION_LISTINGS } from "../constants.js";
import { authFetch } from "../auth/key.js";


const method = "POST";

export async function createPost(postData) {
    const createListingURL = API_AUCTION_LISTINGS;

    const response = await authFetch(createListingURL, {
        method,
        body: JSON.stringify(postData)
    })
    
    if (response.ok) {
        alert("Post created successfully!");
        // Change to /Biddaroo/ for github
       window.location.href = "/biddaroo/index.html";
    } else {
        alert("Failed to create the listing");
    }
    return await response.json();


}
