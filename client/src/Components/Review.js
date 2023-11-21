import React, { useState, useEffect } from 'react';
import styles from '../Styles/Review.css'

function Review({username, userImage, title, body, score }) {

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac mauris faucibus, malesuada nunc a, molestie ante. In dapibus lectus vehicula libero venenatis, finibus vulputate velit ultricies. Nunc ac commodo arcu, eget sagittis libero. Suspendisse pretium commodo finibus. Curabitur massa nunc."
    
    return (
        <div className='Review'>
            <div className='Title-User'>
                <div className='Review-Title'>{title}</div>
                <div className='Review-Header'>
                    <div 
                        className='Review-User-Img'
                        style={{backgroundImage: "url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')"}}
                    ></div>
                    <div className='Review-Username'>{username}</div>
                </div>
            </div>
            <div className='Content'>
                <div className='Text-Space'>
                    <div className='Text'>
                        {body}
                    </div>
                </div>
                <div className='Score-Space'>
                    <div className= 'Score'>{score}/10</div>
                </div>
            </div>
        </div>
    )
}

export default Review;