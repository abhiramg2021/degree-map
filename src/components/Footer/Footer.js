import React from 'react'
import "./Footer.scss"


export const Footer = ({color}) => {
    return (
        <div className = {"Footer " + color}>
            <div className = "footnote"> Created by Abhiram Ghanta</div>
        </div>
    )
}
