const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }))
const path = require('path');


const Bitcore = require('bitcore-lib');
const qr = require('qr-image');

const crypto = require('crypto');
const ethers = require('ethers');
const ethSigUtil = require('eth-sig-util');
// const EthereumQRPlugin = require("ethereum-qr-code");

app.use(express.json());
var cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb+srv://skdo223:apsode1@cluster0.udjmfja.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) {
    if (에러) return console.log(에러)
    db = client.db('todoapp');



    app.listen(8080, function () {
        console.log('listening on 8080')

    });
});

// // 비트코인 지갑 생성 후 해당 adress의 QR코드 생성
// const privateKey = Bitcore.PrivateKey();

// // Derive the corresponding public key
// const publicKey = Bitcore.PublicKey(privateKey);

// // Derive the corresponding address from the public key
// const address = Bitcore.Address(publicKey, Bitcore.Networks.livenet);

// const qrCodeImage = qr.imageSync(address.toString(), { type: 'png' });

// // Save the QR code image to a file
// require('fs').writeFileSync('address.png', qrCodeImage);

// console.log(address.toString());


// 이더리움 지갑 생성 후 해당 adress의 QR코드 생성
// Generate a random private key
const wallet = ethers.Wallet.createRandom();
console.log(wallet);
console.log(wallet.address);
console.log("Private Key:", wallet.privateKey);

// const ehtqrCodeImage = qr.imageSync(wallet.address.toString(), { type: 'png' });
// require('fs').writeFileSync('ethaddress.png', ehtqrCodeImage);




app.get('/test', (req, res) => {
    res.send('hello')
})

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '../build/index.html'));
});