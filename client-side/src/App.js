import React from 'react';
import {Container} from '@material-ui/core';
import ParticlesContainer from './Components/ParticlesContainer'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth'
import { BrowserRouter, Switch, Route } from 'react-router-dom';




const App = () =>{
    return (
        <BrowserRouter>
        <Container maxidth="lg">
            <ParticlesContainer className="particles"/>
            <div
                style={{ 
                position: "absolute",
                top: 10 ,
                left: 10 ,
                width: "100%",
                height: "100%"
                }}
            >
            <Navbar/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/auth' component={Auth}/>
            </Switch>
            </div>
        </Container>
        </BrowserRouter>
    );
}

export default App;