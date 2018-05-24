import React from 'react';
import ModuleListItem from '../components/ModuleListItem';

export default class ModuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      module: {title: ""},
      modules: [
        {title: "Module 1 - React", id: 1},
        {title: "Module 2 - Redux", id: 2},
        {title: "Module 3 - React-Native", id: 3},
        {title: "Module 4 - MongoDB", id: 4}
      ]
    };
    this.titleChanged = this.titleChanged.bind(this);
    this.createModule = this.createModule.bind(this);
  }

  titleChanged(event) {
    console.log(event.target.value);
    this.setState({module: {title: event.target.value}});
  }

  createModule() {
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
        <input className = "form-control" placeholder = "title" onChange = {this.titleChanged} value = {this.state.module.title} />
        <button className = "btn btn-outline-primary btn-block" onClick = {this.createModule}><i className = "fa fa-plus"></i></button>
        <ul className = "list-group">
          {this.renderListOfModules()}
        </ul>
      </div>
    );
  }
}
