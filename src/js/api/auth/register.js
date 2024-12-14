import { API_AUTH_REGISTER } from '../constants.js'

const method = 'post'

export async function register(profile) {
    const registerURL = API_AUTH_REGISTER
    const body = JSON.stringify(profile)

    const response = await fetch(registerURL, {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        body,
    })

    const result = await response.json()
    if (!response.ok) {
        alert('An account with this username or email already exists.')
    } else {
      alert('You are now registered.')
    }
    console.log(result)
}
