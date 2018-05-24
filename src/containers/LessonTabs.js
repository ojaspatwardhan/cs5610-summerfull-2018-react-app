import React from 'react';

export default class LessonTabs extends React.Component {
  render() {
    return(
      <ul className = "nav nav-tabs">
        <li className = "nav-item">
          <a className = "nav-link"
            href = "#">
            Tab 1
          </a>
        </li>
        <li className = "nav-item">
          <a className = "nav-link"
            href = "#">
            Tab 2
          </a>
        </li>
      </ul>
    );
  }
}
