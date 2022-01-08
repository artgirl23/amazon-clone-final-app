
import React from 'react';
import currencies from './utils/currencies';
import { checkStatus, json } from './utils/fetchUtils';
import CurrencyTable from './CurrencyTable';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      base: 'USD',
      rates: null,
      loading: true, // Add loading: true to default state in constructor
    }
  }

  componentDidMount() {
    this.getRatesData(this.state.base);
  }

  changeBase = (event) => {
    this.setState({ base: event.target.value }); //call getRatesData in changeBase to fetch new data.
    this.getRatesData(event.target.value);
  }

  getRatesData = (base) => {
    this.setState({ loading: true }); // Set loading to true before making the fetch request in getRatesData
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const rates = Object.keys(data.rates)
          .filter(acronym => acronym !== base)
          .map(acronym => ({
            acronym,
            rate: data.rates[acronym],
            name: currencies[acronym].name,
            symbol: currencies[acronym].symbol,
          }))
        this.setState({ rates, loading: false }); // Set loading to false together with the cleaned rates data
      })
      .catch(error => console.error(error.message));
  }


  render () {
    const { base, rates, loading } = this.state;
    return (
      <React.Fragment>
        <form className="p-3 bg-light form-inline justify-content-center">
          <h3 className="mb-2">Base currency: <b className="mr-2">1</b></h3>
          <select value={base} onChange={this.changeBase} className="form-control form-control-lg mb-2" disabled={loading}>  
            {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
          </select>
        </form>
        <CurrencyTable base={base} rates={rates} />
      </React.Fragment>
    )
  }
}
export default Home;