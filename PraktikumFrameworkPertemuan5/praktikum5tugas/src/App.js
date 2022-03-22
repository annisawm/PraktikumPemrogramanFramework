import React from "react";
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

export default function AuthExample(){
  return(
    <Router>
      <div>
        <AuthButton />

        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/private">Private Page</Link>
          </li>
        </ul>

        <Switch>
         <Route path="/public">
           <PublicPage />
         </Route>
         <Route path="/login">
           <LoginPage />
         </Route>
         <PrivateRoute path="/private">
           <ProtectedPage />
           <Barangs />
         </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb,100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb,100);
  }
};

function AuthButton() {  
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      {" Welcome! "}
      <button 
      onClick={() => {
        fakeAuth.signout(() => history.push("/"));
      }}
    >
      Sign Out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// Pembungkus untuk <Route> yang mengarahkan ke login
// tampilan jika Anda belum terkonfirmasi

function PrivateRoute({ children, ...rest }) {  
  return(
    <Route 
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: "/login",
                state: { from: location }
              }} 
            />      
          )
        }
      />
    );
  }

  function PublicPage() {      
    return <h3>Welcome To Our Shop!</h3>;
  }

  function ProtectedPage() {    
    return <h3>Happy Shopping!</h3>;
  }

  function LoginPage() {    
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/"} };
    let login = () => {
      fakeAuth.authenticate(() => {
        history.replace(from);
      });
  };

  return (
    <div>
      <p>You must log in to view the catalog</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

function Barangs(){
  // `path` untuk membuat jalur <Route> terhadap rute induk,
  // `url` untuk membuat link.
  let{ path, url } = useRouteMatch();
  return(
    <div>
      <h2>Stuff</h2>
      <ul>
        <li>
          <Link to={`${url}/Long Dress, Dress, Shirt`}>Shirt</Link>
        </li>
        <li>
          <Link to={`${url}/High Heels, Flat Shoes, Pantofel`}>Shoes</Link>
        </li>
        <li>
          <Link to={`${url}/Watch, Scarf`}>Accessories</Link>
        </li>
      </ul>  
      <Switch>
        <Route exact path={path}>
          <h3>Please Select The Categories.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
 }
 
 function Topic(){
   let{ topicId } = useParams();
 
   return(
     <div>
       <h3>{topicId}</h3>
     </div>
   );
 }
