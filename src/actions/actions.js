import * as constants from '../constants/constants';

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
  dispatch({type: constants.HEADING_SIZE_CHANGED, id: widgetId, size: newSize})
)

export const headingTextChanged = (dispatch, widgetId, newText) => (
  dispatch({type: constants.HEADING_TEXT_CHANGED, id: widgetId, text: newText})
)

export const paragraphTextChanged = (dispatch, widgetId, newText) => (
  dispatch({type: constants.PARAGRAPH_TEXT_CHANGED, id: widgetId, text: newText})
)

export const preview = dispatch => {
  dispatch({type: constants.PREVIEW})
}

export const listTypeChanged = (dispatch, widgetId, newType) => (
  dispatch({type: constants.LIST_TYPE_CHANGED, id: widgetId, listType: newType})
)

export const linkTextChanged = (dispatch, widgetId, newLinkText) => (
  dispatch({type: constants.LINK_TEXT_CHANGED, id: widgetId, linkText: newLinkText})
)

export const moveUp = widget => {
  return {
    type: constants.MOVE_UP, widget: widget
  }
}

export const moveDown = widget => {
  return {
    type: constants.MOVE_DOWN, widget: widget
  }
}

export const findAllWidgets = ({dispatch, lessonId}) => {
  var fetchURL = "https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/widget/ID"
  fetchURL = fetchURL.replace("ID", lessonId);
  fetch(fetchURL).then(
    response => (response.json())).then(
    widgets => dispatch({
      type: constants.FIND_ALL_WIDGETS,
      widgets: widgets
    })
  )
}

export const addWidget = dispatch => {
  dispatch({type: constants.ADD_WIDGET})
}

export const save = (dispatch, lessonId) => {
  dispatch({type: constants.SAVE, lessonId: lessonId})
}
