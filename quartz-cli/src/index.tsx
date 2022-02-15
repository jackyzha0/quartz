import ReactDOM from 'react-dom';
import List from './state/List';

const App = () => {
  return (
    <div>
      <List />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));