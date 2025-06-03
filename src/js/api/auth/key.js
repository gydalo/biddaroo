// Auth key save in storage

export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function load(key) {
    try {
        const value = localStorage.getItem(key)
        return JSON.parse(value)
    } catch {
        return null
    }
}

export function remove(key) {
    localStorage.removeItem(key)
}

// Auth key
export function headers() {
    const token = load('token')

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': 'a36f85a1-c383-4052-9c00-91d69a08dd17',
    }
}

export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers(),
    })
}

export function isLoggedIn() {
    const token = load('token')
    return !!token
}
