import React from 'react';
import ReactDOM from 'react-dom';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';

export default class CourseList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      courses: []
    };
    this.courseService = CourseService.instance;
    this.renderCourseRows = this.renderCourseRows.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.findAllCourses = this.findAllCourses.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.findCourseByCourseName = this.findCourseByCourseName.bind(this);
    this.findCourseById = this.findCourseById.bind(this);
    this.courseNameChanged = this.courseNameChanged.bind(this);
  }

  componentDidMount() {
    this.courseService.findAllCourses().then((courses) => {
      this.setState({courses: courses});
    });
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

  findCourseById() {

  }

  courseNameChanged(event) {
    this.setState({
      courseName: event.target.value
    });
  }

  findCourseByCourseName() {
    if(this.state.courseName != "") {
      this.courseService.findCourseByCourseName(this.state.courseName).then((courses) => {
        this.setState({courses: courses});
      });
    }
    else {
      this.findAllCourses();
    }
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="row" style={{position: "relative", marginTop: "2%"}}>
          <div className="col-md-4">
            <input onChange = {this.titleChanged} className = "form-control" id = "title" placeholder = "CS101" />
          </div>
          <div className="col-md-1">
            <button onClick = {this.createCourse} className = "btn btn-outline-success btn-md float-right">Add</button>
          </div>
          <div className="col-md-4">
            <input onChange={this.courseNameChanged} className="form-control" placeholder="Search for course" />
          </div>
          <div className="col-md-1">
            <button onClick={this.findCourseByCourseName} type="button" className="btn btn-md btn-outline-info"><i className="fa fa-search" aria-hidden="true"></i></button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <table className = "table">
              <thead>
                <tr>
                  <th>
                    Title
                  </th>
                  <th>
                    Owner
                  </th>
                  <th>
                    Date modified
                  </th>
                  <th>
                    Time modified
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderCourseRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
