import React from "react";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import FriendForm from "./FriendForm";

class FriendsList extends React.Component {
    state = {
        friends: [],
        isloading: false,
    };

    componentDidMount() {
        this.getFriends();
    };

    getFriends = () => {
        this.setState({
            isloading: true
        });

        axiosWithAuth()
        .get("/api/friends")
        .then(res => {
            console.log(res.data);
            this.setState({
                friends: res.data
            })
        })
        .catch(err => {
            console.log(err);
        });
    };

    deleteFriend = (friendId) => {
        axiosWithAuth()
            .delete(`/api/friends/${friendId.id}`, {params: {id: friendId}})
            .then(res => {
            this.setState(
                this.state.friends.filter(friend => friend.id !== res.data)        
            )
            this.getFriends()
            })
            .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <FriendForm friend={this.state.friends} friends={this.getFriends}/>
                <div>
                    <h1>Friends</h1>
                </div>
             
                <div>
                    {this.state.isLoading ? 
                        <div>
                            <Loader type="Puff" color="#204963" height="60" width="60" />
                            <p>Loading Data</p>
                        </div>
                    :  
                    this.state.friends.map(friend => (
                        <div key={friend.id}>
                            <div>
                                <p>{friend.name}</p>
                                <p>{friend.age}</p>
                                <p>{friend.email}</p>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    this.deleteFriend(friend)
                                }
                            }>Delete</button>
                            </div>
                        </div>
                    ))

                    }
                </div>
            </div>
        )
    }
}

export default FriendsList;