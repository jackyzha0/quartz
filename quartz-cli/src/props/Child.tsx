interface ChildProps {
    colour: string;
    onClick: () => void;
}

export const Child = ({ colour, onClick }: ChildProps) => {
    return <div>
        {colour}
        <button onClick={onClick}>Click me</button>
    </div>
};

export const ChildAsReactFC: React.FC<ChildProps> = ({ colour, onClick, children }) => {
    return <div>
        {colour}
        <button onClick={onClick}>Click me</button>
    </div>
};

//ChildAsReactFC.displayName = 'ChildAsReactFC';