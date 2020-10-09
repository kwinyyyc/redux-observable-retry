import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser} from './rootEpic'

function App() {
  const dispatch = useDispatch();
  const [ username, setUsername] = React.useState('');

  const githubUser = useSelector((state) => state.githubUser);

  const onChangeInput = (event) => {
    setUsername(event.target.value)
  }

  const onClickButton = () => {
    dispatch(fetchUser(username));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input value={username} onChange={onChangeInput}></input>
        <button onClick={onClickButton}>Fetch from github</button>
        <p>{githubUser?.name}</p>
      </header>
    </div>
  );
}

export default App;
