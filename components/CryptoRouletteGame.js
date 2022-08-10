
// import MainMenu from '../components/MainMenu'

import Header from '../components/Header'
import Dealer from '../components/Dealer'
import JoinGame from '../components/JoinGame'
import { useMoralis } from "react-moralis"
import { contractAddresses,  abi } from "../Constants"


// import StartNewGame from '../components/StartNewGame'
// import CurrentGames from '../components/CurrentGames'
// import { useEffect, useState } from "react"
// import PlayerPicks from '../components/PlayerPicks'
// import JoinGame from "./JoinGame";


export default function CryptoRouletteGame(){

    // const [active, setActive] = useState(-1);
    // const [dealerCurrentGame, setDealerCurrentGame] = useState(null);
    // const [playerCurrentGame, setPlayerCurrentGame] = useState(null);
// let account = "aksdfjh"
    const { account } = useMoralis();
    const { chainId: chainIdHex, isWeb3Enabled } =  useMoralis()
    const chainId = parseInt(chainIdHex)
//     const cryptoRouletteAddress = " asdkh"
    const cryptoRouletteAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

//     function buttonClicked(buttonIndex){
//         setActive(buttonIndex)
//     }

    return <div>

        <Header />
        
        {/* <MainMenu buttonClicked={buttonClicked}  />
        {/* {active === 1 && <StartNewGame />}
        {active === 2 && <JoinGame />} */}
        {/* <Dealer account={account} cryptoRouletteAddress={cryptoRouletteAddress} isWeb3Enabled={isWeb3Enabled} abi={abi}  />  */}
        <JoinGame account={account} cryptoRouletteAddress={cryptoRouletteAddress} isWeb3Enabled={isWeb3Enabled} abi={abi}  />
    </div>
}