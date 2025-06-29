const { json } = require('body-parser')
const EbayAuthToken = require('ebay-oauth-nodejs-client')
require('dotenv').config()

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

module.exports = { generateClientAccessToken }