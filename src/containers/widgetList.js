import React from 'react';
import { preview, findAllWidgets, save, addWidget } from '../actions/actions';
import { connect } from 'react-redux';
import { WidgetContainer } from '../components/widget';

class WidgetList extends React.Component {
  constructor(props) {
    super(props);
    this.props.findAllWidgets(this.props.lessonId);
  }

  render() {
    return(
      <div>
        <h1>Widget list</h1>
        <button className="btn btn-outline-dark btn-sm" hidden={this.props.previewMode} onClick={() => this.props.save(this.props.lessonId)}>Save</button>
        <button className="btn btn-sm btn-outline-dark" onClick={this.props.preview}>Preview</button>
        <ul>
          {this.props.widgets.map(widget => (
            <WidgetContainer preview={this.props.previewMode} widget={widget} key={widget.id} />
          ))}
        </ul>
        <button className="btn btn-sm btn-primary" onClick={this.props.addWidget}>Add Widget</button>
      </div>
    );
  }
}

const stateToPropsMapper = (state) => {
  return {
    widgets: state.widgets,
    previewMode: state.preview
  }
}

const dispatcherToPropertiesMapper = dispatch => ({
  findAllWidgets: (lessonId) => findAllWidgets({dispatch, lessonId}),
  addWidget: () => addWidget(dispatch),
  save: (lessonId) => save(dispatch, lessonId),
  preview: () => preview(dispatch)
})

const App = connect(stateToPropsMapper, dispatcherToPropertiesMapper)(WidgetList)

export default App;
