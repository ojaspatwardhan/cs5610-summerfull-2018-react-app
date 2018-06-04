import React from 'react';

export default class LessonItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: -1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({
      activeItem: id
    });
  }

  render() {
    return (
        <li className = "nav-item" style={{marginLeft: "1%"}}>
          <a className={this.state.activeItem === this.props.lesson.id ? "nav-link active" : "nav-link"} href = "#" onClick={this.handleClick(this, this.props.lesson.id)}>
            {this.props.title}
            <button type="button" onClick={() => this.props.delete(this.props.lesson.id)} className="btn btn-sm btn-outline-danger"><i className="fa fa-minus-square" aria-hidden="true"></i></button>
          </a>
        </li>
    );
  }
}
