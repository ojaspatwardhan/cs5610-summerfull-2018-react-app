import React from 'react';
import { Link } from 'react-router-dom';

export default class CourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTimes: [props.course.created],
      time: "",
      date: ""
    };
  }

  componentDidMount() {
    this.state.dateTimes.map((dateTime) => {
      let newDate = dateTime.split("T");
      let date = newDate[0];
      let newTime = newDate[1].split(".");
      let time = newTime[0];
      this.setState({time: time, date: date})
    })
  }

  render() {
    return(
      <div className = "card"
        style={{width: '10rem'}}>
        <div className = "card-body">
          <div className = "card-title">
            <i className="fa fa-university" aria-hidden="true"></i>
            <Link to={`/courses/${this.props.course.id}/edit`} style={{textDecoration: "none"}}>
              <h4>{this.props.course.title}</h4>
            </Link>
          </div>
          <div className = "card-text">
            <p>Created on {this.state.date}</p>
          </div>
          <button onClick={() => this.props.delete(this.props.course.id)} className="btn btn-md btn-outline-danger"><i className="fa fa-trash-o"></i></button>
        </div>
      </div>
    );
  }
}
