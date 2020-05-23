import React from 'react';
import { Helmet } from 'react-helmet';
import './css/github.css';
class Github extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            repositories: [],
        }
    }

    async componentDidMount() {
        var repos = await this.getDataFetch();
        this.setState({
            repositories: repos
        });
    }

    async getDataFetch() {
        try {
            const response =
                await fetch("https://api.github.com/users/AntonJacobsson/repos?per_page=100",
                    { headers: { 'Content-Type': 'application/json' } }
                )
            return await response.json();
        }
        catch {
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>AJacobsson - Github</title>
                    <meta name="description" content="Here you can find my public repos. Feel free to check them out" />
                </Helmet>

                <section>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-4">Github Repositories</h1>
                            <p className="lead">Here you can find my public repos. Feel free to check them out</p>
                        </div>
                    </div>

                    <div className="container">
                        <div className="card-deck">

                            {this.state.repositories.map(i => {
                                var description = "";

                                if (i.description) {
                                    description = i.description;
                                } else {
                                    description = "No description found for this repository"
                                }

                                return (

                                    <div className="card" key={i.id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{i.name}</h5>
                                            <p className="card-text">{description}</p>
                                        </div>
                                        <div className="card-badge-row">
                                            <span className="badge custom-badge-primary">{i.language}</span>
                                        </div>
                                        <div className="card-footer">
                                            <a href={i.html_url} >
                                                <button type="button" className="btn btn-outline-secondary">To Github</button>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Github