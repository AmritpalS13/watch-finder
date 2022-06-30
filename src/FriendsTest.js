import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

import {ButtonGroup, Button, DropdownButton, Dropdown} from 'react-bootstrap'
import { db, auth } from './firebase-config';

function FriendsTest() {
    const [user, setUser] = useState(null);//The current user logged in.
    const usersRef = collection(db, "users");

    const [friends, setFriends] = useState([]);

    const addFriendsData = (data) => {
        var temp = friends;
        temp.push(data);
        setFriends(temp);
    }
    useEffect(() => {
        const getUsersData = async () => {
            const data = await getDocs(usersRef);
            data.docs.map((doc) => {
                
                if(doc.data().userId === auth.currentUser.uid) {
                    setUser(doc.data());
                }

            })
        }

        getUsersData();
        
       
        
    }, []);

    
    return (
        <>
            <Friends user={user} />
            <ButtonGroup vertical>
                



            </ButtonGroup>

        </>
    )
}

const Friends = ({ user }) => {
    const [friends, setFriends] = useState([]);
    


    useEffect(() => {
        if(!user) {
            const getFriendsData = async () => {
                const data = await getDocs(collection(db, 'users', `${user.userId}`, 'friends'));
                data.docs.map((doc) => {
                    console.log(doc.data());
                })
            }
            getFriendsData();
        } else {
            console.log(null)
        }
        

    }, [])
    return(
        <>
        </>
    );
}
export default FriendsTest