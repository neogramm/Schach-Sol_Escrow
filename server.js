const express = require('express');
const { Connection, clusterApiUrl, Keypair, Transaction, SystemProgram } = require('@solana/web3.js');

const app = express();
const port = 3000;

// Solana connection setup
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Placeholder for your escrow account's keypair (in production, this should be a secure account)
const escrowAccount = Keypair.generate();

// Endpoint to check the wallet balance
app.get('/balance/:address', async (req, res) => {
    const publicKey = new PublicKey(req.params.address);
    const balance = await connection.getBalance(publicKey);
    res.send({ balance });
});

// Endpoint to initiate the transfer to the escrow
app.post('/transfer/:amount', async (req, res) => {
    const { amount } = req.params;
    // Logic to handle transfer to escrow account
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: userPublicKey,
            toPubkey: escrowAccount.publicKey,
            lamports: amount * 1e9 // Convert SOL to lamports (1 SOL = 10^9 lamports)
        })
    );

    // Sign and send the transaction...
    // This part is simplified for the example
    res.send({ message: 'Transfer initiated' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
