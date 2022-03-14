import { Component } from 'react';
import './fullInformation.css'
import MarvelService from '../../servises/MarvelService'

class FullInformation extends Component {
    state = {
        id: null,
        error: false,
        spinner: true
    }
    
    marvelService = new MarvelService();

    render(){
        this.setState({id: this.props.charSelected})
        return(
            <div className="info__item">
                <div className="fullCard">
                    <div className="fullCard__header">
                        <div className="fullCard__img">
                            {/* <img src={thumbnail} alt="img hero" /> */}
                        </div>
                        <div className="fullCard__title">
                            <div className="fullCard__name">
                                {/* {name} */}
                            </div>
                            <div className="fullCard__btns">
                                <a href='#' className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href='#' className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="fullCard__descr">
                        {/* {description} */}
                    </div>
                    <div className="fullCard__items"></div> 
                </div> 
            </div>
        )
    }
    
}

export default FullInformation;