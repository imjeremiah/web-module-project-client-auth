import React from "react";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import FriendForm from "./FriendForm";
import { Card, Button, CardTitle, CardText, CardDeck, CardBody } from "reactstrap";

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
        });
    };

    render() {
        return (
            <div>
                <FriendForm friend={this.state.friends} friends={this.getFriends}/>
                <div>
                    <h1 style={{ color: "green" }}>Friends</h1>
                </div>
                <div>
                    {this.state.isLoading ? 
                        <div>
                            <Loader type="Puff" color="#204963" height="60" width="60" />
                            <p>Loading Data</p>
                        </div>
                    :  
                    this.state.friends.map(friend => (
                        <div className="friends" key={friend.id}>
                            <CardDeck>
                                <Card>
                                <CardTitle style={{ color: "gold" }} tag="h4">{friend.name}</CardTitle>
                                <CardBody>
                                    <CardText>Age: {friend.age}</CardText>
                                    <CardText>Email: {friend.email}</CardText>
                                    <Button outline color="danger" onClick={(e) => {
                                        e.preventDefault();
                                        this.deleteFriend(friend)
                                    }
                                    } size="md">Delete</Button>
                                </CardBody>
                                </Card>
                            </CardDeck>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default FriendsList;