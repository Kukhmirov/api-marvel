import { Component } from 'react';
import MarvelService from '../../servises/MarvelService';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import './randomChar.css';

class RandomChar extends Component{
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false,
            error: false
        })
    }

    componentDidMount(){
        this.updateChar();
    }

    componentWillUnmount(){
        console.log(2);
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacters(id)
            .then(res => {
                if(!this.state.error){
                    this.onCharLoaded(res);
                } else if(this.state.error){
                    this.setState(({error: !this.state.error}));
                    this.onCharLoaded(res);
                }
            })
            .catch(this.onError);

        
    };


    render(){
        const {char, loading, error} = this.state;
        
        // проверяем state на шибки и загрузку

        const errorMessage = error? <Error/> : null;
        const spinner = loading? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        // -----------------------------------------

        return(
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">Random character for today!
                        Do you want to get to know him better?</p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>    
                    </button>
                </div>
            </div>
        )
    }
    
};

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    // обрезка текста 

    let textDescr = null;
    let textName = name.slice(0, 23);
    if(textName.length < name.length){
        textName += '...';
    }
    if(description){
        textDescr = description.slice(0, 210);
        if(textDescr.length < description.length){
            textDescr += '...';
        }
    } else if(!description){
        textDescr = "К сожалению информация о персонаже отсутсвует"
    }

    // изменение параметров картинки/заглушки

    let styleObjectFit = 'cover';
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
         styleObjectFit = 'contain'
    }
    // -------------------------------------
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="logo person" className="randomchar__img" style={{objectFit: styleObjectFit}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{textName}</p>
                <p className="randomchar__descr">{textDescr}</p>    
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div> 
    )
};

export default RandomChar;