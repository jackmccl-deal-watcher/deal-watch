const { json } = require('body-parser')
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const { validateStringInput, validateNumberInput } = require('../ValidateInput');
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

const getEbayListings = async (keyword, limit, category) => {
    try {
        validateStringInput(keyword, Object.keys(keyword)[0])
        validateNumberInput(limit, Object.keys(limit)[0])
        validateStringInput(category, Object.keys(category)[0])
        const clientAccessToken = await generateClientAccessToken()
        const response = await fetch(`${EBAY_API_BROWSE_URL}/item_summary/search?q=${keyword}&limit=${limit}&category_ids=${category}&fieldgroups=EXTENDED`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${clientAccessToken}`
            }
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

const getEbayItem = async (itemHref) => {
    try {
        validateStringInput(itemHref, Object.keys(itemHref)[0])
        const clientAccessToken = await generateClientAccessToken()
        const response = await fetch(itemHref, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${clientAccessToken}`
            }
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

const checkRateLimit = async (api) => {
    try {
        validateStringInput(api, Object.keys(api)[0])
        const clientAccessToken = await generateClientAccessToken()
        const response = await fetch(`https://api.ebay.com/developer/analytics/v1_beta/rate_limit/?api_name=${api}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${clientAccessToken}`
            }
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getEbayListings, getEbayItem, checkRateLimit }