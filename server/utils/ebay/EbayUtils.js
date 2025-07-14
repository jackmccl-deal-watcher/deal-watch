const { json } = require('body-parser')
const EbayAuthToken = require('ebay-oauth-nodejs-client')
require('dotenv').config({
    path: `${__dirname}/../../.env`
})

const EBAY_API_BROWSE_URL = process.env.EBAY_API_BROWSE_URL
const generateClientAccessToken = async () => {
    try {
        const ebayAuthToken = new EbayAuthToken({
            clientId: process.env.EBAY_CLIENT_ID,
            clientSecret: process.env.EBAY_CLIENT_SECRET,
            redirectUri: process.env.EBAY_REDIRECT_URL,
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
    const response = await fetch(`${EBAY_API_BROWSE_URL}/item_summary/search?q=${keyword}&limit=${limit}&category_ids=58058`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${clientAccessToken}`
        }
    })
    return await response.json()
}

module.exports = { getListings }