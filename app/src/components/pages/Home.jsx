import React from 'react';
import Menu from '../Menue';
import { Link } from 'react-router-dom';
import {useState, useEffect } from 'react';

function Home(){

    const [content, setContent] = useState([]);
    useEffect(() => {
        fetch('https://w20017074.nuwebspace.co.uk/api/preview?limit=1')
            .then(res => res.json())
            .then(data => {
                setContent(data.data[0]);
            })
            .catch(err => console.log(err));
    }, []); 

    return(
        <div>
            <h1>CHI 2023</h1>
            <h2 className='title'>Title: {content.title}</h2>
            <Link to={content.preview_video}>{content.preview_video}</Link>
        </div>
    )
}

export default Home;