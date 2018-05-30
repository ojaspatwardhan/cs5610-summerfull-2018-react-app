import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import './ModuleList.css';

export default class ModuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: "",
      module: {title: ""},
      modules: [
      ]
    };
    this.setCourseId = this.setCourseId.bind(this);
    this.moduleService = ModuleService.instance;
    this.titleChanged = this.titleChanged.bind(this);
    this.createModule = this.createModule.bind(this);
    this.setModuleTitle = this.setModuleTitle.bind(this);
    this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
  }

  setCourseId(courseId) {
    this.setState({
      courseId: courseId
    });
  }

  componentDidMount() {
    this.setCourseId(this.props.courseId);
  }

  componentWillReceiveProps(newProps) {
    this.findAllModulesForCourse(newProps.courseId);
  }

  setModuleTitle(event) {
    this.setState({module: {title: event.target.value}});
  }

  titleChanged(event) {
    this.setState({module: {title: event.target.value}});
  }

  findAllModulesForCourse(courseId) {
    this.moduleService.findAllModulesForCourse(courseId).then((modules) => {
      this.setModules(modules);
    });
  }

  setModules(modules) {
    this.setState({modules: modules});
  }

  createModule() {
    this.moduleService.createModule(this.props.courseId, this.state.module);
    console.log(this.state.module);
  }

  renderListOfModules() {
    let modules = this.state.modules.map(function(module) {
      return <ModuleListItem title={module.title} key={module.id} />
    });
    return modules;
  }
  render() {
    return(
      <div className = "container-fluid">
        <div className = "row">
          <div className = "col-md-12 container-fluid-position">
            <input className = "form-control" placeholder = "title" onChange = {this.titleChanged} value = {this.state.module.title} />
            <button className = "btn btn-outline-primary btn-block" onClick = {this.createModule}><i className = "fa fa-plus"></i></button>
            <ul className = "list-group">
              {this.renderListOfModules()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
