import './App.css';
import {Component} from 'react';
import icon from './image/CovidIcon.png'
import heart from './image/heart.png'
import skull from './image/skull.png'
import aid from './image/aid.png'

class App extends Component{

  constructor(props){
  super(props);
  this.state = {
    Countries : [],
    message:'',
    search : ''
  }
  this.handleChange = this.handleChange.bind(this)
}

handleChange(event) {
    this.setState({search: event.target.value});
  }

async componentDidMount(){
  const Countries = await new Promise((res) => {
    fetch('https://api.covid19api.com/summary')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          this.setState({
    Countries : data.Countries
  })
      });
  });
  }

messageClear(){
  this.setState({
    message: ''
  })
}

Message(Country){
var message =  <div className="message-wrapper">
    <div className="message">
      <h3>{Country.Country}</h3>
      <div> 
        <div className="statistics">
          <span><img src={heart} alt="heart" width="16px" height="16px"/> Total Confirmed : </span>
          <span>{Country.TotalConfirmed}</span>
        </div>
        <div className="statistics">
          <span><img src={skull} alt="skull" width="16px" height="16px"/> Total Deaths : </span>
          <span> {Country.TotalDeaths}</span>
        </div>
        <div className="statistics">
          <span><img src={aid} alt="aid" width="16px" height="16px"/> Total Recovered : </span>
          <span> {Country.TotalRecovered}</span>
        </div>
      </div>          
      <button onClick={this.messageClear.bind(this)}>Ok</button>
    </div>
  </div>;
  this.setState({
    message: message
  })
}

 render(){
    const SearchCountry = this.state.Countries.filter(country => {
      return country.Country.toLowerCase(0).includes(this.state.search.toLowerCase())
    })
    const CountriesItems = SearchCountry.map((Country, index)=>
      <div key={index}>
        <button onClick={this.Message.bind(this , Country)}>
          <li>
            <div className="flexCountry">
              <div className="countries"></div>
              <span>{Country.Country}</span>
            </div>
            <span className="TotalConfirmed">{Country.TotalConfirmed}</span>
          </li>
        </button>
      </div>)
    return(
      <div className="App">
        <div className="title">
          <div className="logo"><img src={icon} alt="Covid-19" width="150px" height="150px"/><h1>Statistics</h1></div>
          <input type="text" placeholder="Search..." onChange={this.handleChange}/>
        </div>
        <div>{this.state.message}</div>
        <ul>
          <li className="List">
            <div className="flexCountry"><div className="counter">№</div><span>Country</span></div>
            <span className="TotalConfirmed">Total Confirmed</span>
          </li>
          {CountriesItems}
        </ul>
      </div>
    )
  }
} 

export default App;
