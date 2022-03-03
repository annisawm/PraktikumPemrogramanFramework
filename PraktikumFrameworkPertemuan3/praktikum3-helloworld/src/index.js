import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HelloComponent from './components/HelloComponent';
import Test from './Test';


// function HelloComponent(){
//   return (
//   <div>
//     <h1>Hello Component</h1>
//   </div>
//   );
// }

// ReactDOM.render(<HelloComponent />, document.getElementById('root'));

// class StateFullComponent extends React.Component {
//   render() {
//     return <p>Statefull Component</p>;
//   }
// }

// const HelloComponent = () => {
//   return <p>Hello Component</p>
// }

// ReactDOM.render(<HelloComponent />, document.getElementById('root'));

// App Food Image
ReactDOM.render(<App />, document.getElementById('root'));

// Geek Codingan
// ReactDOM.render(<Test />, document.getElementById('root')); 

// Arrow function pada Folder Components
// ReactDOM.render(<HelloComponent />, document.getElementById('root')); 

// Form Login
// ReactDOM.render(<LoginComponent />, document.getElementById('root')); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
