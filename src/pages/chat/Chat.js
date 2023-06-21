import style from './Chat.module.css'
import React from 'react';
import { useState, useEffect } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [randomId, setRandomId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    function kelvinToCelsius(kelvin) {
        return Math.floor(kelvin - 273.15);
    }

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (newMessage.trim() === '') {
            return;
        }
        const msg = {
            sender: "user",
            message: newMessage
        }
        setMessages(prevMessages => [...prevMessages, msg]);
        setLoading(true);
        if (newMessage.toLowerCase() === "időjárás" || newMessage.toLowerCase() === "weather" ){
                fetch('https://api.openweathermap.org/data/2.5/weather?q=Miskolc,hun&APPID=fdd8ad86b4117907ffa7825c71bf9b47')
                  .then(response => response.json())
                  .then(data => {   
                    const celsius = kelvinToCelsius(data.main.temp);                
                    const msg = {
                        sender: "ai",
                        message: `${celsius} °C - ${data.name}`
                    }
                    setMessages(prevMessages => [...prevMessages, msg]);
                    })
                  .catch(error => {
                    console.error('GET request failed:', error);
                  });           //
            return;
        }else if (newMessage.toLocaleLowerCase() === "lottó" ||
                    newMessage.toLocaleLowerCase() === "ötöslottó" || 
                        newMessage.toLocaleLowerCase() === "lottószámok" ||
                            newMessage.toLocaleLowerCase() === "ötöslottó"){
                                fetch('https://bet.szerencsejatek.hu/PublicInfo/ResultJSON.aspx?game=LOTTO5&query=last')
                                .then(response => response.json())
                                .then(data => {   
                                    const extractedNumbers = data.game[0].draw['win-number-list'].number.map(
                                        numberObj => parseInt(numberObj.xml)
                                      );           
                                  const msg = {
                                      sender: "ai",
                                      message: `${extractedNumbers}`
                                  }
                                  setMessages(prevMessages => [...prevMessages, msg]);
                                  })
                                .catch(error => {
                                  console.error('GET request failed:', error);
                                }); 
            return;                     
        }
        //https://81ef-91-147-254-140.ngrok-free.app/logs/
        //http://127.0.0.1:8000/logs/
        fetch('https://81ef-91-147-254-140.ngrok-free.app/logs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://81ef-91-147-254-140.ngrok-free.app/',
            },
            body: JSON.stringify({
                "logid": localStorage.getItem('randomId'),
                "question": newMessage,
            })
            })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                
                const msg = {
                    sender: "ai",
                    message: data
                }
                setMessages(prevMessages => [...prevMessages, msg]);

                setNewMessage('');
            })
            .catch(error => {
                console.error('GET request failed:', error);
                setLoading(false);
                setNewMessage('');
            });
    };


    function generateRandomId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let ids = '';

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            ids += characters.charAt(randomIndex);
        }

        return ids;
    }

    useEffect(() => {
        const id = localStorage.getItem('randomId');

        if (id) {
            setRandomId(id);
        } else {
            const newId = generateRandomId();
            setRandomId(newId);
            localStorage.setItem('randomId', newId.toString());
        }
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className={style.chatmobile}>
                <div className={style.header}>
                    <div className="d-flex">
                        <div>
                            <img src="logo.png" alt="" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <h3>UCC Bot</h3>
                        </div>
                    </div>
                </div>
                <div className={style.chatBox}>
                    <div className={style.purple}>
                        <p>Hello! Im the UCC bot. What can i help you with?</p>
                    </div>
                    {messages.map((msg, index) => (
                        <div key={index} >
                            {msg.sender === "ai" ? (
                                <div className={style.purple} >
                                    <p>{msg.message}</p>
                                </div>
                            ) : (
                                <div className={style.blue} >
                                    <p>{msg.message}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    <div className={style.messageText}>
                        <input type="text" id='msgInput' className={style.inputBox} value={newMessage} placeholder="Type a message..." onChange={handleInputChange} />
                        <button type="submit" className={style.inputButton} onClick={handleSendMessage} disabled={loading}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}