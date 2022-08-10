import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { useEffect, useState, useRef } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import GameInfo  from "./GameInfo"
import StartNewGame from './StartNewGame'


export default function DealerGames(props) {
    const [showNewGame, setShowNewGame] = useState(false);
    let hasCurrentGame = false

    const [showGame, setShowGame] = useState("")
    const [dealerKeys, setDealerKeys] = useState([])


  
    const getDealerGameKeysOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getDealerGameKeys",
        params: { _dealer: props.account }, 
    }
    const { runContractFunction: getDealerGameKeys } = useWeb3Contract(getDealerGameKeysOptions)

    const getGameStatusOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getGameStatus",
        params: { _gameKey: "" }, 
    }
    const { runContractFunction: getGameStatus } = useWeb3Contract(getGameStatusOptions)

    function hideGameInfo(){
        setShowGame("")
    }

    async function updateUI(){
        hasCurrentGame = false

        let dealerGameKeys = await getDealerGameKeys()
        // console.log("dealer " + dealerGameKeys)
        // console.log(props.cryptoRouletteAddress)
        // console.log(props.account)
        if (dealerGameKeys){
            
            if (dealerGameKeys.length > 0){
                var dealerGames = []
                for(var i = 0; i < dealerGameKeys.length; i++){
                    getGameStatusOptions.params._gameKey = dealerGameKeys[i]
                    var gameStatus = await getGameStatus()
                    // console.log(dealerGameKeys[i])
                    // console.log(gameStatus)
                    if (gameStatus){
                        console.log(dealerGameKeys[i])
                        console.log(gameStatus)
                        if (gameStatus != "Game ended"){
                            hasCurrentGame = true
                        }
                        var gameStatusArray = [dealerGameKeys[i], gameStatus]
                        dealerGames.push(gameStatusArray)
                        //console.log(gameStatusArray[0])
                    }
                }
                
                setDealerKeys(dealerGames.reverse())
            }
        }

    }

    
    

    function getList(){
        
        

        return <div>
            

            {dealerKeys.map((game) =>
                <div>
                
                    <button onClick={() => {setShowGame(game[0])}}>{"Game key: " + game[0] }</button>
                    {(showGame === game[0]) ? 

                            <div><GameInfo gameKey={game[0]} account={props.account} 
                                cryptoRouletteAddress={props.cryptoRouletteAddress} abi={props.abi}
                                hideGameInfo={hideGameInfo} callUpdateGameList={callUpdateGameList}
                                gameInfoParent="DealerGames"
                                /></div>

                        : <></>}
                </div>
            )} 
            
            
        </div>
    }

    function callUpdateGameList(){
        updateUI()
    }

    useEffect(() => {
        updateUI()
    }, [])
    
  
    return <div>
        <h3>Dealer games</h3>
        <div>
            {!showNewGame && !hasCurrentGame  ? <div><button onClick={() => setShowNewGame(true)}>Start New Game</button></div> : <></>}
            {showNewGame && !hasCurrentGame  ? <div><StartNewGame setShowNewGame={setShowNewGame} account={props.account} 
                cryptoRouletteAddress={props.cryptoRouletteAddress} 
                isWeb3Enabled={props.isWeb3Enabled} abi={props.abi} /></div> : <></>}

            <div>{getList()}</div>
            <div><button onClick={() => {updateUI()}}>Refresh List</button></div>

        </div>
    </div>
}