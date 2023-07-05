
import './App.css';
import {useState,useEffect} from 'react';
import React from 'react';
import Header from './Header';
import Content from './Content';

import 'rsuite/dist/rsuite.min.css';
import { ChakraProvider,Button} from '@chakra-ui/react'
import { Navbar, Nav } from 'rsuite';
const Web3 = require('web3');
const CoffeeShopABI = require('./abis/CoffeeShop.json');
const CoffeeTokenABI = require('./abis/CoffeeToken.json');
const {ethereum} = window;


function App() {
  const [currentAddress, setCurrentAddress] = useState('');
  const [shopContract,setShopContract] = useState({});
  const [tokenContract,setTokenContract] = useState({});
  const [owner,setOwner] = useState('');
  const [isConnect,setConnected] = useState(0);
  const[itemids,setitemids] = useState([]);
  const [allItems, setallItems] = useState([]);
  const [accbal,setaccbal]= useState(0);
  const web3 = new Web3(window.ethereum);

  function showLoading(){
    document.getElementById('text1').innerHTML = "Loading ...";
  }
  function hideLoading(){
    document.getElementById('text1').innerHTML = "Successful txn";
  }
  function showSuccessMessage(text2){
    alert("SUCCESS", text2);
  }
  function showErrorMessage(text1){
    alert(text1);
  }

  const handleDisconnect = (accounts) => {
    if (accounts.length === 0) {
      setCurrentAddress("");
      setConnected(0);
    } else {
      setCurrentAddress(accounts[0]);
      setConnected(1);
      getAccountBalance();
    }
    window.location.reload();
  };

  const handleChainChanged = (chainId) => {
    // If the chain is changed to goerli network, don<t do anything.
    if (chainId === `0x${Number(11155111).toString(16)}`) return; // chain id is received in hexadecimal

    // chain is changed to any other network, reload the page.
    // On reload, checkConnection will run due to useEffect.
    // Inside of that function, we are asking user to switch to goerli network.
    window.location.reload();
  };

  const getContract = async()=>{
    if(ethereum){
      const CoffeeShopAddress = '0x383f96CE91Cfb3eBa91a72b0a04fdcE2D58C74FF';
      const CoffeeTokenAddress = '0x24C5d7325618383BF91B40591701B0F9781d63AE';
      const cs = new web3.eth.Contract(CoffeeShopABI.abi,CoffeeShopAddress);
      const ct = new web3.eth.Contract(CoffeeTokenABI.abi,CoffeeTokenAddress);
    
      setShopContract(cs);
      setTokenContract(ct);

      setOwner(await cs.methods.getContractOwner());

      const fetchData = async () => {
      const ids = await cs.methods.getItemIds().call();
      const itemsArray = await Promise.all(ids.map(async (id) => {
          const itemData = await cs.methods.getItemInfo(id).call();
          return { id, ...itemData };
      }));

      setallItems(itemsArray);
      setitemids(ids);
      console.log(ids);
    }
    fetchData();
    await getAccountBalance();
    }
  };

  const checkConnection = async ()=>{
      try{
        await window.ethereum.request({
          method:"wallet_switchEthereumChain",
          params:[{ chainId: `0x${Number(11155111).toString(16)}` }],
          jsonrpc: '2.0',
        });
      } catch(error){
        console.log(error);
        // If there was error switching, code 4902 represents that goerli network is not added to metamask, so method below will pre-fill the network details and ask user to add the network.
        // if (error.code === 4902) {
        //   addNetwork();
        // }
        if (error.code === -32002) {
          alert("Open Metamask");
        }
      }
      await getContract();
      await getAccountBalance();
    // } catch(error){
    //   console.log(error);
    };

  const walletConnect = async()=>{
    try {
        if (ethereum){
  
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAddress(accounts[0]);
        setConnected(1);
      }
      } catch (error) {
        console.log(error);
      }
      await getAccountBalance();
      console.log("Current Address: ",currentAddress);
    }

    function trimAddr(addr){
      if(addr!= null){
      let addr1 = addr.toUpperCase();
      return ("✅"+addr1.substring(0,4)+"xxxx"+addr1.substring(37));
      }
    }

    const getAccountBalance= async()=>{
      if(isConnect && shopContract !=null){
        let bal = await shopContract.methods.getUserBalance(currentAddress).call({from:currentAddress});
        let trimbal = web3.utils.fromWei(bal,"ether");
        setaccbal(trimbal.toString());
        console.log("Balance",trimbal.toString());
      }
      else{
        console.log("NOT connected");
      }
  
    };

  useEffect(()=>{
    if (!window.ethereum){
      console.log("*****ERROR*****"); 
      return;
    }
    checkConnection();
    getContract();

    // After connecting wallet
    // In metamask, you can either change the active account(user), or change the active network (goerli, mumbai, kovan, etc.)
    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleDisconnect);
    getAccountBalance();
    // Cleanup of listener on unmount
    return () => {
      ethereum.removeListener("chainChanged", handleChainChanged);
      ethereum.removeListener("accountsChanged", handleDisconnect);
    };

  },[isConnect,accbal]);

  return (
    <>
    <ChakraProvider>
    <div className="App">
      <Header/><br/>
      <div style={{dispaly:"flex",justifyContent:"space-between"}}>
      <Nav pullRight style={{position:'fixed'}}>
          { !isConnect ?
          <Button colorScheme='purple' className='btn-pos' onClick={walletConnect}>Connect Wallet</Button>
          : <React.Fragment>
            <div className='nav-addr'>{trimAddr(currentAddress)}</div>
            <div className='nav-addr'>{accbal} CLT</div>
            </React.Fragment>
        }
        </Nav>
        <span style={{fontSize:"x-large",marginLeft:"24px"}}><b>Our Menu</b></span>
        </div>
      <Content SC={shopContract} TC={tokenContract} currentAddress={currentAddress} isconnect={isConnect} allItems={allItems} setbal={setaccbal}/>
    </div>
    </ChakraProvider>
    </>
  );
}

export default App;
