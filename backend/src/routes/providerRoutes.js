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


const express = require('express');
const { addProvider, verifyState } = require('../controllers/providerController');
const router = express.Router();

router.post('/', addProvider);
router.post('/verify/:npiNumber', verifyState);

module.exports = router;
