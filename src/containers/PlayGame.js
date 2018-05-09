import React, { Component } from "react";
import data from "../config/data.json";
import "./container.css";

class PlayGame extends Component {
  constructor(props) {
    super();
    this.state = {
      data: data,
      score: 0,
      highestScore: 0
    };
  }

  onImageClick = id => {
    let find = false;
    const remaped = this.state.data.map(ob => {
      if (ob.id === id && !ob.checked) {
        ob.checked = true;
        find = true;
      }
      return ob;
    });
    this.isFind(find, remaped);
  };

  isFind = (find, remaped) => {
    if (find) {
      const { highestScore, score } = this.state;
      const scoreMax = score + 1;
      this.setState({
        score: scoreMax,
        highestScore: scoreMax <= highestScore ? highestScore : scoreMax,
        data: this.randomData(remaped),
      });
      return true;
    }
    const reFreshData = remaped.map(item => ({ ...item, checked: false }));
    this.setState({ data: this.randomData(reFreshData), score: 0 });
  }

  randomData = items => {
    let count = items.length - 1;
    while (count > 0) {
      const a = Math.floor(Math.random() * (count + 1));
      const item = items[count];
      items[count] = items[a];
      items[a] = item;
      count--;
    }
    return items;
  };


  render() {
    const { data, score, highestScore } = this.state;
    return (
      <React.Fragment>
        <React.Fragment>
          Total Scores: {score} | Top Score: {highestScore}
        </React.Fragment>
        <React.Fragment>
          {data && data.map(item => (
            <div
              role="img"
              onClick={() => this.onImageClick(item.id)}
              style={{ backgroundImage: `url("${item.image}")` }}
              className={`items${!score && highestScore ? " shake" : ""}`}
            />
          ))}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default PlayGame;
