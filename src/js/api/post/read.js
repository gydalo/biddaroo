import { API_AUCTION_LISTINGS } from "../constants.js";
import { authFetch } from "../auth/key.js";

export async function getPosts() {
    const updatePostURL = `${API_AUCTION_LISTINGS}?_seller=true&_bids=true`;

    try {
        const response = await authFetch(updatePostURL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}

export async function getPost(id) {
    if (!id){
        throw new Error("Get post requires a post ID");
    }

    const getPostURL = `${API_AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`;

    const response = await authFetch(getPostURL, {
        
    })

    const result = await response.json();
    const post = result.data;
    return post;

}

