import { API_AUCTION_LISTINGS } from '../constants.js'
import { authFetch } from '../auth/key.js'

const method = 'put'

/**
 * Updates an auction post and shows success/error message.
 * @param {Object} postData - Must include `id` and other updated fields.
 * @returns {Promise<void>}
 */
export async function updatePost(postData) {
  const messageEl = document.getElementById('editMessage');
  messageEl.textContent = '';
  messageEl.className = '';

  if (!postData.id) {
    messageEl.textContent = 'Update failed: No post ID provided.';
    messageEl.classList.add('text-red-500', 'font-p', 'mt-4');
    return;
  }

  const updatePostURL = `${API_AUCTION_LISTINGS}/${postData.id}`;

  try {
    const response = await authFetch(updatePostURL, {
      method,
      body: JSON.stringify(postData),
    });

    const result = await response.json();

    if (!response.ok) {
      messageEl.textContent = result?.errors?.[0]?.message || 'Failed to update the post.';
      messageEl.classList.add('text-red-500', 'font-p', 'mt-4');
      return;
    }

    messageEl.textContent = 'Your auction has been updated!';
    messageEl.classList.add('text-green-500', 'font-p', 'mt-4');

    setTimeout(() => {
      window.location.href = '/biddaroo/index.html';
    }, 1500);
  } catch {
    messageEl.textContent = 'Something went wrong. Please try again later.';
    messageEl.classList.add('text-red-500', 'font-p', 'mt-4');
  }
}