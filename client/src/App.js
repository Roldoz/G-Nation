import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "antd/dist/antd.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import store from "./js/store";
import setToken from "./js/actions/setToken";
import { loadUser } from "./js/actions/authAction";
import Dashboard from "./components/profile/Dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import PrivateRoute from "./components/routes/PrivateRoute";
import EditProfile from "./components/profile/EditProfile";
import Profile from "./components/profile/Profile";
import Collections from "./components/collections/Collections";
import Collection from "./components/collections/Collection";
import Snake from "./components/Game/Snake";
import AdminRoute from "./components/routes/AdminRoute";
import AddGame from './components/games/AddGame';
import Games from "./components/games/Games";
import Gameplays from "./components/gameplays/Gameplays";
import Footer from "./components/layout/Footer";
import EditGame from "./components/games/EditGame";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Navbar />

      <Alert />

      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/collections" component={Collections} />
        <PrivateRoute exact path="/mini-game" component={Snake} />
        <PrivateRoute exact path="/collections/:id" component={Collection} />
        <PrivateRoute exact path="/games" component={Games} />
        <PrivateRoute exact path="/gameplays" component={Gameplays} />
        <AdminRoute exact path='/add-game' component={AddGame} />
        <AdminRoute exact path='/edit-game/:id' component={EditGame}/>
      </Switch>
      <Footer />
    </Provider>
  );
}

export default App;
