import React from 'react';
import DealerGames from './DealerGames'

import { useEffect, useState } from "react"


export default function Dealer(props){

    


//account={account} chainId={chainId} cryptoRouletteAddress={cryptoRouletteAddress} isWeb3Enabled
    return <div>
        <h3>Dealer</h3>
        
        <DealerGames account={props.account} 
            cryptoRouletteAddress={props.cryptoRouletteAddress} abi={props.abi} isWeb3Enabled={props.isWeb3Enabled}/>
        
        {/* {showNewGame ? <DealerGames /> : <></>} */}
    </div>
}