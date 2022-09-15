import { useWeb3Contract } from "react-moralis"
import { useEffect, useState, useRef } from "react"
import RoundPicksDisplay from "./RoundPicksDisplay"
import PlayerList from "./PlayerList"




export default function GameResults(props) {
    

    const [players, setPlayers] = useState([])
    const [playersAndPots, setPlayersAndPots] = useState([])
    const [update, setUpdate] = useState(false)
   


  
  
    const getPlayersOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getGamePlayers",
        params: { _gameKey: props.gameKey }, 
    }
    const { runContractFunction: getGamePlayers } = useWeb3Contract(getPlayersOptions)




 

    async function updateGameResultsUI(){
        var playersAddresses = []
        var playersAndPotsTemp = []
        const result = await getGamePlayers()
        const {0: playersArray, 1: playerPotsArray} = result;


        if (playersArray){
            
            if (playersArray.length > 0){
                for(var i = 0; i < playersArray.length; i++){
                    if (playersArray[i].toString() !== "0x0000000000000000000000000000000000000000"){
                        playersAddresses.push(playersArray[i].toString())
                        playersAndPotsTemp.push(playersArray[i].toString().slice(0, 6) + "..." + 
                        playersArray[i].toString().slice(playersArray[i].toString().length - 6)  + ": " + 
                            (Number(playerPotsArray[i])/10e17).toString() + " ETH") 
                    }
                }
                setPlayers(playersAddresses)
                setPlayersAndPots(playersAndPotsTemp)
            }
        }

    }

    




    useEffect(() => {

        updateGameResultsUI()

         
    }, [])


    



    
  
    return <div>
        <h3>Game Results</h3>
        <div>

            <div><PlayerList cryptoRouletteAddress={props.cryptoRouletteAddress} abi={props.abi} 
                gameKey={props.gameKey} players={playersAndPots} gameStatus={props.gameStatus} updateGameResultsUI={updateGameResultsUI} /></div>
            {(props.currentRound >= 1) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={1} ante={props.ante}  playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 2) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={2} ante={props.ante}  playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 3) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={3} ante={props.ante}  playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 4) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={4} ante={props.ante} playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 5) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={5} ante={props.ante} playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 6) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={6} ante={props.ante} playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 7) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={7} ante={props.ante} playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 8) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={8} ante={props.ante} playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 9) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={9} ante={props.ante} playerCount={props.playerCount} /> : <></>}
            {(props.currentRound >= 10) ? <RoundPicksDisplay cryptoRouletteAddress={props.cryptoRouletteAddress} 
                abi={props.abi} gameKey={props.gameKey} players={players}  round={10} ante={props.ante} playerCount={props.playerCount} /> : <></>}
            
   

        </div>
    </div>
}