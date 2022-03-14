import { Component } from 'react';
import MarvelService from '../../servises/MarvelService';
import Error from '../error/error';
import Spinner from '../spinner/spinner';

import './randomList.css';

class RandomList extends Component {
    state = {
        charList: [],
        countCard: 12,
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.marvelService.getAllCharacters()
                          .then(res => this.onCharListLoaded(res))
    }

    onCharListLoaded(charList) {
        this.setState({
            charList,
            loading: false
        });
    }

    addCardCount = () => {
        this.setState(({countCard: this.state.countCard + 4}))
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
        const {charList, error, loading} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return(
            <div className='info__wrapper'>
                {errorMessage}
                {spinner}
                {content}
                <button className='button button__main' onClick={this.addCardCount}>
                    <div className="inner">add</div>
                </button>
            </div>
            
        )
    }
    
}

export default RandomList;