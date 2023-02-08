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


      <Send></Send>
      {/* <TransferTST></TransferTST> */}
      {/* <TransferToken></TransferToken> */}
      {/* <Routes>
        <Route></Route>
      </Routes> */}
    </div>

  );
}

// const handleSend = async () => {
//   const decimals = 16;
//   const walletAddress = "0xB5F2fdD744266b52F528Ffee50502f21Fc0DADbd";
//   const nonce = await web3.eth.getTransactionCount(walletAddress);
//   const data = TSTADDRESS.methods.transfer(document.getElementById('box1').value, amount * 10 ** decimals).encodeABI();
//   const gasPrice = (await web3.eth.getGasPrice()).toString();
//   const gasLimit = 500000;

function Send() {
  const TSTADDRESS = new web3.eth.Contract(TST_ABI, '0xEeAf2AabDAa7326b617D8021e46A1D0C7373A031');

  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSend = async () => {
    const decimals = 1;
    const walletAddress = "0xB5F2fdD744266b52F528Ffee50502f21Fc0DADbd";
    const nonce = await web3.eth.getTransactionCount(walletAddress);
    const data = TSTADDRESS.methods.transfer(document.getElementById('box1').value, amount * 10 ** decimals).encodeABI();
    const gasPrice = (await web3.eth.getGasPrice()).toString();
    const gasLimit = 500000;


    const rawTransaction = {
      nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      from: walletAddress,
      to: receiverAddress,
      value: '0',
      data: data,
    };

    const transaction = await web3.eth.sendTransaction(rawTransaction);
    console.log("Transaction:", transaction);
  };

  return (
    <div>
      <h1>TST 전송</h1>
      <input
        id='box1'
        type="text"
        style={{ width: '400px' }}
        onChange={(e) => setReceiverAddress(e.target.value)}
        placeholder="Receiver Address"
      />
      <br></br>
      <br></br>
      <input
        id='box2'
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

// const TSTADDRESS = '0xEeAf2AabDAa7326b617D8021e46A1D0C7373A031';
// const ABI = [{ "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
// const decimals = 1;
// const walletAddress = '0xB5F2fdD744266b52F528Ffee50502f21Fc0DADbd';
// const receiverAddress = document.getElementById('box1').value;
// const amount = document.getElementById('box2').value * 10 ** decimals;

// const handleSend = async () => {
//   const nonce = await axios.post('https://mainnet.infura.io/v3/{PROJECT_ID}', {
//     jsonrpc: '2.0',
//     method: 'eth_getTransactionCount',
//     params: [walletAddress, 'latest'],
//     id: 1
//   }).then(res => res.data.result);

//   const data = web3.eth.contract(ABI).at(TSTADDRESS).transfer.getData(receiverAddress, amount);
//   const gasPrice = (await axios.post('https://mainnet.infura.io/v3/{PROJECT_ID}', {
//     jsonrpc: '2.0',
//     method: 'eth_gasPrice',
//     params: [],
//     id: 1
//   })).data.result;
//   const gasLimit = 500000;

//   const rawTransaction = {
//     nonce: '0x' + nonce.toString(16),
//     gasPrice: '0x' + gasPrice.toString(16),
//     gasLimit: '0x' + gasLimit.toString(16),
//     to: TSTADDRESS,
//     value: '0x0',
//     data: data
//   };

//   const privateKey = Buffer.from('{PRIVATE_KEY}', 'hex');
//   const tx = new EthereumTx(rawTransaction);
//   tx.sign(privateKey);

//   const serializedTx = tx.serialize();

//   await axios.post('https://mainnet.infura.io/v3/{PROJECT_ID}', {
//     jsonrpc: '2.0',
//     method: 'eth_sendRawTransaction',
//     params: ['0x' + serializedTx.toString('hex'),
//       id: 1
// });
//   const { data } = response;
//   console.log(data);
// }

// sendRawTransaction();
// };

// return (

//   <div>
//     <input
//       id='box1'
//       type="text"
//       style={{ width: '400px' }}
//       onChange={(e) => setReceiverAddress(e.target.value)}
//       placeholder="Receiver Address"
//     />
//     <br></br>
//     <br></br>
//     <input
//       id='box2'
//       type="number"
//       value={amount}
//       onChange={(e) => setAmount(e.target.value)}
//       placeholder="Amount"
//     />
//     <button onClick={handleSend}>Send</button>
//   </div>
// );
// }


// const TransferTST = () => {
//   const [privateKey, setPrivateKey] = useState('');

//   const handlePrivateKeyChange = (e) => {
//     setPrivateKey(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const walletAddress = '0xB5F2fdD744266b52F528Ffee50502f21Fc0DADbd';
//     const nonce = await web3.eth.getTransactionCount(walletAddress);

//     const rawTransaction = {
//       nonce,
//       gasPrice: '20000000000',
//       gasLimit: '21000',
//       to: recipientAddress,
//       value: web3.utils.toHex(amountInWei),
//       data: contract.methods.transfer(recipientAddress, amountInTst).encodeABI(),
//     };

//     const transaction = new EthereumTx(rawTransaction);
//     transaction.sign(Buffer.from(privateKey, 'hex'));

//     web3.eth.sendSignedTransaction(`0x${transaction.serialize().toString('hex')}`)
//       .once('transactionHash', (hash) => {
//         console.log(`Transaction hash: ${hash}`);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={privateKey} onChange={handlePrivateKeyChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };



// const TransferToken = () => {
//   const [recipientAddress, setRecipientAddress] = useState('');
//   const [amount, setAmount] = useState('');


//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Connect to the Ethereum network using Web3
//     const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/d7416d11bb9e43d4bc2ab73459ac88d6'));

//     // Get the contract instance
//     const contract = new web3.eth.Contract(TST_ABI, TST_ADDRESS);

//     // Get the current account
//     // const accounts = await web3.eth.getAccounts();

//     const sender = '0xB5F2fdD744266b52F528Ffee50502f21Fc0DADbd';

//     // Transfer the tokens
//     contract.methods.transfer(recipientAddress, amount).send({ from: sender })

//       .on('transactionHash', (hash) => {
//         console.log(`Transaction hash: ${hash}`);
//       })
//       .on('confirmation', (confirmationNumber, receipt) => {
//         console.log(`Confirmation number: ${confirmationNumber}`);
//       })
//       .on('receipt', (receipt) => {
//         console.log(`Transaction receipt: ${receipt}`);
//       })
//       .on('error', (error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <>
//       <h1>TST 전송</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="recipientAddress">To:&nbsp;</label>
//           <input style={{ width: '400px' }} type="text" id="recipientAddress" value={recipientAddress} onChange={(event) => setRecipientAddress(event.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="amount">Amount: &nbsp;</label>
//           <input type="text" id="amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
//         </div>
//         <button type="submit">Go</button>
//       </form>
//     </>
//   );
// };



export default App;


// export default TransferToken;