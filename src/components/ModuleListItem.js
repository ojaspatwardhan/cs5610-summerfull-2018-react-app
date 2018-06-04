import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


export default class ModuleListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: ""
    };
  }

 render() {
   return(
     <div className="row">
       <div className="col-md-12">
         <ul className="list-group">
           <li className = "list-group-item">
             <Link to={`/courses/${this.props.courseId}/edit/${this.props.module.id}/lesson`}>
               {this.props.title}
             </Link>
             <span className="float-right">
               <button onClick={() => this.props.delete(this.props.id)} className="btn btn-outline-danger btn-md"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
               <button type="button" className="btn btn-md btn-outline-warning"><i className = "fa fa-pencil-square-o"></i></button>
             </span>
           </li>
         </ul>
       </div>
     </div>
   );
 }
}
