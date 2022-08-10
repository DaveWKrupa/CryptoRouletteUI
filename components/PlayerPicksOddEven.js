import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../Constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"

export default function PlayerPicksOddEven(){

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
        <h2>Player Picks - Odd/Even</h2>
       
        <fieldset>
            <legend>Select odd or even numbers.</legend>
            <div>
                <input type="radio" id="odd" name="oddeven" value="odd" />
                <label for="odd">Odd</label>
            </div>
            <div>
                <input type="radio" id="even" name="oddeven" value="even" />
                <label for="even">Even</label>
            </div>
        </fieldset>

    </div>
}