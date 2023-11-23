import React from 'react';
import Menue from './Menue';
import {useState, useEffect } from 'react';

function Home(){

    const [content, setContent] = useState([]);
    useEffect(() => {
        fetch('http://w20017074.nuwebspace.co.uk/api/preview?limit=1')
        .then(res => res.json())
        .then(data => console.log(data)),[]
    })
    console.log('content');
    return(
        <div>
            <h1>CHI 2023</h1>
            <Menue />
        </div>
    )

}