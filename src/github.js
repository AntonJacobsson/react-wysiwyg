import React from 'react';
import './github.css';
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
        console.log(repos);
    }

    async getDataFetch(){
        try{
        const response =
          await fetch("https://api.github.com/users/AntonJacobsson/repos?per_page=100",
            { headers: {'Content-Type': 'application/json'}}
          )
        return await response.json();
        }
        catch {
            alert("could not load repositories");
        }
    }



    render() {

        

        return (

            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                      <h1 className="display-4">Github Repositories</h1>
                       <p className="lead">Check below for all my public repos. Feel free to clone them and trying it out.</p>
                    </div>
                </div>


            <div className="container">
            <div className="card-deck">

            {this.state.repositories.map(i => {
            var description = "";

            if(i.description) { 
                var description = i.description;   
            } else {
               description = "No description found for this repository"
            }

            return(

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{i.name}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-badge-row">
                    <span className="badge custom-badge-primary">{i.language}</span>
                </div>
                <div className="card-footer">
                    <a href={i.html_url} >
                        <button type="button" class="btn btn-outline-secondary">To Github</button>
                    </a>
                </div>
            </div>
            )
            })} 
            </div>
            </div>
            </div>
        )
    }
}
export default Github