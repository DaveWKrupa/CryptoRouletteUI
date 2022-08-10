import { useEffect, useState } from "react"
import PlayerPicks from '../components/PlayerPicks'
import JoinGame from "./JoinGame";

export default function MainMenu(props){

  

    return <div>Main Menu
        <div>
            <button id="startgame" onClick={() => props.buttonClicked(1)}>Start Game</button>
            <button id="joingame" onClick={() => props.buttonClicked(2)}>Join Game</button>
            
            
        </div>
    </div>
}
