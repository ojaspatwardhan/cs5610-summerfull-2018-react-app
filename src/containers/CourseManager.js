import React from 'react';
import CourseCard from '../components/CourseCard';
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';
import CourseEditor from './CourseEditor';
import CourseList from './CourseList';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export default class CourseManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Router>
        <div>
          <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
          <span className="navbar-brand">
            <i className="fa fa-bars" aria-hidden="true">
            </i>
            <Link to = "/courses/list" style={{marginLeft: "10%", textDecoration: "none"}}>Course Manager</Link>
          </span>
          </nav>
          <Route path="/courses/list" component = {CourseList} />
          <Route path="/courses/:courseId/edit" component = {CourseEditor} />
        </div>
      </Router>
    );
  }
}
