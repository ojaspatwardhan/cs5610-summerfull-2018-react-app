import React from 'react';
import LessonItem from '../components/LessonItem';
import LessonService from '../services/LessonService';

export default class LessonTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        moduleId: "",
        lesson: {title: ""},
        lessons: []
    };
    this.lessonService = LessonService.instance;
    this.createLesson = this.createLesson.bind(this);
    this.renderListOfLessons = this.renderListOfLessons.bind(this);
    this.selectModule = this.selectModule.bind(this);
    this.setLessonTitle = this.setLessonTitle.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.setModuleId = this.setModuleId.bind(this);
    this.deleteLesson = this.deleteLesson.bind(this);
  }

  setLessonTitle(event) {
    this.setState({
      lesson: {title: event.target.value}
    });
  }

  onNameChange(event) {
    console.log(event.target.value);
    console.log(this.state.moduleId);
  }

  setLessons(lessons) {
    this.setState({
      lessons: lessons
    });
  }

  createLesson() {
    this.lessonService.createLesson(this.state.moduleId, this.state.lesson).then(() => {
      this.findAllLessonsForModule(this.state.moduleId);
    });
  }

  deleteLesson(lessonId) {
    this.lessonService.deleteLesson(lessonId).then(() => {
      this.findAllLessonsForModule(this.state.moduleId);
    });
  }

  findAllLessons() {
    this.lessonService.findAllLessons();
  }

  findAllLessonsForModule(moduleId) {
    this.lessonService.findAllLessonsForModule(moduleId).then((lessons) => {
      this.setLessons(lessons);
    });
  }

  selectModule(moduleId) {
    this.setState({
      moduleId: moduleId
    });
  }

  setModuleId(moduleId) {
    this.setState({
      moduleId: moduleId
    });
  }

   componentDidMount() {
   this.selectModule(this.props.match.params.moduleId);
   this.findAllLessonsForModule(this.props.match.params.moduleId);
   }

   componentWillReceiveProps(newProps){
       this.selectModule(newProps.match.params.moduleId);
       this.findAllLessonsForModule(newProps.match.params.moduleId);
   }

  renderListOfLessons() {
    let lessons = this.state.lessons.map((lesson) => {
      return <LessonItem lesson={lesson} module={module} title={lesson.title} key={lesson.id} delete={this.deleteLesson} />
    });
    return lessons
  }

  render() {
    return(
      <div className="container-fluid">
        <ul className="nav nav-pills" style={{position: "relative", marginTop: "10%"}}>
          {this.renderListOfLessons()}
          <div className="row">
            <div className="col-md-9">
              <input className="form-control" placeholder="Lesson name" onChange={this.setLessonTitle} />
            </div>
            <div className="col-md-3">
              <button onClick={this.createLesson} className="btn btn-md btn-outline-primary" style={{marginLeft: "2%"}}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
            </div>
          </div>
        </ul>
      </div>
    );
  }
}
