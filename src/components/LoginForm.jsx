import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        // console.log(e);
        e.preventDefault();

        //setting chat credentials
        const authObject = {
            "Project-ID": process.env.REACT_APP_PROJECT_ID,
            "User-Name": username,
            "User-Secret": password
        };

        
        try {
            //get request to chatengine api
           await axios.get("https://api.chatengine.io/chats", { headers: authObject });

           //if successful store credentials
           localStorage.setItem("username", username);
           localStorage.setItem("password", password);

           //reload to load chat page
           window.location.reload();
        }
        catch (error) {
            setError("Incorrect credentials!");
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Welcome to VChatApp</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        placeholder="Username" 
                        required />
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        placeholder="Password" 
                        required />
                    
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Enter Chat</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    )

}

export default LoginForm;