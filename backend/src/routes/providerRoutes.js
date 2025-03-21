const express = require('express');
const { addProvider, verifyState, getVerifiedProvidersByState ,getProvidersByOrganizationAndState} = require('../controllers/providerController');
const router = express.Router();

router.post('/', addProvider);
router.post('/verify/:npiNumber', verifyState);
router.get('/state/:state', getVerifiedProvidersByState); // New Route
router.get('/search', getProvidersByOrganizationAndState);

module.exports = router;

