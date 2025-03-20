// /**
//  * @swagger
//  * /api/providers:
//  *   post:
//  *     summary: Add a provider
//  *     description: Add provider with first name, last name, NPI number, and state.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               firstName:
//  *                 type: string
//  *               lastName:
//  *                 type: string
//  *               npiNumber:
//  *                 type: string
//  *               state:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Provider added successfully
//  *       500:
//  *         description: Error adding provider
//  */

// /**
//  * @swagger
//  * /api/providers/verify/{npiNumber}:
//  *   post:
//  *     summary: Verify state license
//  *     description: Verify the provider's state using NPPES API and check for a match.
//  *     parameters:
//  *       - in: path
//  *         name: npiNumber
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Provider NPI number
//  *     responses:
//  *       200:
//  *         description: State verification result
//  *       404:
//  *         description: Provider not found
//  *       500:
//  *         description: Error verifying state
//  */


// const express = require('express');
// const { addProvider, verifyState } = require('../controllers/providerController');
// const router = express.Router();

// router.post('/', addProvider);
// router.post('/verify/:npiNumber', verifyState);

// module.exports = router;

/**
 * @swagger
 * /api/providers:
 *   post:
 *     summary: Add a provider
 *     description: Add provider with first name, last name, NPI number, and state.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               npiNumber:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: Provider added successfully
 *       500:
 *         description: Error adding provider
 */

/**
 * @swagger
 * /api/providers/verify/{npiNumber}:
 *   post:
 *     summary: Verify state license
 *     description: Verify the provider's state using NPPES API and check for a match.
 *     parameters:
 *       - in: path
 *         name: npiNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider NPI number
 *     responses:
 *       200:
 *         description: State verification result
 *       404:
 *         description: Provider not found
 *       500:
 *         description: Error verifying state
 */

/**
 * @swagger
 * /api/providers/state/{state}:
 *   get:
 *     summary: Get verified providers by state
 *     description: Retrieve all verified providers in a specific state.
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: State to filter verified providers
 *     responses:
 *       200:
 *         description: List of verified providers
 *       404:
 *         description: No verified providers found
 *       500:
 *         description: Error fetching providers
 */

/**
 * @swagger
 * /api/providers/search:
 *   get:
 *     summary: Fetch providers by organization name and state
 *     description: Get a list of providers from the NPPES API by their organization name and state.
 *     parameters:
 *       - in: query
 *         name: organizationName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the organization
 *       - in: query
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: State abbreviation (e.g., IL, CA)
 *     responses:
 *       200:
 *         description: Providers fetched successfully
 *       400:
 *         description: Missing organization name or state
 *       404:
 *         description: No providers found
 *       500:
 *         description: Server error
 */


const express = require('express');
const { addProvider, verifyState, getVerifiedProvidersByState ,getProvidersByOrganizationAndState} = require('../controllers/providerController');
const router = express.Router();

router.post('/', addProvider);
router.post('/verify/:npiNumber', verifyState);
router.get('/state/:state', getVerifiedProvidersByState); // New Route
router.get('/search', getProvidersByOrganizationAndState);

module.exports = router;

