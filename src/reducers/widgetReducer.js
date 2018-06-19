import * as constants from '../constants/constants';

export const widgetReducer = (state = {widgets: [], preview: false}, action) => {
  let newState
  switch(action.type) {
    case constants.SAVE:
      let saveURL = "http://localhost:8080/api/widget/save/ID"
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
      return {
        widgets: [
          ...state.widgets,
          {id: state.widgets.length + 1, text: "Default text", title: "New widget", widgetType: "Paragraph", size: "2", listType: "2", linkText: "Link text"}
        ]
      }
    case constants.DELETE_WIDGET:
    let deleteURL = "http://localhost:8080/api/widget/ID"
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

    case constants.FIND_ALL_WIDGETS:
      newState = Object.assign({}, state)
      newState.widgets = action.widgets
      return newState

    default: return state
  }
}
