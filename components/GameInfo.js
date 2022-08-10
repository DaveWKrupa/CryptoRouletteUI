import React from 'react';
import { useEffect, useState } from "react"

import { useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"

export default function GameInfo(props){
    const [gameInfo, setGameInfo] = useState([])

    const dispatch = useNotification()

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction sent",
            title: "Transaction notification",
            position: "topR",
            icon: "bell",
        })
    }

    const { runContractFunction: getGameInfo } = useWeb3Contract({
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getGameInfo",
        params: { _gameKey: props.gameKey }, 
    })

    const { runContractFunction: cancelNewGame } = useWeb3Contract({
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "cancelNewGame",
        params: { _gameKey: props.gameKey }, 
    })

    const { runContractFunction: setReadyForPlayers } = useWeb3Contract({
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "setReadyForPlayers",
        params: { _gameKey: props.gameKey }, 
    })

    const { runContractFunction: setGameToInProgress } = useWeb3Contract({
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "setGameToInProgress",
        params: { _gameKey: props.gameKey }, 
    })

    let joinGameOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "joinGame",
        params: { _gameKey: props.gameKey, 
            playerName: props.account.slice(0, 4) + "..." 
            + props.account.slice(props.account.length - 4) },
        msgValue: Number(gameInfo.ante) * 10
    }

    const { runContractFunction: joinGame } = useWeb3Contract(joinGameOptions)

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification()
    }
    async function handleCancelGameButtonClick(){
        await cancelNewGame({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error)
        })
        props.hideGameInfo()
        props.callUpdateGameList()
    }

    async function handleGameReadyPlayersButtonClick(){
        await setReadyForPlayers({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error)
        })
        props.hideGameInfo()
        props.callUpdateGameList()
    }

    async function handleGameInProgressButtonClick(){
        await setGameToInProgress({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error)
        })
        props.hideGameInfo()
        props.callUpdateGameList()
    }

    async function handleJoinGameButtonClick(){
        await joinGame({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error)
        })
        props.hideGameInfo()
        props.callUpdateGameList()
    }

    async function updateUI(){
        const gameInfo = await getGameInfo()
        console.log(gameInfo.dealer)
        setGameInfo(gameInfo)
    }

    useEffect(() => {
        updateUI()
    }, [])

  

    function getGameInfoControls(){
        if (gameInfo.gameStatus === "Game is initializing"){
            return <div>
                <p>Game Key: {props.gameKey}</p>
                <p>Status: {gameInfo.gameStatus}</p>
                <p>Ante: {Number(gameInfo.ante)/10e17} ether</p>
                <p>Number of players: {Number(gameInfo.playerCount)}</p> 
                <button onClick={() => {handleGameReadyPlayersButtonClick()}}>Set Ready for Players</button>
                <button onClick={() => {handleCancelGameButtonClick()}}>Cancel Game</button>
            </div>

        }
        if (gameInfo.gameStatus === "Waiting for players"){
            return <div>
                <p>Game Key: {props.gameKey}</p>
                <p>Status: {gameInfo.gameStatus}</p>
                <p>Ante: {Number(gameInfo.ante)/10e17} ether</p>
                <p>Number of players: {Number(gameInfo.playerCount)}</p> 
                {props.gameInfoParent === "DealerGames" ? <button onClick={() => {handleGameInProgressButtonClick()}}>Set Game to In Progress</button> : <></>}
                {props.gameInfoParent === "DealerGames" ? <button onClick={() => {handleCancelGameButtonClick()}}>Cancel Game</button> : <></>}
                {props.gameInfoParent === "JoinGame" ? <button onClick={() => {handleJoinGameButtonClick()}}>Join Game</button> : <></>}
                
            </div>

        }
        if (gameInfo.gameStatus ===  "In progress"){
            return <div>
                <p>Game Key: {props.gameKey}</p>
                <p>Status: {gameInfo.gameStatus}</p>
                <p>Ante: {Number(gameInfo.ante)/10e17} ether</p>
                <p>Number of players: {Number(gameInfo.playerCount)}</p> 
                <p>Current Round: {Number(gameInfo.playerCount)}</p>
            </div>
        }

        if (gameInfo.gameStatus ===  "Game ended"){
            return <div>
                <p>Game Key: {props.gameKey}</p>
                <p>Status: {gameInfo.gameStatus}</p>
                <p>Ante: {Number(gameInfo.ante)/10e17} ether</p>
                <p>Number of players: {Number(gameInfo.playerCount)}</p> 
            </div>
        }
    }

    return <div>{getGameInfoControls()}<div><button onClick={() => {props.hideGameInfo()}}>Hide Game Info</button></div></div>
}