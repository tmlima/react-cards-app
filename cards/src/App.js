import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

const CardList = (props) => (
<div>
  {props.profiles.map(profile => <Card {...profile}/>)}
</div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class AddUserForm extends React.Component {
  state = {username: ''};

  handleSubmit = async (event) => {
    event.preventDefault();    
    const user = await axios.get(`https://api.github.com/users/${this.state.username}`);
    this.props.onSubmit(user.data);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.username}
          onChange={event => this.setState({username: event.target.value })}
          placeholder="Github username"/>
          <button>Add card</button>
      </form>
    )
  }
}

class App extends Component {

  state = {
    profiles: [],
  };

  addNewProfile = (profile) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profile]
    }))
  }

  render() {
    return (
    <div>
      <div className="header">The GitHub Cards App</div>
      <AddUserForm onSubmit={this.addNewProfile}/>
      <CardList profiles={this.state.profiles}/>
    </div>
    );
  }
}

export default App;

