import React from 'react'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { updateProfile } from '../../actions/users'
import { signUp } from '../../api'



const EditProfileForm = ({currentUser , Switch,setSwitch }) => {

    const [name, setName] = useState(currentUser?.result?.name)
    const [about,setAbout] = useState(currentUser?.result?.about);
    const [tags,setTags] = useState('');

    const disptach = useDispatch();
    const navigate = useNavigate();

    const cancel =()=>{
        console.log("clicked");
        console.log(setSwitch);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(tags.length=== 0){
          disptach(updateProfile(currentUser?.result?._id,{name,about , tags: currentUser?.result?.tags}));
        }else{
          disptach(updateProfile(currentUser?.result?._id,{name,about,tags}));
        }   

      setSwitch(false);
    }
  return (
    <div>
      <h1 className='edit-profile-title'>
        Edit Your Profile
      </h1>
      <h2 className='edit-profile-title-2'>
        Public Information
      </h2>
      <form  className="edit-profile-form" onSubmit={handleSubmit}>

        <label htmlFor="name">
            <h3>Display Name</h3>
            <input type="text"  value={name} onChange={(e)=>{setName(e.target.value)}}/>
        </label>

        <label htmlFor="about">
            <h3>About Me</h3>
            <textarea name="" id="about" cols="30" rows="10" value={about} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
        </label>

        <label htmlFor="tags">
            <h3>Watched Tags</h3>
            <p>Add tags seperated by  1 space</p>
            <input type="text " id='tags' value={tags} onChange={(e)=>{setTags(e.target.value)}}/>
        </label><br/>

        <input type="submit" value="Save Profile"  className='user-submit-btn'/>

      </form>
    </div>
  )
}

export default EditProfileForm
