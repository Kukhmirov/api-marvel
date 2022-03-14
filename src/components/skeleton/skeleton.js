import './skeleton.css';

const Skeleton = () => {
    return (
        <div className='sceleton__wrapper'>  
            <p className='char__select'>Please select a character to see information</p>
            <div className="sceleton">
                <div className="pulse sceleton__header">
                    <div className="pulse sceleton__circle"></div>
                    <div className="pulse sceleton__mini"></div>
                </div>
                <div className="pulse sceleton__block"></div>
                <div className="pulse sceleton__block"></div>
                <div className="pulse sceleton__block"></div>
            </div>
        </div>
    )
}

export default Skeleton;