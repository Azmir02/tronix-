import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './Components/App';
import {BrowserRouter} from "react-router-dom";
import { Storeprovider } from './Components/Store';
import 'swiper/css';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Storeprovider><BrowserRouter><App /></BrowserRouter></Storeprovider>);
