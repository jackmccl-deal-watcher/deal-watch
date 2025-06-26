const API_URL = import.meta.env.VITE_API_URL

export const loginUser = async ({ username, password }) => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
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
            headers: { 'Content-Type': 'application/json' },
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
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
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}