
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { useWeb3Contract } from "react-moralis"




export default function PlayerList(props) {
    
    const [playersArray, setPlayers] = useState([])
    const [showPlayers, setShowPlayers] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    const { runContractFunction: withdrawalStack } = useWeb3Contract({
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "withdrawalStack",
        params: { _gameKey: props.gameKey }, 
    })

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Withdraw stack successful",
            title: "Transaction notification",
            position: "topR",
            icon: "bell",
        })
    }

    const dispatch = useNotification()

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification()
        await props.updateGameResultsUI()
    }

    async function withdrawPlayerStack(){
        await  withdrawalStack({
            onSuccess: handleSuccess,
            onError: (error) => showErrorMessage(error)
        })
    }

    function showErrorMessage(error){
        if (error.toString().indexOf("You have no money in this game.")){
            setErrorMessage("You have no money in this game.")
        }
        else{
            setErrorMessage(error.toString())
        }
    }

    function checkList(){
        if (playersArray.length === 0){
            setShowPlayers(false)
        }

    }

    function getList(){
        
        checkList()

        return <div>
            
            <ul>
                {playersArray.map((player) =>
                    <li key={player}>{player}</li>
                )} 
            </ul>
            
        </div>
    }

    function showPlayersList(){
        setPlayers(props.players)
        setShowPlayers(true)
    }

    function hasGameTimeElapsed(){
        //pass back true if start of game was over 1 hour ago

        var gamek = props.gameKey
        var datestring = gamek.substring(12, gamek.indexOf("GMT") + 8)
        var gamedate = new Date(datestring)
        var today = new Date()
        var nowtime = today.getTime()
        var gametime = gamedate.getTime()

        var timeelapsedinseconds = (nowtime - gametime) / 1000
  
        return (timeelapsedinseconds > 3600)
    }


    useEffect(() => {
        showPlayersList()
    }, [])
    
  
    return <div>
        <h3>Players in Game / Stack Amount</h3>
        {(showPlayers) ? 
            <div>
                <div>{getList()}</div>
                {(props.gameStatus !== "Game ended" && hasGameTimeElapsed()) ? 
                    <div><button onClick={() => {withdrawPlayerStack()}}>End game and withdraw ether stack</button></div> : <></> }
                {(props.gameStatus === "Game ended") ? 
                    <div><button onClick={() => {withdrawPlayerStack()}}>Withdraw ether stack</button></div> : <></> }
                {(errorMessage !== "") ? <p>{errorMessage}</p> : <></>}
                <div><button onClick={() => {setShowPlayers(false)}}>Hide Players List</button></div>
            </div>
        : <div><button onClick={() => {showPlayersList()}}>Show Players List</button></div> }
    </div>
}