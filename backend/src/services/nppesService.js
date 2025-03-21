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

/**
 * Fetch providers by organization name and state using NPPES API
 * @param {string} organizationName - Name of the organization
 * @param {string} state - State abbreviation (e.g., IL, NY)
 * @returns {Promise<Array|Null>} - List of providers or null if not found
 */
exports.fetchProvidersByOrganizationAndState = async (organizationName, state) => {
  try {
    const url = `https://npiregistry.cms.hhs.gov/api/?organization_name=${encodeURIComponent(organizationName)}&state=${state}&version=2.1`;
    const response = await axios.get(url);

    const results = response.data.results;

    if (!results || results.length === 0) {
      console.error(`No providers found for organization: ${organizationName} in state: ${state}`);
      return null;
    }

    return results.map((provider) => ({
      npiNumber: provider.number,
      name: provider.basic?.organization_name || `${provider.basic?.first_name || ''} ${provider.basic?.last_name || ''}`.trim() || 'Unknown',
      state: provider.addresses?.[0]?.state || 'Unknown',
      address: provider.addresses?.[0] || {},
    }));
  } catch (error) {
    console.error('Error fetching providers:', error.message);
    return null;
  }
};

exports.fetchProvidersByTaxonomyAndState = async (taxonomy, state) => {
  try {
    const apiUrl = `https://npiregistry.cms.hhs.gov/api/?taxonomy_description=${encodeURIComponent(taxonomy)}&state=${state}&version=2.1`;
    const response = await axios.get(apiUrl);

    if (!response.data.results || response.data.results.length === 0) {
      return { message: `No providers found for taxonomy: ${taxonomy} in state: ${state}` };
    }

    const providers = response.data.results.map((provider) => ({
      npiNumber: provider.number,
      name: provider.basic?.organization_name || provider.basic?.name || 'Unknown',
      state: provider.addresses?.[0]?.state || 'Unknown',
      address: provider.addresses?.[0] || {},
    }));

    return { providers };
  } catch (error) {
    console.error('Error fetching providers:', error.message);
    return { error: 'Failed to fetch providers' };
  }
};