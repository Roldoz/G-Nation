import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE,ERROR_PROFILE, DELETE_ACCOUNT,CLEAR_PROFILE} from './actionTypes';


//Get profile
export const getProfile = () => async dispatch =>{
try {
    const res = await axios.get('/api/profile/me');
dispatch({
    type : GET_PROFILE,
    payload : res.data
})

} catch (err) {
    dispatch({
        type : ERROR_PROFILE,
        payload: { msg : err.response.statusText, status: err.response.status }
    })
}
}

//Create / update profile
export const createProfile= (formData,history,edit=false) => async dispatch =>{

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile',formData,config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
            });
            
            dispatch(
            setAlert(edit ? "Profile Updated " : "Profile Created", "success")
            );
            
            if (edit || !edit) {
            history.push("/dashboard");
            }
    } catch (err) {
        const errors = err.response.data.errors;
	
	if (errors) {
	errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
	}
	dispatch({
	type: ERROR_PROFILE,
	payload: { msg: err.response.statusText, status: err.response.status }
	});
    }
};

//Get profile by user id
export const getProfileById = userId => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
        type : GET_PROFILE,
        payload : res.data
    })
    
    } catch (err) {
        dispatch({
            type : ERROR_PROFILE,
            payload: { msg : err.response.statusText, status: err.response.status }
        })
    }
    }
    



// Delete profile
export const deleteAccount = () => async dispatch =>{
if(window.confirm('Do you really want to delete your account ?')){

try {
    
await axios.delete('/api/profile');

dispatch({ type: CLEAR_PROFILE });
dispatch({ type: DELETE_ACCOUNT });
dispatch(setAlert("Your account has been removed", "danger"));

} catch (err) {
    dispatch({
        type: ERROR_PROFILE,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
}

}
}