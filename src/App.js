import { ChatEngine } from "react-chat-engine";

import ChatFeed from "./components/ChatFeed"; 
import "./App.css";
import LoginForm from "./components/LoginForm";

require('dotenv').config()

const App = () => {
    //if user is not logged in display login page
    if (!localStorage.getItem("username")) 
        return <LoginForm />

    return (
        <ChatEngine 
            height = "100vh"
            projectID = {process.env.REACT_APP_PROJECT_ID}
            userName = {localStorage.getItem("username")}
            userSecret = {localStorage.getItem("password")}
            renderChatFeed = {(chatAppProps) => <ChatFeed {... chatAppProps} />}
        />

    )
}

export default App;