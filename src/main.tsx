import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {App} from './App.tsx';
import {addAccessTokenInterceptor} from "./services/apiService.ts";
import 'react-toastify/dist/ReactToastify.css';

addAccessTokenInterceptor();
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
		<ToastContainer/>
	</React.StrictMode>
);
