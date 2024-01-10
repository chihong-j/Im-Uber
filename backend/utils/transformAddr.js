const axios = require('axios');

const subscriptionKey = process.env.AZURE_MAP_KEY;

const transformAddr = async (address) => {
    try {
        const url = 'https://atlas.microsoft.com/search/address/json';
        const params = {
            'subscription-key': subscriptionKey,
            'api-version': '1.0',
            'language': 'en-US',
            'query': address
        };
        const response = await axios.get(url, { params });
        return response.data.results[0].position;
    } catch (error) {
        return null;
    }
}

module.exports = transformAddr;



