import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'

function Comments({postComments, setNewComment, addNewComment}) {
    return (
        <Accordion style={{marginTop:'20px'}}>
            <Accordion.Item className="main-comment-bar" eventKey='0'>
                <Accordion.Header>Comments</Accordion.Header>
                <Accordion.Body>
                    {
                        postComments.map((comment) => {
                            return (
                                <div style={{padding:'20px', border:'2px solid white'}}>
                                    <p><img style={{width:'50px', height:'50px', borderRadius:'50px'}} src={comment.author.profilePicture} /> {comment.author.userName}</p>
                                    <h6>{comment.comment}</h6>
                                </div>
                            )
                        })                       
                    }
                    <input className="comment-input" type="text" placeholder='comment...' onChange={(event) => setNewComment(event.target.value)} />
                    <button onClick={() => addNewComment()}>Submit</button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Comments