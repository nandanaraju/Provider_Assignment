const axios = require('axios');

exports.fetchProviderData = async (npiNumber) => {
  try {
    const response = await axios.get(`https://npiregistry.cms.hhs.gov/api/?number=${npiNumber}&version=2.1`);
    const result = response.data.results?.[0];

    if (!result) {
      console.error('No data found for NPI:', npiNumber);
      return null;
    }

    return {
      name: result.basic?.name,
      addresses: result.addresses || [],
    };
  } catch (error) {
    console.error('Error fetching NPPES data:', error.message);
    return null;
  }
};
