import React from 'react';
import ReactDOM from 'react-dom';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';

export default class CourseList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      course: {title: ""},
      courses: []
    };
    this.courseService = CourseService.instance;
    this.renderCourseRows = this.renderCourseRows.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.findAllCourses = this.findAllCourses.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
    this.findAllCourses();
  }

  renderCourseRows() {
    let courses = null;

    if(this.state) {
      courses = this.state.courses.map((course) => {
        return(
        <CourseRow key = {course.id} course = {course} delete = {this.deleteCourse} />
        );
      });
    }
   return (
       courses
   );
}

  deleteCourse(courseId) {
    this.courseService.deleteCourse(courseId).then(() => {this.findAllCourses();
    });
  }

  findAllCourses() {
   this.courseService.findAllCourses()
       .then((courses) => {
           this.setState({courses: courses});
           console.log(courses);
       });
  }


  titleChanged(event) {
    this.setState({course: {title: event.target.value}
    });
  }

  createCourse() {
    this.courseService
       .createCourse(this.state.course)
       .then(() => { this.findAllCourses();
       });
  }

  render() {
    return(
      <div>
        <h2>Course List</h2>
        <table className = "table container-fluid">
          <thead>
            <tr>
              <th>
                Title
              </th>
            </tr>
            <tr>
              <th>
                <input onChange = {this.titleChanged} className = "form-control" id = "title" placeholder = "CS101" />
              </th>
              <th>
                <button onClick = {this.createCourse} className = "btn btn-outline-primary btn-md">Add</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderCourseRows()}
          </tbody>
        </table>
      </div>
    );
  }
}
