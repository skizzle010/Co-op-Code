import React, { useState } from 'react';
import Client from './components/client';
import Editor from "./components/editor";


const EditorPage = () => {

    const [clients, setClients] = useState([
        {socketId:1,username:'utkarsh Rai'},
        {socketId:2,username:'Aniket Rai'},
        {socketId:3,username:'Aniket Rai'},
    ]);

    return <div className='mainWrap'>
        <div className='aside'>
            <div className='asideInner'>
                <div className='logo'>
                    <img 
                        className='logoImage'
                        src='/logo-svg.png'
                        alt='logo'
                        />

                </div>
                <h3 className='txt-heading' >Connected</h3>
                <div className='clientsList' style={{fontSize:"0.8rem"}} > 
                    {clients.map((client)=>(

                        <Client key ={client.socketId} 
                        username={client.username}/>
                    ))

                    }
                </div>

            </div>

            <button className='btn copyBtn'>Invite</button>
            <button className='btn leaveBtn'>Leave</button>

        </div>
        <div className='editorWrap'>
            <Editor />
        </div>

    </div>;
};

export default EditorPage;
