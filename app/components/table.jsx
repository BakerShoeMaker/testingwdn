import { useState, useEffect } from "react";
import axios from "axios";
import {format} from 'date-fns';
import { Dropdown } from "react-bootstrap";
//import { post } from "jquery";

export default function Table()
{
   {/* Run this code to populate the menu with different api end point, runs only once*/}
   //let dropDownMenueValue = "";
    let itemsInDropDown = ['Test topic: 1','Test topic: 2','Test topic: 3'];
    const [posts, setPosts] = useState([]);
    const [dropDownSelected, setDropDownSelected] = useState('No Subject Selected'); 
    const [dataLoaded, setDataLoaded] = useState(false);
    const dataDownloadedFromServer = {};
    //let dataLoaded = false;
    function testFunction(){
        console.log("the item was selected!!!");
    }
   
   async function handleClick(valuePassedFromDropDown)
   {
        await axios.get('/api/loadprompts')
        .then(res=>{                   
            setPosts(res.data.text);
            //setSubjectSelected(res.data.text[0].subject);
            console.log("Item selected: " + valuePassedFromDropDown);
            console.log(res.data);          
        })
        .catch(err => {console.log(err)})
        .then(setDropDownSelected(valuePassedFromDropDown))         
   }
   
   function showSubject(valueSelectedFromDropDown){        
        //setDropDownSelected(value);
        console.log(valueSelectedFromDropDown);
        setDataLoaded(true);
        console.log(dataLoaded);
        handleClick(valueSelectedFromDropDown);
   }
    return(
        <div >           
           <div className= "row pb-1"> 
               <div className='col-4'>
                 {/*-------------- DROPDOWN MENU START (React-Bootstrap component) --------------*/}
                <Dropdown onSelect={showSubject}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Subject
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                       {
                        itemsInDropDown.map((item, index)=> {
                            return <Dropdown.Item eventKey= {item} >{item}</Dropdown.Item>
                        })
                       }
                    </Dropdown.Menu>
                </Dropdown>             
                {/*-------------- DROPDOWN MENU END --------------*/}                 
                </div> 
                <div className=" col-8 justify-content-right" >
                    Subject selected: <b> {dropDownSelected}</b>                   
                </div>             
            </div>
            {
                dataLoaded == false ? <div className = "row pt-4">  
                    <div className="col-2"></div>
                    <div className="col-8">No data loaded. Please select a subject</div>
                    <div className="col-2"></div> 
                </div> :
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date </th>
                            <th scope="col"> Writing Prompt</th>
                            <th scope="col"> Subject</th>
                            <th scope = "col"> Topic </th>                   
                        </tr>
                    </thead>
                    <tbody>                    
                        {
                            //data goes in this table.
                            <tr key= {1}>
                                <th scope="row">1</th>
                                <td>8/11/23</td> 
                                <td> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "</td>
                                <td> Computer Science</td>
                                <td> Python</td>                                                                                     
                            </tr>
                        }
                    </tbody>
                </table>
            }
        </div>        
   )  
}
    // <tbody>                    
    //     {
    //             dataLoaded == false ? <div className = "col pt-4 ">  No data loaded. Please select a subject </div> :                         
                
    //             posts.map( (post, num)=>(
    //             <tr key={post._id}>
    //                 <th scope="row">{num +1}</th>
    //                 <td>{format(new Date(post.date_added), 'MM/dd/yyyy')}</td> 
    //                 <td> {post.writing_prompt}</td>
    //                 <td> {post.subject}</td>
    //                 <td> {post.topic}</td>                                                                                     
    //             </tr>
    //             )                            
    //             )        
    //     }
    // </tbody>
//export const dropDownMenueValue = "hello" ;
