import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Client from './components/client';
import Editor from "./components/editor";
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation,useNavigate,Navigate,useParams } from 'react-router-dom';

const EditorPage = () => {

    const socketRef = useRef(null);
    const location = useLocation();
    const codeRef = useRef(null);
    const reactNavigator = useNavigate();
    const {roomId} = useParams();
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const init = async () =>{
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }
            
            socketRef.current.emit(ACTIONS.JOIN,{
                roomId,
                username: location.state?.username,
            });

            //Listening for Joined event

            socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
                if(username !== location.state.username){
                    toast.success(`${username} joined`)
                    console.log(`${username} joined`)
                }

                setClients(clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code:codeRef.current,
                    socketId,
                } );
            }
            
        )

        //Listening for disconnected
        socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username}) =>{
            toast.success(`${username} left`);
            setClients((prev)=>{
                return prev.filter(client => client.socketId !== socketId)
            })
        })

        }
        init();
        return () =>{
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        }
    },[]

)

    async function copyRoomId() {
    try {
        await navigator.clipboard.writeText(roomId);
        toast.success('Room ID has been copied to your clipboard');
    } catch (err) {
        toast.error('Could not copy the Room ID');
        console.error(err);
    }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    

    if(!location.state){
    return <Navigate to="/"/>
    }

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

            <button className='btn copyBtn' onClick={copyRoomId}>Invite</button>
            <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>

        </div>
        <div className='editorWrap'>
            <Editor socketRef={socketRef}  roomId={roomId} onCodeChange={(code) => {
                        codeRef.current = code;
                    }}/>
        </div>

    </div>;
};

export default EditorPage;
