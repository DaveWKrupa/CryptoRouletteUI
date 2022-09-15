
// import MainMenu from '../components/MainMenu'

import Header from '../components/Header'
import Dealer from '../components/Dealer'
import PlayerGames from '../components/PlayerGames'
import CurrentGame from '../components/CurrentGame'
import PlayerList from '../components/PlayerList'
import JoinGame from '../components/JoinGame'

import { useMoralis } from "react-moralis"
import { contractAddresses,  abi } from "../Constants"
import { useState } from 'react'



// import StartNewGame from '../components/StartNewGame'
// import CurrentGames from '../components/CurrentGames'
// import { useEffect, useState } from "react"
// import PlayerPicks from '../components/PlayerPicks'
// import JoinGame from "./JoinGame";


export default function CryptoRouletteGame(){

    // const [active, setActive] = useState(-1);
    // const [dealerCurrentGame, setDealerCurrentGame] = useState(null);
    const [currentGame, setCurrentGame] = useState("");
// let account = "aksdfjh"
    const { account } = useMoralis();
    const { chainId: chainIdHex, isWeb3Enabled } =  useMoralis()
    const chainId = parseInt(chainIdHex)
//     const cryptoRouletteAddress = " asdkh"
    const cryptoRouletteAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

//     function buttonClicked(buttonIndex){
//         setActive(buttonIndex)
//     }

    function playGame(gameKey) {
        //console.log("play: " + gameKey)
        setCurrentGame(gameKey)
    }

    return <div>

        <Header />
        
        {/* <MainMenu buttonClicked={buttonClicked}  />
        {/* {active === 1 && <StartNewGame />}
        {active === 2 && <JoinGame />} */}
        {/* <Dealer account={account} cryptoRouletteAddress={cryptoRouletteAddress} isWeb3Enabled={isWeb3Enabled} abi={abi}  />  */}
        {/* <JoinGame account={account} cryptoRouletteAddress={cryptoRouletteAddress} isWeb3Enabled={isWeb3Enabled} abi={abi}  /> */}
        {currentGame === "" ?
         <PlayerGames account={account} cryptoRouletteAddress={cryptoRouletteAddress} isWeb3Enabled={isWeb3Enabled} abi={abi} playGame={playGame}  /> :
         <></>}
        {currentGame !== "" ?
         <CurrentGame account={account} cryptoRouletteAddress={cryptoRouletteAddress} isWeb3Enabled={isWeb3Enabled} abi={abi} gameKey={currentGame}  /> :
         <></>}
         

    </div>
}