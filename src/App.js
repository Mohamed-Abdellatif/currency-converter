import "./App.css";
import { Component } from "react";
import currencies from "./lookups/currencies";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      rate: 15.74,
      result: 0,
      rateData: null,
    };
  }
  apiKey = "7R6L9ZGLwnWHqLeUZsqEjJ5J8Wqq2GU5a6EypjaD";
  selectBase = (event) => {
    fetch(
      `https://api.currencyapi.com/v3/latest?apikey=${this.apiKey}&base_currency=${event.target.value}`
    )
      .then((response) => response.json())
      .then((rates) =>
        this.setState((prevState) => {
          return { rateData: rates.data };
        })
      );
    
  };
  selectRate = (event) => {
    this.setState({ rate: this.state.rateData[event.target.value] });
  };

  amountChange = (event) => {
    this.setState({ amount: event.target.value });
  };
  convertAmount = () => {
    this.setState({ result: this.state.amount * this.state.rate.value });
  };
  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="w-50 ">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Amount
              </label>
              <input
                onChange={this.amountChange}
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              From
            </label>
            <select
              onChange={this.selectBase}
              id="firstcurrency"
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option defaultValue>Choose Currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              To
            </label>
            <select
              onChange={this.selectRate}
              id="secondcurrency"
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option defaultValue>Choose Currency</option>

              {this.state.rateData
                ? Object.keys(this.state.rateData).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))
                : null}
            </select>
            <button
              type="button"
              className="btn btn-primary btn-lg mb-3"
              onClick={this.convertAmount}
            >
              Calculate
            </button>
            <div className="alert alert-primary" role="alert" id="answer">
              {this.state.result}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
