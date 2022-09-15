import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { useEffect, useState, useRef } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import GameInfo  from "./GameInfo"



export default function PlayerPicksDisplay(props) {
    const HIGHLOW_HIGH = 1
    const HIGHLOW_LOW = 0
    const ODDEVEN_ODD = 1
    const ODDEVEN_EVEN = 0

    const [playerPicks, setPlayerPicks] = useState()


  
    const getPlayerPicksOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getPlayerPicks",
        params: { _gameKey: props.gameKey, round: props.round, _player: props.playerAccount }, 
    }
    const { runContractFunction: getPlayerPicks } = useWeb3Contract(getPlayerPicksOptions)



    async function updateUI(){

        const picks = await getPlayerPicks()
        var sortedPlayerPicks = sortPlayerPicks(picks)
        setPlayerPicks(sortedPlayerPicks)

    }

    function sortPlayerPicks(playerPicks){
        var orderedPlayerPicks = []
        orderedPlayerPicks.push(playerPicks[0])
        orderedPlayerPicks.push(playerPicks[1])
        var tempSort = []
        for(var i = 2; i < playerPicks.length; i++){
            tempSort.push(playerPicks[i])
        }

        tempSort.sort(function(a, b){return a - b});
        for(var i = 0; i < tempSort.length; i++){
            orderedPlayerPicks.push(tempSort[i])
        }
        return orderedPlayerPicks
    }
    
    

    function getPicks(){
        if (playerPicks){
            if (Number(playerPicks[2]) > 0){
                return <div>
                    { (Number(playerPicks[0]) === HIGHLOW_LOW) ? <p>Low Numbers</p> : <p>High Numbers</p> }
                    { (Number(playerPicks[1]) === ODDEVEN_EVEN) ? <p>Even Numbers</p> : <p>Odd Numbers</p> }
                     <p>{Number(playerPicks[2])}, {Number(playerPicks[3])}, {Number(playerPicks[4])}, {Number(playerPicks[5])}, {Number(playerPicks[6])}, {Number(playerPicks[7])}, {Number(playerPicks[8])}, {Number(playerPicks[9])}, {Number(playerPicks[10])}, {Number(playerPicks[11])}</p> 
                </div>
            }
            return <div>Player's picks not yet submitted.</div>
        }
        return <div>Player's picks not yet submitted.</div>
        
    }



    useEffect(() => {
        updateUI()
    }, [])
    
  
    return <div>
        <h3>Player: {props.playerName}</h3>
        <div>

            <div>{getPicks()}</div>

        </div>
    </div>
}