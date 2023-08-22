import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const DashboardPage = () => {
    const [authorList, setAuthorsList] = useState([])    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors`)
        .then(response => setAuthorsList(response.data))
        .catch(err=>console.log(err))


    }, [])
 
    const removeFromDom = (deleteId) => {
        const filteredList = authorList.filter((eachAuthor, idx) => eachAuthor._id !== deleteId )
        setAuthorsList(filteredList)
    }
 
 
    const handleDelete = (deleteId) =>{
        axios.delete(`http://localhost:8000/api/authors/${deleteId}`)
        // .then(response =>
        //     
        //     ) --->this method will only show you the deleted ones when you refresh because it has the same link as the dashboard
        .then(response => {
            removeFromDom(deleteId);
        })
        .catch(err => console.log(err))
    }
 
 
  return (
    <div>
        <h1>Authors</h1>
        <Link to="/authors/new">Add an author</Link>
        <table>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Actions available</th>
                </tr>
            </thead>
            <tbody>
                {
                    authorList.map((eachAuthor, idx)=>(
                        <tr key={eachAuthor._id}>
                            <td>{eachAuthor.name}</td>
                            <td>
                                <Link to={`/authors/${eachAuthor._id}/edit`}><button>Edit</button></Link>
                            </td>
                            <td>
                                 <button onClick={()=>{handleDelete(eachAuthor._id)}} >Delete</button>    
                            </td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
       </div>


  )
}



        
        
        
           

export default DashboardPage