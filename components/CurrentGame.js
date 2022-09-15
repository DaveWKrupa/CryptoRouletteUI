
import GameInfo  from "./GameInfo"
import PlayerPicks from './PlayerPicks'
import GameResults from '../components/GameResults'
import { useWeb3Contract } from "react-moralis"
import React from 'react';
import { useEffect, useState } from "react"




export default function CurrentGame(props) {

    const [gameInfo, setGameInfo] = useState([])

    const { runContractFunction: getGameInfo } = useWeb3Contract({
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getGameInfo",
        params: { _gameKey: props.gameKey }, 
    })

    


    async function getCurrentGameInfo(){
        const gameInfo = await getGameInfo()
        //console.log(Number(gameInfo.playerCount))
        setGameInfo(gameInfo)
        
    }

    

    useEffect(() => {
        getCurrentGameInfo()
    }, [])



    return <div>

        <GameInfo gameKey={props.gameKey} account={props.account} 
                cryptoRouletteAddress={props.cryptoRouletteAddress} abi={props.abi}
                gameInfoParent="CurrentGame"  />
        {(gameInfo.gameStatus !== "Game ended") ? 
            <PlayerPicks account={props.account} cryptoRouletteAddress={props.cryptoRouletteAddress} 
            abi={props.abi} gameKey={props.gameKey} gameStatus={gameInfo.gameStatus}   /> : <></> }
        <GameResults account={props.account} cryptoRouletteAddress={props.cryptoRouletteAddress} 
            abi={props.abi} gameKey={props.gameKey} ante={Number(gameInfo.ante)} playerCount={Number(gameInfo.playerCount)} 
            currentRound={Number(gameInfo.currentRound)} gameStatus={gameInfo.gameStatus} />
    </div>
}