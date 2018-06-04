import React from 'react';

export default class LessonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <li className = "nav-item" style={{marginLeft: "2%"}}>
          <a className = "nav-link"
            href = "#">
            {this.props.title}
            <button onClick={() => this.props.delete(this.props.lesson.id)} className="btn btn-sm btn-outline-danger"><i className="fa fa-minus-square" aria-hidden="true"></i></button>
          </a>
        </li>
    );
  }
}
