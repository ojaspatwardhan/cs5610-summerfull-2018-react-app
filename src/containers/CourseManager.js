import React from 'react';
import CourseCard from '../components/CourseCard';
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';
import CourseEditor from './CourseEditor';
import CourseList from './CourseList';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';

export default class CourseManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return(
      <Router>
        <div>
          <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
          <span className="navbar-brand">
            <Button outline color="dark" onClick={this.toggle}>
              <Container>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Settings</ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col xs="12">
                            <Button outline color="success">Course Editor</Button>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                  </Modal>
              </Container>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </Button>
            <Link to = "/courses/list" style={{marginLeft: "10%", textDecoration: "none"}}>Course Manager</Link>
          </span>
          </nav>
          <Route path="/courses/list" component = {CourseList} />
          <Route path="/courses/:courseId/edit" component = {CourseEditor} />
        </div>
      </Router>
    );
  }
}
