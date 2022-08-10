import { useWeb3Contract } from "react-moralis"
import { abi } from "../Constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function StartNewGame(props){
   
    const [dealerFee, setDealerFee] = useState(0)

  

    const dispatch = useNotification()



    const { runContractFunction: getDealerFee } = useWeb3Contract({
        abi: abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getDealerFee",
        params: {}, 
    })

    let startNewGameOptions = {
        abi: abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "startNewGame",
        params: { _ante: "", _gameKey: ""  },
        msgValue: Number(dealerFee * 1e18)
    }
    const { runContractFunction: startNewGame } = useWeb3Contract(startNewGameOptions)

    async function handleCreateGameButtonClick(){
        startNewGameOptions.params = { _ante: getAnte(), _gameKey: getGameKey()  }
        console.log(startNewGameOptions.params)
        await startNewGame({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error)
        })
        props.setShowNewGame(false)
    }

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification()
    }

    async function updateUI(){
        const dealerFeeFromCall = await getDealerFee()
        setDealerFee((ethers.utils.formatUnits(dealerFeeFromCall, "ether")).toString())
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Cryptoroulette game started",
            title: "Transaction notification",
            position: "topR",
            icon: "bell",
        })
        updateUI()
    }

    function getGameKey () {
        if (props.account) {
            //game key is going to be subset of account address and the current date and time
            const today = new Date()
            var gameKey = props.account.slice(0, 4) + "..." + props.account.slice(props.account.length - 4) + "-" + today.toString()
            console.log(gameKey)
            return gameKey
        }
    }

    function getAnte(){
        var e = document.getElementById("ante");
        if (e){
            console.log("ante: "  + e.value);
            return e.value
        }
        return 0
    }

    useEffect(() => {
        if (props.isWeb3Enabled) {
            
            updateUI()
        }
    }, [])





    return <div>
        Start New Game
        <div>
            Dealer Fee: {dealerFee} ether
        </div>
        <div>
            <label htmlFor="ante">Choose an ante</label>
            <select id="ante" onChange={() => getAnte()}>
                <option value="1000000000000000">.001 ether</option>
                <option value="10000000000000000">.01 ether</option>
                <option value="100000000000000000">.1 ether</option>
            </select>
        </div>
        
        <div><button onClick={() => handleCreateGameButtonClick()}>Create Game</button><button onClick={() => props.setShowNewGame(false)}>Cancel</button></div>
    </div>

}