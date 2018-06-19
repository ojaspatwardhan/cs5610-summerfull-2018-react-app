import React from 'react';
import App from '../containers/widgetList';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { widgetReducer } from '../reducers/widgetReducer';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default class LessonItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    let store = createStore(widgetReducer)
    return (
        <div>
          <li className = "nav-item" style={{marginLeft: "1%"}}>
            <a className="nav-link" href = "#">
              {this.props.title}
              <button type="button" onClick={() => this.props.delete(this.props.lesson.id)} className="btn btn-sm btn-outline-danger"><i className="fa fa-minus-square" aria-hidden="true"></i></button>
            </a>
          </li>
          <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <Provider store={store}>
                <App lessonId={this.props.lesson.id} />
              </Provider>
            </CardBody>
          </Card>
        </Collapse>
        </div>
    );
  }
}
