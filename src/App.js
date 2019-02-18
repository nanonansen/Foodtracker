import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import firebase from "./firebase";
import _ from "lodash";
import "./App.css";

//Tutorial:
//https://css-tricks.com/intro-firebase-react/

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: "",
      timeStamp: "",
      hasReaction: false,
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const timeStamp = new Date().toLocaleDateString("de-DE", options);
    this.setState({
      [e.target.name]: e.target.value,
      timeStamp: timeStamp,
      hasReaction: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.currentItem,
      time: this.state.timeStamp,
      reaction: false
    };
    itemsRef.push(item);
    this.setState({
      currentItem: "",
      timeStamp: ""
    });
  }

  // Retrieve current Items from Firebase and save them to Items Array in state
  componentDidMount() {
    console.log("Component Did Mount");
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          time: items[item].time,
          reaction: items[item].reaction
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  // Remove Item from database
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  //update "reaction" Item in database
  updateItem(itemId, reaction) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    console.log(itemRef);

    itemRef.update({ reaction: !reaction }, function(error) {
      if (error) {
        console.log("update failed");
      } else {
        console.log("update success");
      }
    });
    console.log("State", this.state.items);
  }

  render() {
    const newList = _.groupBy(this.state.items, "time");
    console.log(newList);

    const data = Object.entries(newList)
      .sort()
      .reverse()
      .map(([key, value, i]) =>
        value.map((el, id) => (
          <CSSTransition key={el.id} timeout={500} classNames="fade">
            <>
              <div key={el.id}>
                {id === 0 && <h2 className="date">{el.time}</h2>}

                <div
                  className={
                    el.reaction
                      ? "reaction listitem__wrapper"
                      : "listitem__wrapper"
                  }
                >
                  <div
                    className="listitem__content"
                    onClick={() => this.updateItem(el.id, el.reaction)}
                  >
                    <span className="status" />
                    <h2 className="listitem__title">{el.title}</h2>
                    {/* <p className="listitem__time">{el.time}</p> */}
                  </div>
                  <button
                    className="listitem__delete"
                    onClick={() => this.removeItem(el.id)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <title>ic close 24px</title>
                      <g>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          </CSSTransition>
        ))
      );

    return (
      <div className="App">
        <section className="add-items">
          <div className="container">
            <h1>Was hast du heute alles gegessen?</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="currentItem"
                placeholder="Was hat Leo heute gegessen?"
                onChange={this.handleChange}
                value={this.state.currentItem}
              />
              <button>Hinzufügen</button>
            </form>
          </div>
        </section>

        <section className="display-items">
          <div className="container">
            <TransitionGroup>{data}</TransitionGroup>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
