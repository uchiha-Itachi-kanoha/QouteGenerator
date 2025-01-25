import React, { Component } from 'react';
import axios from 'axios';

class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quoteData: null, // Changed to null to handle an object directly
            errormsg: '',
        };

        this.nextQuote = this.nextQuote.bind(this);
    }

    componentDidMount() {
        this.fetchQuote();
    }

    fetchQuote() {
        axios
            .get('https://quotes-api-self.vercel.app/quote')
            .then(response => {
                console.log(response.data); // Check the API response structure
                this.setState({ quoteData: response.data });
            })
            .catch(error => {
                console.log(error);
                this.setState({ errormsg: 'Error retrieving data' });
            });
    }

    nextQuote() {
        this.fetchQuote(); // Fetch a new quote when the button is clicked
    }

    render() {
        const { quoteData, errormsg } = this.state;

        return (
            <div className="quote-box">
                <h1>Quotes</h1>
                {quoteData ? (
                    <div>
                        <p>"{quoteData.quote}"</p>
                        <p>- {quoteData.author}</p>
                    </div>
                ) : null}
                {errormsg && <div>{errormsg}</div>}
                <button onClick={this.nextQuote}>Next Quote</button>
            </div>
        );
    }
}

export default File;