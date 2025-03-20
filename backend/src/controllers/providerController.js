// const { Provider } = require('../../models');
// const { fetchProviderData } = require('../services/nppesService');

// exports.addProvider = async (req, res) => {
//     try {
//       const { firstName, lastName, npiNumber, state } = req.body;
  
//       if (!firstName || !lastName || !npiNumber || !state) {
//         return res.status(400).json({ error: 'All fields are required' });
//       }
  
//       const newProvider = await Provider.create({
//         firstName,
//         lastName,
//         npiNumber,
//         state,
//       });
  
//       res.status(201).json({ message: 'Provider added successfully', provider: newProvider });
//     } catch (error) {
//       console.error('Error adding provider:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
// exports.verifyState = async (req, res) => {
//   const { npiNumber } = req.params;

//   try {
//     const provider = await Provider.findOne({ where: { npiNumber } });

//     if (!provider) {
//       return res.status(404).json({ error: 'Provider not found' });
//     }

//     const nppesData = await fetchProviderData(npiNumber);

//     if (!nppesData) {
//       return res.status(500).json({ error: 'Failed to fetch NPPES data' });
//     }

//     const nppesState = nppesData.addresses?.[0]?.state || 'Unknown';
//     const isMatch = provider.state.toUpperCase() === nppesState.toUpperCase();

//     return res.json({
//       npiNumber,
//       providerState: provider.state,
//       nppesState,
//       status: isMatch ? 'Match' : 'Mismatch',
//     });
//   } catch (error) {
//     console.error('Error verifying state:', error);
//     return res.status(500).json({ error: 'State verification failed' });
//   }
// };
const { Provider } = require('../../models');
const { fetchProviderData,fetchProvidersByOrganizationAndState } = require('../services/nppesService');

exports.addProvider = async (req, res) => {
    try {
      const { firstName, lastName, npiNumber, state } = req.body;
  
      if (!firstName || !lastName || !npiNumber || !state) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const newProvider = await Provider.create({
        firstName,
        lastName,
        npiNumber,
        state,
      });
  
      res.status(201).json({ message: 'Provider added successfully', provider: newProvider });
    } catch (error) {
      console.error('Error adding provider:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.verifyState = async (req, res) => {
  const { npiNumber } = req.params;

  try {
    const provider = await Provider.findOne({ where: { npiNumber } });

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const nppesData = await fetchProviderData(npiNumber);

    if (!nppesData) {
      return res.status(500).json({ error: 'Failed to fetch NPPES data' });
    }

    const nppesState = nppesData.addresses?.[0]?.state || 'Unknown';
    const isMatch = provider.state.toUpperCase() === nppesState.toUpperCase();

    // Update the verified status
    await provider.update({ verified: isMatch });

    return res.json({
      npiNumber,
      providerState: provider.state,
      nppesState,
      status: isMatch ? 'Match' : 'Mismatch',
    });
  } catch (error) {
    console.error('Error verifying state:', error);
    return res.status(500).json({ error: 'State verification failed' });
  }
};


exports.getVerifiedProvidersByState = async (req, res) => {
  const { state } = req.params;

  try {
    const verifiedProviders = await Provider.findAll({ 
      where: { state, verified: true } 
    });

    if (!verifiedProviders.length) {
      return res.status(404).json({ message: 'No verified providers found in this state' });
    }

    return res.json({ providers: verifiedProviders });
  } catch (error) {
    console.error('Error fetching verified providers:', error);
    return res.status(500).json({ error: 'Failed to fetch verified providers' });
  }
};


/**
 * Controller to get providers by organization and state
 */
exports.getProvidersByOrganizationAndState = async (req, res) => {
  const { organizationName, state } = req.query;

  if (!organizationName || !state) {
    return res.status(400).json({ error: 'Both organization name and state are required' });
  }

  try {
    const providers = await fetchProvidersByOrganizationAndState(organizationName, state);

    if (!providers) {
      return res.status(404).json({ error: 'No providers found' });
    }

    res.status(200).json({ providers });
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
};
