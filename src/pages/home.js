
import React, { useState } from 'react';
import {v4 as uuidV4} from "uuid";
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');

    }

    const joinRoom = () =>{
        if(!roomId || !username){
            toast.error("Invitation Code and Alias Required");
            return;
        }

        //redirect
        navigate(`/editor/${roomId}`,{
            state:{ 
                username,
            }
        }
        )
    }

    const handleInputEnter = (e) =>{
        if(e.code === "Enter"){
            joinRoom();
        }
    }

    return <div className='homePageWrapper'>
        <div className='formWrapper'>
            <img className='homePageLogo' src='/logo-svg.png' alt="logo"/>
            <h4 className='main-label'> Use your Invitation code.</h4>
            <div className='inputGroup'>
                <input 
                className='inputBox' 
                type='text' 
                placeholder='Invitation Code'
                onChange={(e)=>setRoomId(e.target.value)}
                value={roomId}
                onKeyUp={handleInputEnter}>
                </input>
                <input 
                className='inputBox' 
                type='text' 
                placeholder='Alias'
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                onKeyUp={handleInputEnter}>
                </input>

                <button className='btn joinBtn' onClick={joinRoom}>Join</button>

                <span className='createInfo'>
                    Want to create a room? &nbsp;
                    <a onClick={createNewRoom} href='' className='createNewBtn'>New Room</a>
                </span>
            </div>
        </div>
        <footer className='footer'>
            <h4>A personal project by {''} 
                <a  className="" href='https://github.com/skizzle010'>Utkarsh Rai</a>
            </h4>
        </footer>
    </div>;
};

export default Home;
