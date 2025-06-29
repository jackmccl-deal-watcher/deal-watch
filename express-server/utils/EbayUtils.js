const getListings = async (query) => {
    try {
        key = 'JackMcCl-dealwatc-PRD-b471a0ddf-d3b0b60f'
        secret = 'PRD-471a0ddf9400-6b0d-48fb-800e-3d90'
        creds = `${key}:${secret}`
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