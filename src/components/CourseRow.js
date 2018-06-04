import React from 'react';
import { Link } from 'react-router-dom';

export default class CourseRow extends React.Component {
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
      <tr>
        <td>
          <Link to={`/courses/${this.props.course.id}/edit`} style={{textDecoration: "none"}}>
            {this.props.course.title}
          </Link>
        </td>
        <td>
          Owner
        </td>
        <td>
          {this.state.date}
        </td>
        <td>
          {this.state.time}
        </td>
        <td>
          <button onClick={() => this.props.delete(this.props.course.id)} className = "btn btn-outline-danger btn-md">Delete</button>
        </td>
      </tr>
    );
  }
}
