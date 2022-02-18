import { useState } from 'react';

const users = [
    { name: 'Hello', age: 20 },
    { name: 'There', age: 20 },
    { name: 'World', age: 20 },
];

const UserSearch: React.FC = () => {
    const [name, setName] = useState('');
    const [user, setUser] = useState<{ name: string, age: number } | undefined>(); // Two types of values/results from a search

    const onClick = () => {
        const foundUser = users.find((user) => {
            return user.name === name; // Connect the result of the search to the `foundUser` variable
        });

        setUser(foundUser);
    };

    return <div>
        User Search
        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={onClick}>Find User</button>
        <div>
            {user && user.name}
            {user && user.age}
        </div>
    </div>;
}

export default UserSearch;