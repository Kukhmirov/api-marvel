import { Component } from 'react';
import RandomChar from '../char-random/randomChar';
import RandomList from '../random-list/randomList';
import FullInformation from '../full-information/fullInformation';

import '../style/button.css'
import '../random-list/randomList.css'
import './app.css';

class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({selectedChar: id})
    }

    render(){
        return(
            <div className="app">
                <RandomChar/>
                <div className="info">
                    <RandomList onCharSelected={this.onCharSelected}/>
                    <FullInformation charSelected={this.state.selectedChar}/>
                </div>
                
            </div>
        )
    }
    
}

export default App;