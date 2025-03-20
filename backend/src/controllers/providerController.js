const { Provider } = require('../../models');
const { fetchProviderData } = require('../services/nppesService');

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