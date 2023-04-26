import axios from 'axios'

const CHAT_API_BASE_URL = "http://localhost:8081/chats";

class ChatService {

    getChat(id, connectionID) {
        console.log(id + " " + connectionID);
        return axios({
            method: 'put',
            url: CHAT_API_BASE_URL,
            data: {
                student1 : id,
                student2 : connectionID
            }
        });
    }

    addMessage(id, text, messageId) {
        console.log(id + " " + text + " " + messageId);
        return axios({
            method: 'put',
            url: CHAT_API_BASE_URL + "/addmessage",
            data: {
                id: messageId,
                text: text,
                sender: id
            }
        });
    }

    sendCourse(userID, courseID, messageId) {
        return axios({
            method: 'put',
            url: CHAT_API_BASE_URL + "/addmessage/course",
            data: {
                sender: userID,
                courseID: courseID,
                id: messageId,
            }
        });
    }
    removeNotif(id, sender) {
        return axios.post(`http://localhost:8081/students/` + id + `/removechatnotification/` + sender);
    }

}

export default new ChatService();