import { Component } from 'react';
import RandomChar from '../char-random/randomChar';
import RandomList from '../random-list/randomList';
import FullInformation from '../full-information/fullInformation';
import ErrorBoundary from '../error-boundary/errorBoundary';

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
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="info">
                    <ErrorBoundary>
                        <RandomList onCharSelected={this.onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <FullInformation charSelected={this.state.selectedChar}/>
                    </ErrorBoundary>
                </div>
                
            </div>
        )
    }
    
}

export default App;