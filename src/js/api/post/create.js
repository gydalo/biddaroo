import { API_AUCTION_LISTINGS } from '../constants.js'
import { authFetch } from '../auth/key.js'

const method = 'POST'

/**
 * Creates a new auction post and shows success/error message.
 * @param {Object} postData - The auction post data to send.
 * @returns {Promise<void>}
 */
export async function createPost(postData) {
    const createListingURL = API_AUCTION_LISTINGS
    const messageEl = document.getElementById('createMessage')

    messageEl.textContent = '' // Clear previous messages
    messageEl.className = '' // Reset styling

    try {
        const response = await authFetch(createListingURL, {
            method,
            body: JSON.stringify(postData),
        })

        const result = await response.json()

        if (!response.ok) {
            messageEl.textContent =
                result?.errors?.[0]?.message || 'Failed to create the listing.'
            messageEl.classList.add('text-red-500', 'font-p', 'mt-4')
            return
        }

        messageEl.textContent = 'Your auction has been created!'
        messageEl.classList.add('text-green-500', 'font-p', 'mt-4')

        setTimeout(() => {
            window.location.href = '/biddaroo/index.html'
        }, 1500)
    } catch {
        messageEl.textContent = 'Something went wrong. Please try again later.'
        messageEl.classList.add('text-red-500', 'font-p', 'mt-4')
    }
}
