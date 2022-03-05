import React from "react";
import Tilt from 'react-tilt'
import './Logo.css'
import falcon from './falcon.png'
const Logo = () => {
    return (
        <div className="ma3 mv0 mt0">
            <Tilt className="Tilt shadow-5" options={{ max: 55 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3"> <img src={falcon} alt="logo" style={{ paddingTop: '5px' }} /> </div>
            </Tilt>

        </div>
    )
}


export default Logo;