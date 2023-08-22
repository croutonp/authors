import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const CreateAuthorPage = () => {
   const [name, setName] = useState ("")
   const [errors, setErrors] = useState([])
   
   
   const navigate = useNavigate()
   const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8000/api/authors`,
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
        <h4>Add an Author</h4>
    <form onSubmit = {handleSubmit}>
        <div>
            <label>name</label>
            <input type ="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        
        <button type="submit">Create</button>
        <Link to={`/authors`}><button>Cancel</button></Link>
    </form>
    {
        errors.map((eachErr, idx)=>
        
            <p key={idx}>{eachErr}</p>
            
        )
        
    }
    </div>
  )
}



export default CreateAuthorPage