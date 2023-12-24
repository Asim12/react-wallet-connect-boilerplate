"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {abi} from '../web3/contractAbi'
import { useAccount } from 'wagmi';
import {contractAddress} from '../web3/contractAddress'
import Web3 from 'web3';
import { useEffect } from 'react';

const Home: NextPage = () => {

  const {address}=useAccount()
  const withdrawHandler=async()=>{
    console.log("contractInstance ===>>>>", contractInstance)
    if(contractInstance){
      try{
        console.log('inside function')
        // alert('working wait!')
        let recipt = await contractInstance.methods.withdrawal().send({from: address, gasPrice: web3.utils.toWei('19', 'gwei'), gasLimit: 30000000 })
        if(recipt){
          alert('Wtihdraw successfull')
          console.log(recipt)
        }
      }catch(error){
        alert('Withdraw failed')
        console.log(error)
      }

    }
  }
  let web3:any
  let contractInstance:any
    useEffect(()=>{
      web3 = new Web3((window as any)?.ethereum);
      contractInstance = web3
    ? new web3.eth.Contract(abi as any, contractAddress)
    : null;
  
  
},[address, web3, withdrawHandler])
  console.log('contract instance',contractInstance)
  console.log('contract address',contractAddress)
  // console.log('contract abi',abi)

  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

            <button onClick={()=>withdrawHandler()} style={{marginTop:'1rem'}}>Withdraw</button>
            </main>
    </div>
  );
};

export default Home;
