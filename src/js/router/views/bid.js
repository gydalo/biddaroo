import { authFetch } from "../../api/auth/key.js";
import { API_AUCTION_LISTINGS } from "../../api/constants.js";
import { load } from "../../api/auth/key.js";

export async function placeBid(id, amount) {
    const createBiddingURL = `${API_AUCTION_LISTINGS}/${id}/bids`;

  try {
    const response = await authFetch(createBiddingURL, {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error(`Failed to place bid: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Bid placed successfully:", data);
    return data;
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}

export async function fetchUserProfile() {
    const userProfile = load("profile");
    return userProfile?.data || null;
  }
  