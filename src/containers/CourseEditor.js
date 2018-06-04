import React from 'react';
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export default class CourseEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: "",
      moduleId: ""
    };
    this.selectCourse = this.selectCourse.bind(this);
  }

  selectCourse(courseId) {
   this.setState({courseId: courseId});
 }

  componentDidMount() {
     this.selectCourse
  (this.props.match.params.courseId);
  }

  componentWillReceiveProps(newProps){
     this.selectCourse
     	(newProps.match.params.courseId);
  }

  render() {
    return(
      <Router>
        <div className = "row">
          <div className = "col-4">
            <ModuleList courseId={this.state.courseId} />
          </div>
          <div className = "col-8">
            <Route path="/courses/:courseId/edit/:moduleId/lesson" component = {LessonTabs} />
          </div>
        </div>
      </Router>
    );
  }
}
