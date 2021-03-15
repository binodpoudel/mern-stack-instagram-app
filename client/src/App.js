import React,{useEffect,createContext,useReducer,useContext} from 'react';
import "./App.css"
import NavBar from '../src/components/Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import { Home, CreatePost, Profile, SignIn, Signup, Reset, } from '../src/screens/index';
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './screens/UserProfile'
import SubscribedUserPosts from './screens/SubscribesUserPosts'
import NewPassword from './screens/Newpassword'
/// here Add context
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const { dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;