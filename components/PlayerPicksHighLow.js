import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../Constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"

export default function PlayerPicksHighLow(){

    // const { chainId: chainIdHex, isWeb3Enabled } =  useMoralis()
    // const chainId = parseInt(chainIdHex)
    // const cryptoRouletteAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // const [currentGames, setCurrentGames] = useState(0)

    // const { runContractFunction: getCurrentGames } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: cryptoRouletteAddress,
    //     functionName: "getCurrentGames",
    //     params: {},
    // })


    // useEffect(() => {
    //     if (isWeb3Enabled) {
    //         async function updateUI(){
    //             const currentGamesFromCall = await getCurrentGames()
    //             setCurrentGames(currentGamesFromCall)
    //         }
    //         updateUI()
    //     }
    // }, [isWeb3Enabled])

   

    return <div>
        <h2>Player Picks - High/Low</h2>
        <fieldset>
            <legend>Select high or low numbers.</legend>
            <p>Low numbers: 1 through 18<br />
            High numbers: 19 through 36</p>
            <div>
                <input type="radio" id="high" name="highlow" value="high" />
                <label for="high">High</label>
            </div>

            <div>
                <input type="radio" id="low" name="highlow" value="low" />
                <label for="low">Low</label>
            </div>
        </fieldset>
        
    </div>
}