import ReactDOM from 'react-dom';
import UserSearch from './state/UserSearch'

const App = () => {
  return (
    <div>
      <UserSearch />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));