import { useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import GameInfo  from "./GameInfo"

export default function JoinGame(props){

    const [showGame, setShowGame] = useState("")
    const [currentGames, setCurrentGames] = useState([])


    const getCurrentGamesOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getCurrentGames",
        params: { _dealer: props.account }, 
    }
    const { runContractFunction: getCurrentGames } = useWeb3Contract(getCurrentGamesOptions)


    async function updateUI(){


        let games = await getCurrentGames()
       
        if (games){
            
            if (games.length > 0){

                var currGames = []
                for(var i = 0; i < games.length; i++){
                    var gameKey = ""
                    var gameStatus = ""
                    if (games[i].indexOf("(Waiting for Players)") > 0){
                        gameKey = games[i].substring(0, games[i].indexOf("(Waiting for Players)") - 1)
                        gameStatus = "Waiting for Players"
                    }
                    else{
                        gameKey = games[i].substring(0, games[i].indexOf("(In Progress)") - 1)
                        gameStatus = "In Progress"
                    }
                    
                        var gameStatusArray = [gameKey, gameStatus]
                        currGames.push(gameStatusArray)
                        //console.log(gameStatusArray[0])
                    }
                }
                setCurrentGames(currGames.reverse())
            }
        }

    

    useEffect(() => {
        updateUI()
    }, [])

    function hideGameInfo(){
        setShowGame("")
    }

    function callUpdateGameList(){
        updateUI()
    }

    function getList(){
        
        

        return <div>
            

            {currentGames.map((game) =>
                <div>
                    <button onClick={() => {setShowGame(game[0])}}>{game[0]}</button> 
                    {(showGame === game[0]) ? 

                            <div><GameInfo gameKey={game[0]} account={props.account} 
                                cryptoRouletteAddress={props.cryptoRouletteAddress} abi={props.abi}
                                hideGameInfo={hideGameInfo} callUpdateGameList={callUpdateGameList}
                                gameInfoParent="JoinGame"
                                /></div>

                        : <></>}


                </div>
                
            )} 
            
            
        </div>
    }


    return <div>
        <h3>Join games</h3>
        <div>


            <div>{getList()}</div>
            <div><button onClick={() => {updateUI()}}>Refresh List</button></div>

        </div>
    </div>
}