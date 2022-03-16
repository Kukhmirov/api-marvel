import { Component } from 'react';

import MarvelService from '../../servises/MarvelService'
import Skeleton from '../skeleton/skeleton';
import Error from '../error/error';
import Spinner from '../spinner/spinner';
import './fullInformation.css';


class FullInformation extends Component {
    state = {
        char: null,
        error: false,
        loading: false
    }
    
    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.charSelected !== prevProps.charSelected)
        {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charSelected} = this.props;
        if(!charSelected){
            return;
        }

        this.onCharLoading();

        this.marvelService.getCharacters(charSelected)
                          .then(this.onCharLoaded)
                          .catch(this.onError);
    };

    onCharLoading = () => {
        this.setState({loading: true})
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    render(){
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;


        return(
            <div className="info__item">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {thumbnail, name, homepage, wiki, description, comics} = char;

    const comicsList = comics.map((item, index) => {
        // eslint-disable-next-line
        if(index > 9)  return;
        return (
            <li key={index}><a href={item.resourceURI}>{item.name}</a></li>
        )
        
    })
    
    const sceletonComics = comics.length !== 0 ? comicsList : "К сожалению информация о комиксах отсутствует";
    const sceletonDescription = description ? description : "К сожалению на данный момент информация отсутсвует";

    return (
        <div className="fullCard">
            <div className="fullCard__header">
                <div className="fullCard__img">
                    <img src={thumbnail} alt={name + `img`} />
                </div>
                <div className="fullCard__title">
                    <div className="fullCard__name">
                        {name}
                    </div>
                    <div className="fullCard__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="fullCard__descr">
                {sceletonDescription}
            </div>
            <ul className="fullCard__comics">
                <div className="fullCard__name fullCard__name--comics">Comics</div>
                {sceletonComics}
            </ul> 
        </div> 
    )
}

export default FullInformation;