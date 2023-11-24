import React from 'react';
import Menu from '../Menue';
import VideoPlayer from '../VideoPlayer';
import { Link } from 'react-router-dom';
import {useState, useEffect } from 'react';

function Home(){

    const [content, setContent] = useState([]);
    const [url, setUrl] = useState('');
    useEffect(() => {
        fetch('https://w20017074.nuwebspace.co.uk/api/preview?limit=1')
            .then(res => res.json())
            .then(data => {
                setContent(data.data[0]);
                setUrl(data.data[0].preview_video.replace('watch?v=', 'embed/'));
            })
            .catch(err => console.log(err));
    }, []); 
    return(
        <div>
            <h2 className='title'>Title: {content.title}</h2>
            <p className='link'>For a direct link to the relevant video
            of this title click <Link to={content.preview_video}>here</Link> otherwise
            enjoy watching the embeded video below.</p>
            < VideoPlayer className='video-player' videoUrl={url} />
        </div>
    )
}

export default Home;