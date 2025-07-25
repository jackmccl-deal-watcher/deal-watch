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

export const evaluatePart = async (part) => {
    try {
        const response = await fetch(`${API_URL}/parts/evaluate_part`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(part),
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const generateBuilds = async (user_allocations) => {
    try {
        const response = await fetch(`${API_URL}/builds/generate_builds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user_allocations),
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const saveBuild = async (build) => {
    try {
        const response = await fetch(`${API_URL}/builds/save_build`, {
            method: 'POST',
            body: JSON.stringify(build),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const unSaveBuild = async (build) => {
    try {
        const response = await fetch(`${API_URL}/builds/unsave_build`, {
            method: 'POST',
            body: JSON.stringify(build),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const fetchSavedBuilds = async () => {
    try {
        const response = await fetch(`${API_URL}/builds/saved_builds`, {
            method: 'GET',
            credentials: 'include',
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const fetchDeals = async (min_budget, max_budget) => {
    console.log(min_budget)
    console.log(max_budget)
    try {
        const response = await fetch(`${API_URL}/deal-watch/display-deals?min_budget=${min_budget}&max_budget=${max_budget}`, {
            method: 'GET',
            credentials: 'include',
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}