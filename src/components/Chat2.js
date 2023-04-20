import { Component } from "react";
import ChatService from "../services/ChatService";

class Chat2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            connectionID: this.props.match.params.connectionID,
            chat: {},
            text: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.toProfile = this.toProfile.bind(this);
    }

    componentDidMount() {
        ChatService.getChat(this.state.id, this.state.connectionID).then( res => {
            this.setState({chat: res.data});
        });
        ChatService.removeNotif(this.state.id, this.state.connectionID);

    }

    toProfile(id) {
        this.props.history.push(`/students/dashboard/${id}`);
    }

    handleInput (event) {
        const value = event.target.value;
        console.log(value);
        this.setState({
          ...this.state,
          [event.target.name]: value,
        });
      }

      addMessage(id, text, messageId) {
        ChatService.addMessage(id, text, messageId);
      }

    render() {
        const {id, connectionID, chat, text} = this.state;

        return (
            <div>
                <button onClick={ () => this.toProfile(id)}>Back to landing page</button>
                <br></br>
                <h1>Chat</h1>
                {chat.messages &&
                    chat.messages.map((message) => (
                        <ul>
                            <div>
                                <p>From: {message.senderId}</p>
                                <p>{message.text}</p>
                                <br></br>
                            </div>
                        </ul>
                    ))
                }
                <form onSubmit={ () => this.addMessage(id, text, chat.id)}>
                    <input type="text" name="text" id="text" placeholder="Enter your message" value={text} onChange={this.handleInput}/>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}

export default Chat2;