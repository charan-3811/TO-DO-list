
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
    const [items,setItems]=useState([])
    const [newItem,setNewItem]=useState()

    const AddingBack=async ()=>{
        await axios.post("http://localhost:3050/add",{name:newItem})
            .catch(error => console.log(error));

    }


    useEffect(() => {
        axios.get("http://localhost:3050/view")
            .then(response => setItems(response.data))
            .catch(error => console.log(error));

    }, [AddingBack]);
    function handleAdd(x){
        setNewItem(x)

    }

    async function handleDelete(x){
        await axios.post("http://localhost:3050/delete",{id:x})
            .catch(error => console.log(error));
    }


    return (
        <div className={"lists"}>
            <h1>TODO</h1>
            <input type={"text"} placeholder={"add text"} value={newItem}  onChange={(e) => handleAdd(e.target.value)}/>
            <input type={"button"} value={"ADD"} onClick={AddingBack}/>
            <div className={"list_items"}>
                <ul>
                    {items.map((item) => (
                        <li className={"list_item"} key={item._id}>
                            <div className={"items"}>
                                <div className={"item"}>{item.name}</div>
                                <Link to={`/update/${item._id}`}>
                                    <input type={"button"} value="update" />
                                </Link>
                                <input type={"button"} value={"delete"} onClick={()=>handleDelete(item._id)}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    );
};
export default List;

