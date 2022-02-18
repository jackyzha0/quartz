import { useState } from 'react';

const List: React.FC = () => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState<string[]>([]);

    const onClick = () => {
        setName('');
        setUsers([...users, name]); // Take current users array and add current name to the end

    }

    return (
        <div>
            <h3>List</h3>
            <ul>
                {users.map(user => <li key={user}>{user}</li>)}
            </ul>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={onClick}>Add item</button>
        </div>
    );
};

export default List;