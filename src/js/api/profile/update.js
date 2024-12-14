import { API_AUCTION_PROFILES } from '../constants.js'
import { authFetch, save } from '../auth/key.js'

export async function updateProfile(profileData) {
    if (!profileData.name) {
        throw new Error('Update requires a profile name')
    }

    const updateProfileURL = `${API_AUCTION_PROFILES}/${profileData.name}`

    console.log('Sending PUT request to:', updateProfileURL)
    console.log('Payload:', profileData)

    const response = await authFetch(updateProfileURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    })

    const responseData = await response.json()
    console.log('Response from server:', responseData)

    if (response.ok) {
        alert('Profile updated successfully!')
        save('profile', responseData)
    } else {
        alert('Failed to update the profile')
    }

    return responseData
}
