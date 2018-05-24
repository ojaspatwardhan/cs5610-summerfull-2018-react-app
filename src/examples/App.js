import React from 'react';
import Hello from '../components/Hello';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PageUpdate from '../components/PageUpdate';

const page1 = () => {
  return(
    <h2>Page 1</h2>
  );
};

const page2 = () => {
  return(
    <h2>Page 2</h2>
  );
};

const PageParam = ({match}) => {
  return(
    <h2>PageParam {match.params.id}</h2>
  );
};

const App = () => {
  return(
    <Router>
      <div className = "container-fluid">
            <Link to = "/hello">Hello</Link>
            <Route path = "/hello" component = {Hello} /> |
            <Link to = "/page1">Page 1</Link>
            <Route path = "/page1" component = {page1} /> |
            <Link to = "/page2">Page 2</Link>
            <Route path = "/page2" component = {page2} />
            <Link to = "/pageParam/123">Page 123</Link> |
            <Link to = "/pageParam/234">Page 234</Link> |
            <Route path = "/pageParam/:id" component = {PageParam} />
            <Link to = "/pageUpdate/123">Page update 123</Link> |
            <Link to = "/pageUpdate/234">Page update 234</Link> |
            <Link to = "/pageUpdate/456">Page update 456</Link> |
            <Link to = "/pageUpdate/789">Page update 789</Link>
            <Route path = "/pageUpdate/:id" component = {PageUpdate} />
        </div>
    </Router>
  );
};

export default App;
