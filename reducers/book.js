export const initialState = {
  books: [], // 화면에 보일 포스트들
  parts: [], // 미리보기 이미지 경로
  isAddingPost: false, // 포스트 업로드 중
};

export const LOAD_BOOKS_REQUEST = 'LOAD_BOOKS_REQUEST';
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS';
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE';

export const LOAD_BOOK_REQUEST = 'LOAD_BOOK_REQUEST';
export const LOAD_BOOK_SUCCESS = 'LOAD_BOOK_SUCCESS';
export const LOAD_BOOK_FAILURE = 'LOAD_BOOK_FAILURE';

export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';

export const EDIT_BOOK_REQUEST = 'EDIT_BOOK_REQUEST';
export const EDIT_BOOK_SUCCESS = 'EDIT_BOOK_SUCCESS';
export const EDIT_BOOK_FAILURE = 'EDIT_BOOK_FAILURE';



export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    
    // ADD_BOOK_REQUEST
    case ADD_BOOK_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
        addPostErrorReason: '',
        postAdded: false,
      };
    }
    case ADD_BOOK_SUCCESS: {
      return {
        ...state,
      };
    }
    case ADD_BOOK_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: action.error,
      };
    }

    // EDIT_BOOK_REQUEST
    case EDIT_BOOK_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
      };
    }
    case EDIT_BOOK_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
      };
    }
    case EDIT_BOOK_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
      };
    }

    // LOAD_BOOKS_REQUEST
    case LOAD_BOOKS_REQUEST: {
      return {
        ...state,
        books: [],
      };
    }
    case LOAD_BOOKS_SUCCESS: {
      return {
        ...state,
        books: action.data,
      };
    }
    case LOAD_BOOKS_FAILURE: {
      return {
        ...state,
      };
    }

    // LOAD_BOOK_REQUEST
    case LOAD_BOOK_REQUEST: {
      return {
        ...state,
        parts: [],
      };
    }
    case LOAD_BOOK_SUCCESS: {
      return {
        ...state,
        parts: action.data,
      };
    }
    case LOAD_BOOK_FAILURE: {
      return {
        ...state,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
