import React from 'react';
import { connect } from 'react-redux';
import { DELETE_WIDGET } from '../constants/constants';
import { linkTextChanged, listTypeChanged, paragraphTextChanged, headingTextChanged, headingSizeChanged } from "../actions/actions";

const Heading = ({preview, widget, headingSizeChanged, headingTextChanged}) => {
  let selectElem
  let inputElement
  return (
    <div>
      <div hidden={preview}>
        <h2>Heading {widget.size}</h2>
        <input value={widget.text} onChange={() => headingTextChanged(widget.id, inputElement.value)} ref={node => inputElement=node} />
        <select value={widget.size} onChange={() => headingSizeChanged(widget.id, selectElem.value)} ref={node => selectElem = node}>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
      </div>
      <h3>Preview</h3>
      {widget.size == 1 && <h1>{widget.text}</h1>}
      {widget.size == 2 && <h2>{widget.text}</h2>}
      {widget.size == 3 && <h3>{widget.text}</h3>}
    </div>
  );
}

const Paragraph = ({preview, widget, paragraphTextChanged}) => {
  let inputElement
  return (
    <div>
      <div hidden={preview}>
        <h3>Paragraph</h3>
        <input placeholder="Paragraph text" onChange={() => paragraphTextChanged(widget.id, inputElement.value)} ref={node => inputElement=node} />
      </div>
      <h3>Preview</h3>
      <div className="form-control">
        {<p>{widget.text}</p>}
      </div>
    </div>
  );
}

const List = ({preview, widget, headingTextChanged, listTypeChanged}) => {
  let inputElement
  let selectElement
  return (
    <div>
      <div hidden={preview}>
        <h3>List</h3>
        <textarea placeholder="Enter one list item per line" value={widget.text} onChange={() => headingTextChanged(widget.id, inputElement.value)} ref={node => inputElement=node} />
        <select value={widget.listType} onChange={() => listTypeChanged(widget.id, selectElement.value)} ref={node => selectElement = node}>
          <option value="1">Ordered</option>
          <option value="2">Unordered</option>
        </select>
      </div>
      <h3>Preview</h3>
      <div className="form-control">
        {<ol>
          {widget.listType == 1 && widget.text.split("\n").map(listItem => {
            return(
              <li>{listItem}</li>
            );
          })}
        </ol>}
        {<ul>
          {widget.listType == 2 && widget.text.split("\n").map(listItem => {
            return(
              <li>{listItem}</li>
            );
          })}
        </ul>}
      </div>
    </div>

  );
}

const Image = ({preview, widget, headingTextChanged}) => {
  let inputElement
  return (
    <div>
      <div hidden={preview}>
        <h3>Image</h3>
        <input placeholder="Enter image URL" value={widget.text} onChange={() => headingTextChanged(widget.id, inputElement.value)} ref={node => inputElement=node} />
        <h3>Preview</h3>
      </div>
      <div className="form-control">
        {<img src={widget.text} alt="" width="199" height="150" style={{overflow: "hidden"}} />}
      </div>
    </div>
  );
}

const Link = ({preview, widget, headingTextChanged, linkTextChanged}) => {
  let linkHyperlinkInput
  let linkURLInput
  return (
    <div>
      <div hidden={preview}>
        <h3>Image</h3>
        <input placeholder="Enter Link URL" value={widget.text} onChange={() => headingTextChanged(widget.id, linkURLInput.value)} ref={node => linkURLInput=node} />
        <br />
        <input placeholder="Enter Link name" value={widget.linkText} onChange={() => linkTextChanged(widget.id, linkHyperlinkInput.value)} ref={node => linkHyperlinkInput=node} />
        <h3>Preview</h3>
      </div>
      <div className="form-control">
        {<a href={widget.text}>{widget.linkText}</a>}
      </div>
    </div>
  );
}

const stateToPropsMapper = state => ({
  preview: state.preview
})

const dispatchToPropsMapper = dispatch => ({
  headingTextChanged: (widgetId, newText) => headingTextChanged(dispatch, widgetId, newText),
  paragraphTextChanged: (widgetId, newText) => paragraphTextChanged(dispatch, widgetId, newText),
  headingSizeChanged: (widgetId, newSize) => headingSizeChanged(dispatch, widgetId, newSize),
  listTypeChanged: (widgetId, newType) => listTypeChanged(dispatch, widgetId, newType),
  linkTextChanged: (widgetId, newLinkText) => linkTextChanged(dispatch, widgetId, newLinkText)
})

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)
const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)
const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List)
const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)
const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)

const Widget = ({preview, widget, dispatch}) => {
  let selectElement
  return(
    <li>
      <div hidden={preview}>
        {widget.title}
        <select
          value={widget.widgetType}
          onChange={e => dispatch({type: "SELECT_WIDGET_TYPE", id: widget.id, widgetType: selectElement.value})}
          ref={node => selectElement=node}>
          <option>Heading</option>
          <option selected>Paragraph</option>
          <option>List</option>
          <option>Image</option>
          <option>Link</option>
        </select>
        <button className="btn btn-sm btn-outline-danger" onClick={e => (
            dispatch({type: DELETE_WIDGET, id: widget.id})
          )}>Delete widget</button>
      </div>
      <div>
        {widget.widgetType === "Heading" && <HeadingContainer widget={widget} />}
        {widget.widgetType === "Paragraph" && <ParagraphContainer widget={widget} />}
        {widget.widgetType === "List" && <ListContainer widget={widget} />}
        {widget.widgetType === "Image" && <ImageContainer widget={widget} />}
        {widget.widgetType === "Link" && <LinkContainer widget={widget} />}
      </div>
    </li>
  )
}

export const WidgetContainer = connect()(Widget);
