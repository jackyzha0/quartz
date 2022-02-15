import { useState } from 'react';

const List: React.FC = () => {
    const [name, setName] = useState('');

    return (
        <div>
            <h3>List</h3>

            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button>Add item</button>
        </div>
    );
};

export default List;