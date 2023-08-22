import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom';

const UpdateAuthorPage = () => {
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    
 
 
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(response => {
                console.log(response.data)
                const author = response.data
                setName(author.name)
                
            })
            .catch(err => console.log(err))
    }, [])
 

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/authors/${id}`,
            {
                name: name
            })
            .then(response => {
                navigate(`/authors`)
            })
            .catch(err => {
                const errResponse = err.response.data.errors
    
                const errArr = []
                for(const eachKey in errResponse){
                    errArr.push(errResponse[eachKey].message)
                }
                setErrors(errArr)
            })
    }
 
 
  return (
    
    <div>
        <div>
   <h4>Edit Author</h4>
   <form onSubmit={handleSubmit}>
       <div>
           <label>Name</label>
           <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
       </div>
       
       <button type="submit">Edit</button>
       <Link to={`/authors`}><button>Cancel</button></Link>
   </form>
   {
        errors.map((eachErr, idx)=>
        
            <p key={idx}>{eachErr}</p>
            
        )
        
    }

</div>

    </div>
  )
}

export default UpdateAuthorPage