import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Notifier from './containers/notifier';
import * as serviceWorker from './serviceWorker';


import { compose, createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/reducer'

import CssBaseline from '@material-ui/core/CssBaseline';


import {processQueuedAsyncActions,onlineDetected, offlineDetected} from './actions/action'




window.addEventListener('online',   (event)=>  {
	store.dispatch({type:"YOU_ARE_ONLINE"})
	store.dispatch(onlineDetected("Looks like you are back Online"))}
)
window.addEventListener('offline',  (event)=>  store.dispatch(offlineDetected("You seem to have gone offline")))


const myReduxStoreEnhancer = () => (createStore) => (reducer, preloadedState) => {

	const store = createStore(reducer, preloadedState)
	let pendingActions = []  //Storing Actions in-memory on going offline
	const dispatch = async(action) => {
		let actionReturned
		console.log("%c:: MY-REDUX-STORE-ENHANCER :: Action ::", 'background:#006064; color:#fff' ,action)

		if (action.type === "YOU_ARE_ONLINE"){ //Process all the queued up actions
			pendingActions.forEach(action => {
				store.dispatch(processQueuedAsyncActions(action.asyncItem))
			})
			pendingActions = []
			return actionReturned = store.dispatch({type:'OFFLINE_SYNC_COMPLETED'})
		}
		else {
			actionReturned = store.dispatch(action) 

			if (typeof actionReturned !== "function" && !!actionReturned){ //adding to the in-memory queue to Process for later
				 if (actionReturned.type === "PROCESS_WHEN_ONLINE"){
						pendingActions.push(actionReturned)
						console.log(actionReturned)
					}
			}
		}
		
		return actionReturned
	}
	
	store.subscribe(() => {
		console.log("%c:: MY-REDUX-STORE-ENHANCER :: State from Subscribe ::", 'background:#006064; color:#fff' ,store.getState())
		// if (!navigator.onLine){
			localStorage.setItem('persistedStore',JSON.stringify(store.getState()))
			console.log("%c:::::: PERSISTING-STORE ::::::", 'background:#000; color:orange')
		// }
	})
    
	return {
		...store,
		dispatch
	}

}



const persistedStore = JSON.parse(localStorage.getItem('persistedStore'))||{}
const store = createStore(
   reducer,
   {
       ...persistedStore,
 //      offlineLogs:new Array(),
   },
   compose(
       myReduxStoreEnhancer(),
       applyMiddleware(
           thunk,
           // myReduxMiddleware,
       ),
   )
)








ReactDOM.render(
<Provider store={store}>
	<CssBaseline />
    <App />
	<Notifier></Notifier>
</Provider>
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
