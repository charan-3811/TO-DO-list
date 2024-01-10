import React, { useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';


const UpdateTask = () => {
    // Access the 'id' parameter from the URL
    const [val,setVal]=useState("enter text to be updated")
    const { parameter } = useParams();

    const updatingBack=async ()=>{
        console.log(parameter)
        await axios.post("http://localhost:3050/update",{
            id:parameter,
            name:val})
            .catch(error => console.log(error));

    }


    function handleChange(x)
    {
        setVal(x)
    }

    return (
        <div>
            <h2>Update Task</h2>
            <input type={"text"} placeholder={val} onChange={(e) => handleChange(e.target.value)}/>
            <Link to={`/`}>
                <input type={"button"} value="cancel" />
            </Link>
            <Link to={'/'}><input type={"button"} value={"submit"} onClick={updatingBack}/></Link>
        </div>
    );
};

export default UpdateTask;