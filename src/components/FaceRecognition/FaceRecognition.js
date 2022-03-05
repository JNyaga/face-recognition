import React from "react";
import './FaceRecognition.css';


const FaceRecognition = ({ imgUrl, boxList }) => {
    const boxComponents = boxList.map((box, i) => {
        return (
            <div key={i} className="bounding-box" style={{ top: box.top, right: box.right, bottom: box.bottom, left: box.left }}></div>
        )
    })
    return (
        <div className="center ma">
            <div className="absolute mt2 ">
                <img id="inputimage" src={imgUrl} alt="" width='400px' height='auto' />
                {boxComponents}
                {/* <div className="bounding-box" style={{ top: box.top, right: box.right, bottom: box.bottom, left: box.left }}></div> */}
            </div>
        </div>
    );
}

export default FaceRecognition;