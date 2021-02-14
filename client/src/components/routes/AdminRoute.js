import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux' ;


const AdminRoute=({component:Component, ...rest}) => {

    const authenticated = useSelector(state => state.auth.isAuth);
    const loading = useSelector((state) => state.auth.loading);
    const user = useSelector((state)=> state.auth.user)


    return (
     <Route 
     {...rest}
     render={props =>
        !authenticated && !loading || (user && user.role !== 1) ? <Redirect to="/" /> :  <Component {...props} />
      }
     />
    )
}

export default AdminRoute
