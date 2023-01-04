
// import 'swiper/swiper.min.css';
import { React, useState, useEffect } from 'react';
import './App.css';
import './css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import routes from './pages/Route'
import AuthContext from './context/authContext';

import authAPI from './services/authAPI';


function App(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated)

  
  
    
    return (
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,}}>
                    <Routes >
                        <Route component={App} >
                            {
                            routes.map((data, index) => (
                                <Route exact={true} path={data.path} element={data.component} key={index} />
                            
                            ))
                            
                            }
                        </Route>
                    
                    </Routes>
            </AuthContext.Provider>

    );
}

export default App;

