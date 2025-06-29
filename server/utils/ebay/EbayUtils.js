const { json } = require('body-parser')
const EbayAuthToken = require('ebay-oauth-nodejs-client')
require('dotenv').config()

const EBAY_API_BROWSE_URL = process.env.EBAY_API_BROWSE_URL

const generateClientAccessToken = async () => {
    try {
        const ebayAuthToken = new EbayAuthToken({
            clientId: "JackMcCl-dealwatc-PRD-b471a0ddf-d3b0b60f",
            clientSecret: "PRD-471a0ddf9400-6b0d-48fb-800e-3d90",
            redirectUri: "Jack_McClure-JackMcCl-dealwa-sfags",
        })
        const environment = 'PRODUCTION'
        const scopes = ['https://api.ebay.com/oauth/api_scope']
        const response = await ebayAuthToken.getApplicationToken(environment, scopes)
        const data = await JSON.parse(response)
        return data['access_token']
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

const getListings = async (keyword, limit) => {
    const clientAccessToken = await generateClientAccessToken()
    const response = await fetch(`${EBAY_API_BROWSE_URL}/item_summary/search?q=${keyword}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${clientAccessToken}`
        }
    })
    return await response.json()
}


module.exports = { getListings }