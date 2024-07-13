import React from 'react';
import ReactDOM from 'react-dom';
import Ml5tmimg from './Teachable_Machine/Ml5tmimg';

class App extends React.Component {
		// Classifier Variable
		
	onPredictionsTM_img = (value) => {
			//console.log("onPredictionsTM_img :",value)
	};
	
	render() {
		
		let imageModelURL = 'https://teachablemachine.withgoogle.com/models/YLhzhPpbA/';
	
		return (
			<div className="App">
				<Ml5tmimg callback={this.onPredictionsTM_img}  modelUrl={imageModelURL}/>
			</div>
		);
	}
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
