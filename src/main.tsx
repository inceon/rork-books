import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {App} from './App.tsx';
import {addAccessTokenInterceptor} from "./services/apiService.ts";
import 'react-toastify/dist/ReactToastify.css';

addAccessTokenInterceptor();
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HashRouter>
			<App/>
		</HashRouter>
		<ToastContainer/>
	</React.StrictMode>
);
