import * as storage from './key.js'
import { API_AUTH_LOGIN } from '../constants.js'
import { getProfile } from '../profile/read.js'

const method = 'POST'

export async function login(profile) {
    const loginURL = API_AUTH_LOGIN
    const body = JSON.stringify(profile)
    try {
        const response = await fetch(loginURL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method,
            body,
        })

        if (!response.ok) {
            throw new Error('Username or password is incorrect')
        }

        const jsonResponse = await response.json()
        const { accessToken, ...user } = jsonResponse.data

        storage.save('token', accessToken)

        try {
            const profile = await getProfile(user.name)
            storage.save('profile', profile)
            console.log('Fetched and Saved Profile Data:', profile)
        } catch (error) {
            console.error('Failed to fetch full profile:', error)
        }

        /* storage.save("profile", user); */

        location.reload()
    } catch (error) {
        alert('Wrong username or password')
    }
}
