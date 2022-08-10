import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../Constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"

export default function PlayerPicksExact(){

    const { chainId: chainIdHex, isWeb3Enabled } =  useMoralis()
    const chainId = parseInt(chainIdHex)
    const cryptoRouletteAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [highLow, setHighLow] = useState("null")
    const [oddEven, setOddEven] = useState("null")
    const [exactNumbers, setExactNumbers] = useState([])

    //const [pick, setPick] = useState(0)

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
    function setCheckboxValue(id, value) {
        // Get the checkbox
        var checkBox = document.getElementById(id);
        const exactNumbersCopy = Array.from(exactNumbers);
        if (checkBox.checked == true){
            if (!exactNumbersCopy.includes(value))  {
                exactNumbersCopy.push(value)
            } 
        } else {
            console.log("unchecked")
            const start = exactNumbersCopy.indexOf(value);
            if (start > -1){
                exactNumbersCopy.splice(start, 1);
            }
        }
        setExactNumbers(exactNumbersCopy)
      }
   

    return <div>
        <h2>Player Picks - High/Low</h2>
        <fieldset>
            <legend>Select high or low numbers.</legend>
            <p>Low numbers: 1 through 18<br />
            High numbers: 19 through 36</p>
            <div>
                <input type="radio" id="high" name="highlow" value="high" onClick={async () => {
                            console.log("high")
                            if (highLow != "high") {setHighLow("high")}
                            
                        }} />
                <label for="high">High</label>
            </div>

            <div>
                <input type="radio" id="low" name="highlow" value="low"  onClick={async () => {
                            console.log("low")
                            if (highLow != "low") {setHighLow("low")}
                }} />
                <label for="low">Low</label>
            </div>
        </fieldset>

        <h2>Player Picks - Odd/Even</h2>
       
        <fieldset>
            <legend>Select odd or even numbers.</legend>
            <div>
                <input type="radio" id="odd" name="oddeven" value="odd"   onClick={async () => {
                            console.log("low")
                            if (oddEven != "low") {setOddEven("odd")}
                }} />
                <label for="odd">Odd</label>
            </div>
            <div>
                <input type="radio" id="even" name="oddeven" value="even"   onClick={async () => {
                            console.log("even")
                            if (oddEven != "even") {setOddEven("even")}
                }} />
                <label for="even">Even</label>
            </div>
        </fieldset>

        <h2>Player Picks - Exact Match</h2>

        <fieldset>
            <legend>Select ten numbers for a chance at exact match.</legend>
            <input type="checkbox" id="one" name="one" value="1" onClick={() => setCheckboxValue('one', 1)} />
            <label for="one">1 </label>
            <input type="checkbox" id="two" name="two" value="2" onClick={() => setCheckboxValue('two', 2)} />
            <label for="two">2 </label>
            <input type="checkbox" id="three" name="three" value="3" onClick={() => setCheckboxValue('three', 3)} />
            <label for="three">3 </label>
            <input type="checkbox" id="four" name="four" value="4" onClick={() => setCheckboxValue('four', 4)} />
            <label for="four">4 </label>
            <input type="checkbox" id="five" name="five" value="5" onClick={() => setCheckboxValue('five', 5)} />
            <label for="five">5 </label>
            <input type="checkbox" id="six" name="six" value="6" onClick={() => setCheckboxValue('six', 6)} />
            <label for="six">6 </label><br />
            <input type="checkbox" id="seven" name="seven" value="7" onClick={() => setCheckboxValue('seven', 7)} />
            <label for="seven">7 </label>
            <input type="checkbox" id="eight" name="eight" value="8" onClick={() => setCheckboxValue('eight', 8)} />
            <label for="eight">8 </label>
            <input type="checkbox" id="nine" name="nine" value="9" onClick={() => setCheckboxValue('nine', 9)} />
            <label for="nine">9 </label>
            <input type="checkbox" id="ten" name="ten" value="10" onClick={() => setCheckboxValue('ten', 10)} />
            <label for="ten">10 </label>
            <input type="checkbox" id="eleven" name="eleven" value="11" onClick={() => setCheckboxValue('eleven', 11)} />
            <label for="eleven">11 </label>
            <input type="checkbox" id="twelve" name="twelve" value="12" onClick={() => setCheckboxValue('twelve', 12)} />
            <label for="twelve">12 </label><br />
            <input type="checkbox" id="thirteen" name="thirteen" value="13"  onClick={() => setCheckboxValue('thirteen', 13)} />
            <label for="thirteen">13 </label>
            <input type="checkbox" id="fourteen" name="fourteen" value="14" onClick={() => setCheckboxValue('fourteen', 14)} />
            <label for="fourteen">14 </label>
            <input type="checkbox" id="fifteen" name="fifteen" value="15" onClick={() => setCheckboxValue('fifteen', 15)} />
            <label for="fifteen">15 </label>
            <input type="checkbox" id="sixteen" name="sixteen" value="16" onClick={() => setCheckboxValue('sixteen', 16)} />
            <label for="sixteen">16 </label>
            <input type="checkbox" id="seventeen" name="seventeen" value="17" onClick={() => setCheckboxValue('seventeen', 17)} />
            <label for="seventeen">17 </label>
            <input type="checkbox" id="eighteen" name="eighteen" value="18" onClick={() => setCheckboxValue('eighteen', 18)} />
            <label for="eighteen">18 </label><br />
            <input type="checkbox" id="nineteen" name="nineteen" value="19" onClick={() => setCheckboxValue('nineteen', 19)} />
            <label for="nineteen">19 </label>
            <input type="checkbox" id="twenty" name="twenty" value="20" onClick={() => setCheckboxValue('twenty', 20)} />
            <label for="twenty">20 </label>
            <input type="checkbox" id="twentyone" name="twentyone" value="21" onClick={() => setCheckboxValue('twentyone', 21)} />
            <label for="twentyone">21 </label>
            <input type="checkbox" id="twentytwo" name="twentytwo" value="22" onClick={() => setCheckboxValue('twentytwo', 22)} />
            <label for="twentytwo">22 </label>
            <input type="checkbox" id="twentythree" name="twentythree" value="23" onClick={() => setCheckboxValue('twentythree', 23)} />
            <label for="twentythree">23 </label>
            <input type="checkbox" id="twentyfour" name="twentyfour" value="24" onClick={() => setCheckboxValue('twentyfour', 24)} />
            <label for="twentyfour">24 </label><br />
            <input type="checkbox" id="twentyfive" name="twentyfive" value="25" onClick={() => setCheckboxValue('twentyfive', 25)} />
            <label for="twentyfive">25 </label>
            <input type="checkbox" id="twentysix" name="twentysix" value="26" onClick={() => setCheckboxValue('twentysix', 26)} />
            <label for="twentysix">26 </label>
            <input type="checkbox" id="twentyseven" name="twentyseven" value="27" onClick={() => setCheckboxValue('twentyseven', 27)} />
            <label for="twentyseven">27 </label>
            <input type="checkbox" id="twentyeight" name="twentyeight" value="28" onClick={() => setCheckboxValue('twentyeight', 28)} />
            <label for="twentyeight">28 </label>
            <input type="checkbox" id="twentynine" name="twentynine" value="29" onClick={() => setCheckboxValue('twentynine', 29)} />
            <label for="twentynine">29 </label>
            <input type="checkbox" id="thirty" name="thirty" value="30" onClick={() => setCheckboxValue('thirty', 30)} />
            <label for="thirty">30 </label><br />
            <input type="checkbox" id="thirtyone" name="thirtyone" value="31" onClick={() => setCheckboxValue('thirtyone', 31)} />
            <label for="thirtyone">31 </label>
            <input type="checkbox" id="thirtytwo" name="thirtytwo" value="32" onClick={() => setCheckboxValue('thirtytwo', 32)} />
            <label for="thirtytwo">32 </label>
            <input type="checkbox" id="thirtythree" name="thirtythree" value="33" onClick={() => setCheckboxValue('thirtythree', 33)} />
            <label for="thirtythree">33 </label>
            <input type="checkbox" id="thirtyfour" name="thirtyfour" value="34" onClick={() => setCheckboxValue('thirtyfour', 34)} />
            <label for="thirtyfour">34 </label>
            <input type="checkbox" id="thirtyfive" name="thirtyfive" value="35" onClick={() => setCheckboxValue('thirtyfive', 35)} />
            <label for="thirtyfive">35 </label>
            <input type="checkbox" id="thirtysix" name="thirtysix" value="36" onClick={() => setCheckboxValue('thirtysix', 36)} />
            <label for="thirtysix">36 </label>
        </fieldset>
    </div>
}