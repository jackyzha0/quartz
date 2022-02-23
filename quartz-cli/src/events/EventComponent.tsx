const EventComponent: React.FC = () => {
    const onChange = (e) => {
        console.log(e);
    }

    return <div>
        <input onChange={onChange} />
    </div>
};

export default EventComponent;