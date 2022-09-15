import { useWeb3Contract } from "react-moralis"
import { useState, useEffect } from "react"
import { useNotification } from "web3uikit"


export default function PlayerPicks(props){

    const HIGHLOW_HIGH = 1
    const HIGHLOW_LOW = 0
    const ODDEVEN_ODD = 1
    const ODDEVEN_EVEN = 0

    const dispatch = useNotification()

    const [currentRound, setCurrentRound] = useState(0)
    const [roundSubmitted, setRoundSubmitted] = useState(false)
    const [roundPicks, setRoundPicks] = useState([])
    const [highLow, setHighLow] = useState("null")
    const [oddEven, setOddEven] = useState("null")
    const [exactNumbers, setExactNumbers] = useState([])
    const [exactMessage, setExactMessage] = useState("")
    const [highLowMessage, setHighLowMessage] = useState("")
    const [oddEvenMessage, setOddEvenMessage] = useState("")

    useEffect(() => {
        getCurrentRound() 
    }, [])




    //const [pick, setPick] = useState(0)

    const { runContractFunction: submitNumbers } = useWeb3Contract({
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "submitNumbers",
        params: { _gameKey: props.gameKey, _highLow: highLow,
            _oddEven: oddEven,
            _numbers: exactNumbers },
    })

    const playerPicksOptions = {
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getPlayerPicks",
        params: { _gameKey: props.gameKey, round: 0, _player: props.account },
    }

    const { runContractFunction: getPlayerPicks } = useWeb3Contract(playerPicksOptions) 

    const { runContractFunction: getGameInfo } = useWeb3Contract({
        abi: props.abi,
        contractAddress: props.cryptoRouletteAddress,
        functionName: "getGameInfo",
        params: { _gameKey: props.gameKey }, 
    }) 




    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Numbers submitted",
            title: "Transaction notification",
            position: "topR",
            icon: "bell",
        })
    }



    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification()
        
    }
    
    function setHighLowValue(value){
        setHighLowMessage("")
        setHighLow(value)
    }

    function setOddEvenValue(value){
        setOddEvenMessage("")
        setOddEven(value)
    }


    function setCheckboxValue(id, value) {
        // Get the checkbox
        setExactMessage("")

        var checkBox = document.getElementById(id);
        const exactNumbersCopy = Array.from(exactNumbers);
        if (checkBox.checked == true){
            if (!exactNumbersCopy.includes(value)) {
                exactNumbersCopy.push(value)
            } 
        } else {
            
            const start = exactNumbersCopy.indexOf(value);
            if (start > -1){
                exactNumbersCopy.splice(start, 1);
            }
        }
        setExactNumbers(exactNumbersCopy)
    }

    async function getCurrentRound(){
        const gameInfo = await getGameInfo()
        var currentRound = Number(gameInfo.currentRound)
        //console.log(gameInfo.dealer)
        playerPicksOptions.params.round = currentRound
        const playerPicks = await getPlayerPicks()
        if (playerPicks){
            
            if (Number(playerPicks[2]) > 0) {
                //player has already submitted picks
                setRoundSubmitted(true)
                var playerPicksSorted = sortPlayerPicks(playerPicks)
                setRoundPicks(playerPicksSorted)
            }
            else{
                setRoundSubmitted(false)
            }
        }
        setCurrentRound(currentRound) 
    }

    function sortPlayerPicks(playerPicks){
        var orderedPlayerPicks = []
        orderedPlayerPicks.push(playerPicks[0])
        orderedPlayerPicks.push(playerPicks[1])
        var tempSort = []
        for(var i = 2; i < playerPicks.length; i++){
            tempSort.push(playerPicks[i])
        }

        tempSort.sort(function(a, b){return a - b});
        for(var i = 0; i < tempSort.length; i++){
            orderedPlayerPicks.push(tempSort[i])
        }
        return orderedPlayerPicks
    }

    function checkPlayerPicks(){
        var valid = true
        if (exactNumbers.length != 10){
            valid = false
            setExactMessage("Choose exactly 10 numbers for the exact match.")
        }
        if (highLow === "null") {
            valid = false
            setHighLowMessage("Choose high or low numbers.")
        }
        if (oddEven ==="null"){
            valid = false
            setOddEvenMessage("Choose odd or even numbers.")
        }
        return valid
    }

    async function submitPlayerNumbers(){
        
        if (checkPlayerPicks()){
            console.log("submit")
            setRoundSubmitted(true)
            await  submitNumbers({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error)
            })
        }

    }
   

    return <div>

            <h2>Player Picks - High/Low</h2>
            <fieldset>
                <legend>Select high or low numbers.</legend>
                <p>Low numbers: 1 through 18<br />
                High numbers: 19 through 36</p>
                <div>
                    <input type="radio" id="high" name="highlow" value="high" onClick={async () => {
                                if (highLow != HIGHLOW_HIGH) {setHighLowValue(HIGHLOW_HIGH)}
                                
                            }} />
                    <label htmlFor="high">High</label>
                </div>

                <div>
                    <input type="radio" id="low" name="highlow" value="low"  onClick={async () => {
                                if (highLow != HIGHLOW_LOW) {setHighLowValue(HIGHLOW_LOW)}
                    }} />
                    <label htmlFor="low">Low</label>
                </div>
            </fieldset>

            <h2>Player Picks - Odd/Even</h2>
        
            <fieldset>
                <legend>Select odd or even numbers.</legend>
                <div>
                    <input type="radio" id="odd" name="oddeven" value="odd"   onClick={async () => {
                                if (oddEven != ODDEVEN_ODD) {setOddEvenValue(ODDEVEN_ODD)}
                    }} />
                    <label htmlFor="odd">Odd</label>
                </div>
                <div>
                    <input type="radio" id="even" name="oddeven" value="even"   onClick={async () => {
                                if (oddEven != ODDEVEN_EVEN) {setOddEvenValue(ODDEVEN_EVEN)}
                    }} />
                    <label htmlFor="even">Even</label>
                </div>
            </fieldset>

            <h2>Player Picks - Exact Match</h2>

            <fieldset>
                <legend>Select ten numbers for a chance at exact match.</legend>
                <input type="checkbox" id="one" name="one" value="1" onClick={() => setCheckboxValue('one', 1)} />
                <label htmlFor="one">1 </label>
                <input type="checkbox" id="two" name="two" value="2" onClick={() => setCheckboxValue('two', 2)} />
                <label htmlFor="two">2 </label>
                <input type="checkbox" id="three" name="three" value="3" onClick={() => setCheckboxValue('three', 3)} />
                <label htmlFor="three">3 </label>
                <input type="checkbox" id="four" name="four" value="4" onClick={() => setCheckboxValue('four', 4)} />
                <label htmlFor="four">4 </label>
                <input type="checkbox" id="five" name="five" value="5" onClick={() => setCheckboxValue('five', 5)} />
                <label htmlFor="five">5 </label>
                <input type="checkbox" id="six" name="six" value="6" onClick={() => setCheckboxValue('six', 6)} />
                <label htmlFor="six">6 </label><br />
                <input type="checkbox" id="seven" name="seven" value="7" onClick={() => setCheckboxValue('seven', 7)} />
                <label htmlFor="seven">7 </label>
                <input type="checkbox" id="eight" name="eight" value="8" onClick={() => setCheckboxValue('eight', 8)} />
                <label htmlFor="eight">8 </label>
                <input type="checkbox" id="nine" name="nine" value="9" onClick={() => setCheckboxValue('nine', 9)} />
                <label htmlFor="nine">9 </label>
                <input type="checkbox" id="ten" name="ten" value="10" onClick={() => setCheckboxValue('ten', 10)} />
                <label htmlFor="ten">10 </label>
                <input type="checkbox" id="eleven" name="eleven" value="11" onClick={() => setCheckboxValue('eleven', 11)} />
                <label htmlFor="eleven">11 </label>
                <input type="checkbox" id="twelve" name="twelve" value="12" onClick={() => setCheckboxValue('twelve', 12)} />
                <label htmlFor="twelve">12 </label><br />
                <input type="checkbox" id="thirteen" name="thirteen" value="13"  onClick={() => setCheckboxValue('thirteen', 13)} />
                <label htmlFor="thirteen">13 </label>
                <input type="checkbox" id="fourteen" name="fourteen" value="14" onClick={() => setCheckboxValue('fourteen', 14)} />
                <label htmlFor="fourteen">14 </label>
                <input type="checkbox" id="fifteen" name="fifteen" value="15" onClick={() => setCheckboxValue('fifteen', 15)} />
                <label htmlFor="fifteen">15 </label>
                <input type="checkbox" id="sixteen" name="sixteen" value="16" onClick={() => setCheckboxValue('sixteen', 16)} />
                <label htmlFor="sixteen">16 </label>
                <input type="checkbox" id="seventeen" name="seventeen" value="17" onClick={() => setCheckboxValue('seventeen', 17)} />
                <label htmlFor="seventeen">17 </label>
                <input type="checkbox" id="eighteen" name="eighteen" value="18" onClick={() => setCheckboxValue('eighteen', 18)} />
                <label htmlFor="eighteen">18 </label><br />
                <input type="checkbox" id="nineteen" name="nineteen" value="19" onClick={() => setCheckboxValue('nineteen', 19)} />
                <label htmlFor="nineteen">19 </label>
                <input type="checkbox" id="twenty" name="twenty" value="20" onClick={() => setCheckboxValue('twenty', 20)} />
                <label htmlFor="twenty">20 </label>
                <input type="checkbox" id="twentyone" name="twentyone" value="21" onClick={() => setCheckboxValue('twentyone', 21)} />
                <label htmlFor="twentyone">21 </label>
                <input type="checkbox" id="twentytwo" name="twentytwo" value="22" onClick={() => setCheckboxValue('twentytwo', 22)} />
                <label htmlFor="twentytwo">22 </label>
                <input type="checkbox" id="twentythree" name="twentythree" value="23" onClick={() => setCheckboxValue('twentythree', 23)} />
                <label htmlFor="twentythree">23 </label>
                <input type="checkbox" id="twentyfour" name="twentyfour" value="24" onClick={() => setCheckboxValue('twentyfour', 24)} />
                <label htmlFor="twentyfour">24 </label><br />
                <input type="checkbox" id="twentyfive" name="twentyfive" value="25" onClick={() => setCheckboxValue('twentyfive', 25)} />
                <label htmlFor="twentyfive">25 </label>
                <input type="checkbox" id="twentysix" name="twentysix" value="26" onClick={() => setCheckboxValue('twentysix', 26)} />
                <label htmlFor="twentysix">26 </label>
                <input type="checkbox" id="twentyseven" name="twentyseven" value="27" onClick={() => setCheckboxValue('twentyseven', 27)} />
                <label htmlFor="twentyseven">27 </label>
                <input type="checkbox" id="twentyeight" name="twentyeight" value="28" onClick={() => setCheckboxValue('twentyeight', 28)} />
                <label htmlFor="twentyeight">28 </label>
                <input type="checkbox" id="twentynine" name="twentynine" value="29" onClick={() => setCheckboxValue('twentynine', 29)} />
                <label htmlFor="twentynine">29 </label>
                <input type="checkbox" id="thirty" name="thirty" value="30" onClick={() => setCheckboxValue('thirty', 30)} />
                <label htmlFor="thirty">30 </label><br />
                <input type="checkbox" id="thirtyone" name="thirtyone" value="31" onClick={() => setCheckboxValue('thirtyone', 31)} />
                <label htmlFor="thirtyone">31 </label>
                <input type="checkbox" id="thirtytwo" name="thirtytwo" value="32" onClick={() => setCheckboxValue('thirtytwo', 32)} />
                <label htmlFor="thirtytwo">32 </label>
                <input type="checkbox" id="thirtythree" name="thirtythree" value="33" onClick={() => setCheckboxValue('thirtythree', 33)} />
                <label htmlFor="thirtythree">33 </label>
                <input type="checkbox" id="thirtyfour" name="thirtyfour" value="34" onClick={() => setCheckboxValue('thirtyfour', 34)} />
                <label htmlFor="thirtyfour">34 </label>
                <input type="checkbox" id="thirtyfive" name="thirtyfive" value="35" onClick={() => setCheckboxValue('thirtyfive', 35)} />
                <label htmlFor="thirtyfive">35 </label>
                <input type="checkbox" id="thirtysix" name="thirtysix" value="36" onClick={() => setCheckboxValue('thirtysix', 36)} />
                <label htmlFor="thirtysix">36 </label>
            </fieldset>
            <div><p>{highLowMessage}</p></div>
            <div><p>{oddEvenMessage}</p></div>
            <div><p>{exactMessage}</p></div>

        { (roundSubmitted === false) ?
            <div><button onClick={() => {submitPlayerNumbers()}}>Submit Numbers for round {currentRound}</button></div> 
            : <></> }
        { (roundSubmitted === true && roundPicks[2])  ?
            <div>
                <p>Player's submitted numbers for round {currentRound}</p>
                { (Number(roundPicks[0]) === HIGHLOW_LOW) ? <p>Low Numbers</p> : <p>High Numbers</p> }
                { (Number(roundPicks[1]) === ODDEVEN_EVEN) ? <p>Even Numbers</p> : <p>Odd Numbers</p> }
                <p>{Number(roundPicks[2])}, {Number(roundPicks[3])}, {Number(roundPicks[4])}, {Number(roundPicks[5])}, {Number(roundPicks[6])}, {Number(roundPicks[7])}, {Number(roundPicks[8])}, {Number(roundPicks[9])}, {Number(roundPicks[10])}, {Number(roundPicks[11])}</p>
            </div>
            : <></>
        }
    </div>
}

