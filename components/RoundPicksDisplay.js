import { useWeb3Contract } from "react-moralis"
import { useEffect, useState, useRef } from "react"
import PlayerPicksDisplay from "./PlayerPicksDisplay"




export default function RoundPicksDisplay(props) {
    
    const [hideRoundPicks, setHideRoundPicks] = useState(true)
    const [playersArray, setPlayers] = useState([])
    const [winningNumber, setWinningNumber] = useState(0)

    const getWinningNumberOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getWinningNumber",
        params: { _gameKey: props.gameKey, _round: props.round },
    }

    const { runContractFunction: getWinningNumber } = useWeb3Contract(getWinningNumberOptions) 

    
    async function getWinningNumberForRound(){
        const winningNumber = await getWinningNumber()
        // console.log(props.gameKey)
        // console.log(props.round)
        // console.log(winningNumber)
        setWinningNumber(winningNumber)
    }
    

    function getList(){
        
        

        return <div>
            
            <ul>
                {props.players.map((player) =>
                    <li key={player}>
                        <PlayerPicksDisplay round={props.round} cryptoRouletteAddress={props.cryptoRouletteAddress} 
                        gameKey={props.gameKey} abi={props.abi} playerAccount={player} 
                        playerName={player.toString().slice(0, 6) + "..." + player.toString().slice(player.toString().length - 6)} />
                        </li>
                )} 
            </ul>
            
        </div>
    }

    function getWinningNumberText(){
        var winNum = Number(winningNumber)
        var onequarter = ((props.ante * props.playerCount) / 4) / 10e17  //
        var onehalf = ((props.ante * props.playerCount) / 2) / 10e17
        if (winNum === 0){
            return <div><p>Waiting for players to submit their numbers.</p> </div>
        }
        return <div>
            <div>Winning number: {winNum}</div> 
            { winNum < 19 ? 
                <div><p>Players who picked low numbers split {onequarter} ETH.</p> </div> : 
                <div><p>Players who picked high numbers split {onequarter} ETH.</p> </div>}
            { winNum % 2 === 0 ?
                <div><p>Players who picked even numbers split {onequarter} ETH.</p> </div> : 
                <div><p>Players who picked odd numbers split {onequarter} ETH.</p> </div>}
            <div>Players who picked {winNum} split {onehalf} ETH</div>
                
        </div>

    }


    useEffect(() => {
        setPlayers(props.players)
        getWinningNumberForRound()
    }, [])
    
  
    return <div>
        { (!hideRoundPicks) ? <>
            <h3>Player Picks Round {props.round}</h3>
            <p>Ante: {props.ante / 10e17} ETH</p>
            
            <div>{getWinningNumberText()}</div>

            <div>{getList()}</div>

            <div><button onClick={() => {setHideRoundPicks(true)}}>Hide Round {props.round} Picks</button></div></>
            :
            <><div><button onClick={() => {setHideRoundPicks(false)}}>Show Round {props.round} Picks</button></div></>}


    </div>
}