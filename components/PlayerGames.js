import { useWeb3Contract } from "react-moralis"
import { useEffect, useState, useRef } from "react"
import GameInfo  from "./GameInfo"



export default function PlayerGames(props) {
    
    let hasCurrentGame = false

    const [showGame, setShowGame] = useState("")
    const [playerKeys, setPlayerKeys] = useState([])


  
    const getPlayerGameKeysOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getPlayerGameKeys",
        params: { _player: props.account }, 
    }
    const { runContractFunction: getPlayerGameKeys } = useWeb3Contract(getPlayerGameKeysOptions)

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
      
        let PlayerGameKeys = await getPlayerGameKeys()

        if (PlayerGameKeys){
          
            if (PlayerGameKeys.length > 0){
                var PlayerGames = []
                for(var i = 0; i < PlayerGameKeys.length; i++){
                    getGameStatusOptions.params._gameKey = PlayerGameKeys[i]
                    var gameStatus = await getGameStatus()
                   // console.log(PlayerGameKeys[i])
                    //console.log(gameStatus)
                    if (gameStatus){
                        //console.log(PlayerGameKeys[i])
                        //console.log(gameStatus)
                        if (gameStatus != "Game ended"){
                            hasCurrentGame = true
                        }
                        var gameStatusArray = [PlayerGameKeys[i], gameStatus]
                        PlayerGames.push(gameStatusArray)
                        //console.log(gameStatusArray[0])
                    }
                }
                
                setPlayerKeys(PlayerGames.reverse())
            }
        }

    }

    
    

    function getList(){
        
        

        return <div>
            

            {playerKeys.map((game) =>
                <div key={game[0]}>
                
                    <button onClick={() => {setShowGame(game[0])}}>{"Game key: " + game[0] }</button>
                    {(showGame === game[0]) ? 
                            <div><GameInfo gameKey={game[0]} account={props.account} 
                                cryptoRouletteAddress={props.cryptoRouletteAddress} abi={props.abi}
                                hideGameInfo={hideGameInfo} callUpdateGameList={callUpdateGameList}
                                gameInfoParent="PlayerGames" playGame={props.playGame}
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
        <h3>Player games</h3>
        <p className="text-3xl font-bold underline">List of players games</p>
        <div>

            <div>{getList()}</div>
            <div><button onClick={() => {updateUI()}}>Refresh List</button></div>

        </div>
    </div>
}