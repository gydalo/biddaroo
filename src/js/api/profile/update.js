import { API_AUCTION_PROFILES } from '../constants.js'
import { authFetch, save } from '../auth/key.js'

/**
 * Updates the profile using authenticated fetch.
 * @param {Object} profileData - The updated profile data.
 * @returns {Object} An object with `success` and `data` or `message`.
 */
export async function updateProfile(profileData) {
    if (!profileData.name) {
        return {
            success: false,
            message: 'Update requires a profile name.',
        }
    }

    const updateProfileURL = `${API_AUCTION_PROFILES}/${profileData.name}`

    try {
        const response = await authFetch(updateProfileURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        })

        const result = await response.json()

        if (response.ok) {
            save('profile', result)
            return {
                success: true,
                data: result,
            }
        } else {
            return {
                success: false,
                message:
                    result?.errors?.[0]?.message || 'Failed to update profile.',
            }
        }
    } catch {
        return {
            success: false,
            message: 'Something went wrong while updating profile.',
        }
    }
}
