import * as constants from '../constants/constants';
import $ from 'jquery';

export const widgetReducer = (state = {widgets: [], preview: false}, action) => {
  let newState
  switch(action.type) {
    case constants.SAVE:
      let saveURL = "https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/widget/save/ID"
      saveURL = saveURL.replace("ID", action.lessonId)
      fetch(saveURL, {
        method: "POST",
        body: JSON.stringify(state.widgets),
        headers: {
          "content-type": "application/json"
        }
      })
      return state

    case constants.PREVIEW:
      return {
        widgets: state.widgets,
        preview: !state.preview
      }

    case constants.HEADING_TEXT_CHANGED:
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.id) {
            widget.text = action.text
          }
          return Object.assign({}, widget )
        })
      }

      case constants.PARAGRAPH_TEXT_CHANGED:
        return {
          widgets: state.widgets.map(widget => {
            if(widget.id === action.id) {
              widget.text = action.text
            }
            return Object.assign({}, widget )
          })
        }

    case constants.HEADING_SIZE_CHANGED:
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.id) {
            widget.size = action.size
          }
          return Object.assign({}, widget)
        })
      }

    case constants.LIST_TYPE_CHANGED:
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.id) {
            widget.listType = action.listType
          }
          return Object.assign({}, widget)
        })
      }

    case constants.LINK_TEXT_CHANGED:
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.id) {
            widget.linkText = action.linkText
          }
          return Object.assign({}, widget)
        })
      }

    case constants.SELECT_WIDGET_TYPE:
      let newState = {
        widgets: state.widgets.filter(widget => {
          if(widget.id === action.id) {
            widget.widgetType = action.widgetType
          }
          return true;
        })
      }
      return JSON.parse(JSON.stringify(newState));

    case constants.ADD_WIDGET:
      let widgetOrder
      if(state.widgets.length == 0) {
        widgetOrder = 0
      }
      else {
        widgetOrder = state.widgets[state.widgets.length - 1].widgetOrder + 1
      }
      return {
        widgets: [
          ...state.widgets,
          {id: state.widgets.length + 1,
            text: "Default text",
            title: "New widget",
            widgetType: "Paragraph",
            size: "2",
            listType: "2",
            linkText: "Link text",
            widgetOrder: widgetOrder
          }
        ]
      }

    case constants.DELETE_WIDGET:
    let deleteURL = "https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/widget/ID"
    deleteURL = deleteURL.replace("ID", action.id)
    fetch(deleteURL, {
              method: 'DELETE',
              headers: {
                  'content-type': 'application/json'}
          })
      return {
        widgets: state.widgets.filter(widget => (
          widget.id !== action.id
        ))
      }

    case constants.MOVE_UP:
      let index = state.widgets.indexOf(action.widget);
      if(index==0){
          return state;
      }
      else{

          newState = JSON.parse(JSON.stringify(state))
          newState.widgets.move(index, index - 1);
          newState.widgets[index].widgetOrder = index;
          newState.widgets[index - 1].widgetOrder = index - 1;
          return newState;
      }

    case constants.MOVE_DOWN:
      index = state.widgets.indexOf(action.widget);
      if(index==state.widgets.length-1){
          return state;
      }
      else{

          newState = JSON.parse(JSON.stringify(state))
          newState.widgets.move(index, index + 1);
          newState.widgets[index].widgetOrder = index;
          newState.widgets[index + 1].widgetOrder = index + 1;
          return newState;
      }

    case constants.FIND_ALL_WIDGETS:
      newState = Object.assign({}, state)
      newState.widgets = action.widgets
      return newState

    default: return state
  }
}

Array.prototype.move
    = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
