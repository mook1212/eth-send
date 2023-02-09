import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
// import { Transaction as Tx } from 'ethereumjs-tx';

const web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/v3/d7416d11bb9e43d4bc2ab73459ac88d6');

// ABI of TST token contract
const TST_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      },
      {
        "name": "_extraData",
        "type": "bytes"
      }
    ],
    "name": "approveAndCall",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  }
];

const TST_ADDRESS = '0xEeAf2AabDAa7326b617D8021e46A1D0C7373A031';
const ETH_ADDRESS = "0x722dd3f80bac40c951b51bdd28dd19d435762180";

// 이더리움 erc-20 token 보유량 조회 : tst버전
function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');

  useEffect(() => {
    async function getTokenData() {
      const contract = new web3.eth.Contract(TST_ABI, TST_ADDRESS);
      const balanceInWei = await contract.methods.balanceOf(address).call();
      const balanceInTst = balanceInWei / (10 ** 16);
      setBalance(balanceInTst);
    }
    if (address) {
      getTokenData();
    }
  }, [address]);

  return (

    <div>

      <h1>TST 조회</h1>
      <input
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <p>Your TST balance: {balance}</p>

      <SendToken></SendToken>
      <SendToken2></SendToken2>

    </div>

  );
}

const SendToken = () => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async () => {
    const privateKey = "0xf47e7c0766703edea7162fbc5cb51379e2c314ff615485da2815b3c35a314ee5";
    const fromAddress = "0x3da00E166f46426e0c6d13cDA54e93C0077391f6";

    const contract = new web3.eth.Contract(TST_ABI, TST_ADDRESS);
    const nonce = await web3.eth.getTransactionCount(fromAddress);
    const gasPrice = await web3.eth.getGasPrice();

    const data = contract.methods.transfer(toAddress, web3.utils.toWei(amount.toString(), 'ether')).encodeABI();

    const rawTransaction = {
      from: fromAddress, // 보내는 사람의 address
      to: TST_ADDRESS, // TST의 컨트렉트 주소를 거쳐가야함
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: 200000,
      value: 0,
      data: data
    };

    const transaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);

    await web3.eth.sendSignedTransaction(transaction.rawTransaction);
  };

  return (
    <div>
      <h1>TST 전송</h1>
      <input style={{ width: '400px' }} type="text" value={toAddress} onChange={e => setToAddress(e.target.value)} />
      <br></br>
      <br></br>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <br></br>
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};


const SendToken2 = () => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [commissionAddress, setCommissionAddress] = useState('0x3C6c748D2E61b0e71a0e219E0fEA944ADe8863D3');
  const [commissionPercentage, setCommissionPercentage] = useState(10);

  const handleSubmit = async () => {
    // 송신자 address
    const fromAddress = "0x3da00E166f46426e0c6d13cDA54e93C0077391f6";
    // 송신자 address의 개인키
    const privateKey = "0xf47e7c0766703edea7162fbc5cb51379e2c314ff615485da2815b3c35a314ee5";

    const contract = new web3.eth.Contract(TST_ABI, TST_ADDRESS);
    const nonce = await web3.eth.getTransactionCount(fromAddress);
    const gasPrice = await web3.eth.getGasPrice();

    const data = contract.methods.transfer(toAddress, web3.utils.toWei(amount.toString(), 'ether')).encodeABI();

    const rawTransaction = {
      from: fromAddress,
      to: TST_ADDRESS,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: 200000,
      value: 0,
      data: data
    };

    const transaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);

    await web3.eth.sendSignedTransaction(transaction.rawTransaction).then(async receipt => {
      console.log("TST transfer completed");
      const commissionAmount = (amount * commissionPercentage) / 100;

      // send the commission
      const data = contract.methods.transfer(commissionAddress, web3.utils.toWei(commissionAmount.toString(), 'ether')).encodeABI();
      const commissionTransaction = {
        from: fromAddress,
        to: TST_ADDRESS,
        nonce: nonce + 1, // increment the nonce
        gasPrice: gasPrice,
        gasLimit: 200000,
        value: 0,
        data: data
      };
      const signedCommissionTransaction = await web3.eth.accounts.signTransaction(commissionTransaction, privateKey);
      await web3.eth.sendSignedTransaction(signedCommissionTransaction.rawTransaction)
        .then(() => console.log("Commission success"))
        .catch(() => console.log("Commission failure"));
    }).catch(() => console.log("TST transfer failed"));
    
  };

  return (
    <div>
      <h1>TST Token Transfer</h1>
      <input style={{ width: '400px' }} type="text" value={toAddress} onChange={e => setToAddress(e.target.value)} />
      <br />
      <br />
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <br />
      <br />
      <input style={{ width: '400px' }} type="text" value={commissionAddress} onChange={e => setCommissionAddress(e.target.value)} />
      <br />
      <br />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};

export default App;

