import { createContext, useEffect, useReducer } from "react";

export const ReadingListContext = createContext();

// Load the previously saved reading list
function getInitialReadingList() {
  try {
    const savedList = localStorage.getItem("readingList");
    return savedList ? JSON.parse(savedList) : [];
  } catch (error) {
    console.error("Could not load reading list:", error);
    return [];
  }
}

function readingListReducer(state, action) {
  switch (action.type) {
    case "ADD_BOOK":
      if (state.some((book) => book.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];

    case "REMOVE_BOOK":
      return state.filter((book) => book.id !== action.payload);

    case "CLEAR_LIST":
      return [];

    default:
      return state;
  }
}

export function ReadingListProvider({ children }) {
  const [readingList, dispatch] = useReducer(
    readingListReducer,
    [],
    getInitialReadingList,
  );

  // Save the reading list whenever it changes
  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]);

  return (
    <ReadingListContext.Provider value={{ readingList, dispatch }}>
      {children}
    </ReadingListContext.Provider>
  );
}
