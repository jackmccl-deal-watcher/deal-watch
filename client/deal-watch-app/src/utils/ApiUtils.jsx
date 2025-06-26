const API_URL = import.meta.env.VITE_API_URL

export const loginUser = async ({ username, password }) => {
    const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    })
    return await response.json()
}