import React from 'react';

export default class PageUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: ""};
    this.updatePage = this.updatePage.bind(this);
  }

  render() {
    return(
      <h1>Page update {this.state.id}</h1>
    );
  }

  componentDidMount() {
    this.updatePage(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    this.updatePage(newProps.match.params.id);
  }

  updatePage(id) {
    this.setState({id: id})
  }
}
