import { Component } from 'react';
import MarvelService from '../../servises/MarvelService';
import Error from '../error/error';
import Spinner from '../spinner/spinner';

import './randomList.css';

class RandomList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 200,
        charEnd: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest();
    }

    onCharListLoaded(newCharList) {
        let end = false;
        if(newCharList.length < 9){
            end = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnd: end
        }));
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(res => this.onCharListLoaded(res))
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    renderItems(arr){
        const items = arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit' : 'unset'};
            }
            return(
                <li className='card' key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt="img person"style={imgStyle} />
                    <div className="card__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className='info__card'>
                {items}
            </ul>
        )
    }

    render(){
        const {charList, error, loading, newItemLoading, offset, charEnd} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        
        return(
            <div className='info__wrapper'>
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className='button button__list' 
                    disabled={newItemLoading}
                    style={{'display': charEnd? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">add</div>
                </button>
            </div>
            
        )
    }
    
}

export default RandomList;