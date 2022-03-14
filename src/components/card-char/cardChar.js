import './cardChar.css';

function CardChar(){
    return(
        <div className='card'>
            <img src={require('../../resources/img/fotoForFon.jpg')} alt="img person" />
        </div>
    )
}

export default CardChar;