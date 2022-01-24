import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const FriendsList = () => {
    const [isLoading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get('/friends')
            .then(res => setFriends(res.data))
            .catch(err => console.log(err))
            .finally(setLoading(false));
    },[]);

    return (
        <div>
            <h1>Friends List</h1>
            <ul>
                {isLoading && <p>Loading...</p>}
                {friends.length > 0 ? 
                    friends.map(friend => <li key={friend.id}>{friend.name} - {friend.email}</li>) :
                    <p>List is empty.</p>}
            </ul>
        </div>
    )
};

export default FriendsList;