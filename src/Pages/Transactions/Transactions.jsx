// import { Transaction } from '@thirdweb-dev/sdk/dist/declarations/src/evm/core/classes/transactions';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

function Transaction() {
  const [web3, setWeb3] = useState(null);
  const [accountAddress, setAccountAddress] = useState('0x14093F94E3D9E59D1519A9ca6aA207f88005918c'); // Replace with the desired Ethereum address
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function connectToWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
        } catch (error) {
          console.error(error);
        }
      }
    }
    connectToWeb3();
  }, []);

  async function fetchTransactionHistory() {
    if (!web3) return;

    try {
      const blockNumber = await web3.eth.getBlockNumber();
      const history = [];

      for (let i = 0; i <= blockNumber; i++) {
        const block = await web3.eth.getBlock(i, true);

        if (block && block.transactions) {
          const relevantTransactions = block.transactions.filter(
            (tx) =>
              tx.from.toLowerCase() === accountAddress.toLowerCase() ||
              tx.to.toLowerCase() === accountAddress.toLowerCase()
          );

          history.push(...relevantTransactions);
        }
      }

      setTransactions(history);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTransactionHistory();
  }, [web3, accountAddress]);

  return (
    <div className="App">
      <h1>Ethereum Transaction History</h1>
      <p>Account Address: {accountAddress}</p>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            <strong>Transaction Hash:</strong> {tx.hash}
            <br /> 
            <strong>From:</strong> {tx.from}
            <br />
            <strong>To:</strong> {tx.to}
            <br />
            <strong>Value:</strong> {web3.utils.fromWei(tx.value, 'ether')} Ether
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transaction;
