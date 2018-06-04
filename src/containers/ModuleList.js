import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleServiceClient';
import './ModuleList.css';

export default class ModuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: "",
      module: {title: ""},
      modules: []
    };
    this.setCourseId = this.setCourseId.bind(this);
    this.moduleService = ModuleService.instance;
    this.titleChanged = this.titleChanged.bind(this);
    this.createModule = this.createModule.bind(this);
    this.setModuleTitle = this.setModuleTitle.bind(this);
    this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
    this.deleteModule = this.deleteModule.bind(this);
    this.findAllModules = this.findAllModules.bind(this);
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
    this.moduleService.createModule(this.props.courseId, this.state.module).then(() => {
      this.findAllModulesForCourse(this.props.courseId);
    });
  }

  renderListOfModules() {
    let modules = this.state.modules.map((module) => {
      return <ModuleListItem courseId={this.props.courseId} module={module} title={module.title} key={module.id} id = {module.id} delete = {this.deleteModule} />
    });
    return modules;
  }

  deleteModule(moduleId) {
    this.moduleService.deleteModule(moduleId).then(() => {
      this.findAllModulesForCourse(this.props.courseId);
    });
  }

  findAllModules() {
    this.moduleService.findAllModules();
  }

  render() {
    return(
      <div className = "container-fluid">
        <div className="row" style={{position: "relative", marginTop: "10%"}}>
          <div className="col-md-6">
            <h4>Add Module</h4>
          </div>
        </div>
        <div className = "row" style={{position: "relative", marginTop: "3%"}}>
          <div className = "col-md-6">
            <input className = "form-control" placeholder = "Module Title" onChange = {this.titleChanged} value = {this.state.module.title} />
          </div>
          <div className="col-md-6">
            <button className = "btn btn-outline-primary" onClick = {this.createModule}><i className = "fa fa-plus"></i></button>
          </div>
        </div>
        <div className="row" style={{marginTop: "5%"}}>
          <div className="col-md-8">
              {this.renderListOfModules()}
          </div>
        </div>
      </div>
    );
  }
}
