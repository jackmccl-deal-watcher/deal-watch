const API_URL = import.meta.env.VITE_API_URL

export const loginUser = async ({ username, password }) => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const signupUser = async ({ username, password }) => {
    try {
        const response = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_URL}/user/logout`, {
            method: 'POST',
            credentials: 'include',
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const checkUser = async () => {
    try {
        const response = await fetch(`${API_URL}/user/me`, {
            method: 'GET',
            credentials: 'include',
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}