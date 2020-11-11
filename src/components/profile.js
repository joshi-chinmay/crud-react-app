import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import _ from 'lodash';

function Profile(props) {
  let { uuid } = useParams();
  const [currentProfile, setCurrentProfile] = useState(getProfile());

  function getProfile() {
    const profile = _.find(props.globalDB, { 'uuid': uuid });
  
    // if page is refreshed unexpectedly, push to home page
    if( !profile ) {
      window.location.replace("/");
    }

    return profile;
  };

  function handleChange(event) {
    setCurrentProfile({
      ...currentProfile,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit() {
    props.updateProfile(currentProfile);
  };

  return (
    <div className="container">
      <label className="control-label">Name</label>
      <input type="text" className="form-control" name="name" value={currentProfile.name} onChange={handleChange} autoFocus autoComplete="off" />

      <label className="control-label">Birth Year</label>
      <input type="text" className="form-control" name="birth_year" value={currentProfile.birth_year} onChange={handleChange} autoComplete="off" />

      <label className="control-label">Gender</label>
      <input type="text" className="form-control" name="gender" value={currentProfile.gender} onChange={handleChange} autoComplete="off" />

      <label className="control-label">Hair Color</label>
      <input type="text" className="form-control" name="hair_color" value={currentProfile.hair_color} onChange={handleChange} autoComplete="off" />

      <button onClick={handleSubmit}>
        Save
      </button>
      &nbsp;&nbsp;
      <Link to="/">cancel</Link>
    </div>
  )
}

export default Profile;