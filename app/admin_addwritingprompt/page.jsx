//POST API
//Get values of dropdown menus and the text area box.
//Upload those values to the database
"use client";
import Head from 'next/head';
import Link from 'next/link';
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { Dropdown, InputGroup, Form } from "react-bootstrap";


export default function AdminAddWritingPrompt(){

    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [promptType, setPromptType] = useState("");
    const [writingPrompt, setWritingPrompt] = useState("");
    var date = "March 25, 2022";
    
    const dataOutGoingToServer = {
        subject: subject,
        topic: topic,
        date_added: new Date().toISOString(),
        type: promptType,
        writing_prompt: writingPrompt
    }

    useEffect( ()=>{setSubject(subject)}, [subject]);

    
     async function handleSaveClick (e)
    {
        e.preventDefault();
        console.log("Function has started...............");
        console.table(dataOutGoingToServer);
        if(dataOutGoingToServer.subject == "")
        {
            alert("⚠️You must select a subject.");
        }
        else if( dataOutGoingToServer.type =="")
        {
            alert("⚠️ You must select a type")
        }
        else if(dataOutGoingToServer.writing_prompt == "")
        {
            alert("⚠️ You must enter a writing prompt.")
        }
        else if(dataOutGoingToServer.topic == "")
        {
            alert("⚠️ You must enter a topic.")
        }
        try{
            
            const jsonData = JSON.stringify(dataOutGoingToServer);
            console.log("Client data: " + jsonData);
            console.log("Client: Data type: " + typeof jsonData);
            console.table(jsonData)
            //1/4/23: Date is json when sent through api -- there is a problem when it arrives at the api file.
            const res = await fetch("/api/postprompts/",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"},
                body: jsonData,
            } );
        }
        catch(error){console.log(error)}        
    }   
        
    
    function dropDownValueSubject(valueSelectedFromDropDownMenu)
    {
            setSubject(valueSelectedFromDropDownMenu);            
            console.log("Subject is: " , subject);
    }

    function dropDownValueType(valueSelectedFromDropDownMenu)
    {
        setPromptType(valueSelectedFromDropDownMenu);
        console.log("Type is: ", valueSelectedFromDropDownMenu);
    
    }
    function inputTopicValue(valueFromInputBox)
    {
        setTopic(valueFromInputBox)
        console.log(valueFromInputBox)
    }
    function textAreaWritingPrompt(valueFromInputBox)
    {
        setWritingPrompt(valueFromInputBox);
        console.log(valueFromInputBox);
        showDataObject();
    }
    function showDataObject()
    {
        console.table(dataOutGoingToServer);

    }
    
   
    return(
        <div>
            <Head>
                <title>Add Prompt</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <div className = "container"> 
                <div className="col-2"></div>
                
                <div className="row pt-4" > 
                    <p><Link className = "text-decoration-none" href="/admin"> Home </Link> &gt;<Link href="/admin/admin_view_writing_prompt">View Prompts</Link>&gt; Add Prompts </p>
                </div>
                <hr/>                                              
                {/* Must select subject and category to add a writing prompt*/}
             
                    <div className="row pb-3 pt-4"><h5><b>Add Writing Prompt </b></h5></div>
                        <form onSubmit={ handleSaveClick}className="col-9 justify-content-center">
                            <div className="row justify-content-center">
                                <div className="col-3">
                                    {/*-------------- DROPDOWN MENU START (React-Bootstrap component) --------------*/}
                                        <Dropdown onSelect={dropDownValueSubject}>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Select Subject
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {/* Map function here to populate the menu*/}
                                                <Dropdown.Item eventKey="Computer Science: Python" >Computer Science: Python</Dropdown.Item>
                                                <Dropdown.Item eventKey="Computer Science: Java">Computer Science: Java</Dropdown.Item>
                                                <Dropdown.Item eventKey="Economics">Economics</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>             
                                    {/*-------------- DROPDOWN MENU END --------------*/}                                                                    
                                </div>
                                <div className="col-3">
                                    {/*-------------- DROPDOWN MENU START (React-Bootstrap component) --------------*/}
                                        <Dropdown onSelect={dropDownValueType}>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Select type
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {/* Map function here to populate the menu*/}
                                                <Dropdown.Item eventKey="Text" >Text</Dropdown.Item>
                                                <Dropdown.Item eventKey="Video">Video</Dropdown.Item>
                                                <Dropdown.Item eventKey="Image">Image</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>             
                                    {/*-------------- DROPDOWN MENU END --------------*/}                                                                    
                                </div>
                                <div className="col-6">
                                    
                                    <InputGroup className="mb-3">                                        
                                        <Form.Control
                                            placeholder="Enter topic"
                                            aria-label="Enter topic"
                                            onChange = { e=> inputTopicValue(e.target.value)}
                                        />
                                    </InputGroup>                                                          
                                </div>                                                             
                            </div>
                            <div className="row justify-content-center p-3">
                                <div className="col">
                                    <h5 className="pb-2">Writing Prompt</h5>
                                    <textarea 
                                        className="form-control" 
                                        id="response" 
                                        rows="4" 
                                        onChange = { e=> textAreaWritingPrompt(e.target.value)}                                    
                                    ></textarea>
                                </div>             
                            </div>
                            <div className="row justify-content-end pt-4">                    
                                {/*{<button type="submit" className="btn btn-primary" onClick={handleSaveClick}>Save</button>}*/}
                                {<button type="submit" className="btn btn-primary" >Save</button>}
                            </div>                                                
                        </form>               
                    </div>               
              </div>
          
    )
}