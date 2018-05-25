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
        <div className = "container-fluid">
          <Link to = "/courses/list">Course Manager</Link>
          <Route path="/courses/list" component = {CourseList} />
          <Route path="/courses/:courseId/edit" component = {CourseEditor} />
        </div>
      </Router>
    );
  }
}
