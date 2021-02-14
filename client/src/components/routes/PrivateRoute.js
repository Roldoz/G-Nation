import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux' ;




const PrivateRoute = ({component:Component, ...rest}) =>{
 
    const authenticated = useSelector(state => state.auth.isAuth);
    const loading = useSelector((state) => state.auth.loading);
    
    // if (!authenticated && !loading ) {
    //     return <Redirect to="/login" />;
    //   } else return <Route component={Component} {...props} />
    
    return(
  <Route
    {...rest}
    render={props =>
      !authenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />
    }
  />

    )
  
   
}

export default PrivateRoute;
