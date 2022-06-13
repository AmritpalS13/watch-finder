import React, {useEffect, useState} from 'react'

import {auth, db, storage } from '../../../firebase-config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'; 
import DisplayCard from '../../DisplayCard/DisplayCard';



const SavedPosts = () => {
    const [test, setTest] = useState([]);


    return(
        <div>
            test
        </div>
    )
}

export default SavedPosts