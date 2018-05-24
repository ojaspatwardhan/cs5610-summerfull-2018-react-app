import React from 'react';

export default class CourseCard extends React.Component {
  render() {
    return(
      <div className = "card"
        styles = {{ width: '10rem' }}>
        <img className = "card-img-top"
          src = "https://picsum.photos/200/100/?random" />
        <div className = "card-body">
          <div className = "card-title">
            <h4>This is the title</h4>
          </div>
          <div className = "card-text">
            <p>This is the card text</p>
          </div>
          <a href = "#" className = "btn btn-outline-primary">Click Here</a>
        </div>
      </div>
    );
  }
}
