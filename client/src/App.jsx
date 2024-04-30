import React, { useState } from 'react';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install Metamask to use this feature');
    }
  };

  window.addEventListener('load', async () => {
    if (window.ethereum) {
      setIsMetamaskInstalled(true);
    } else {
      alert('Metamask is not installed. Please install Metamask to use this feature');
    }
  });

  return (
    <div className="App">
      <h1>Connect Metamask</h1>
      {isMetamaskInstalled ? (
        <>
          {userAddress ? (
            <p>Your address: {userAddress}</p>
          ) : (
            <button onClick={connectToMetamask}>Connect Metamask</button>
          )}
        </>
      ) : (
        <p>Please install Metamask to use this feature</p>
      )}
    </div>
  );
}

export default App;
