import React from 'react';
import { Link } from 'react-router-dom';

export default class CourseRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <tr>
        <td>
          <Link to={`/courses/${this.props.course.id}/edit`}>
            {this.props.course.title}
          </Link>
        </td>
        <td>
          <button onClick={() => this.props.delete(this.props.course.id)} className = "btn btn-outline-danger btn-md">Delete</button>
        </td>
      </tr>
    );
  }
}
