import React from 'react';
import ReactDOM from 'react-dom';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';

export default class CourseList extends React.Component {

  constructor(props) {
    super(props);
    this.courseService = CourseService.instance;
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    this.courseService.findAllCourses().then((courses) => {
      console.log(courses);
      this.setState({courses: courses});
    });
  }

  render() {
    return(
      <div>
        <h2>Course List</h2>
        <table className = "table">
          <thead>
            <tr>
              <th>
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            <CourseRow />
            <CourseRow />
            <CourseRow />
          </tbody>
        </table>
      </div>
    );
  }
}
