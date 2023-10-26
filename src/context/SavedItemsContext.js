import React from 'react'

const SavedItemsContext = React.createContext({
  savedItemsList: [],
  addSavedItems: () => {},
  deleteSavedItem: () => {},
})

export default SavedItemsContext
