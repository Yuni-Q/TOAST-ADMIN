export const initialState = {
  questions: [],
  questions: [],
};

export const ADD_QUESTION_REQUEST = 'ADD_QUESTION_REQUEST';
export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';
export const ADD_QUESTION_FAILURE = 'ADD_QUESTION_FAILURE';

export const EDIT_QUESTION_REQUEST = 'EDIT_QUESTION_REQUEST';
export const EDIT_QUESTION_SUCCESS = 'EDIT_QUESTION_SUCCESS';
export const EDIT_QUESTION_FAILURE = 'EDIT_QUESTION_FAILURE';

export const LOAD_QUESTION_REQUEST = 'LOAD_QUESTION_REQUEST';
export const LOAD_QUESTION_SUCCESS = 'LOAD_QUESTION_SUCCESS';
export const LOAD_QUESTION_FAILURE = 'LOAD_QUESTION_FAILURE';

export const LOAD_QUESTIONS_REQUEST = 'LOAD_QUESTIONS_REQUEST';
export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
export const LOAD_QUESTIONS_FAILURE = 'LOAD_QUESTIONS_FAILURE';


export default (state = initialState, action) => {
  switch (action.type) {
    
    // ADD_QUESTION_REQUEST
    case ADD_QUESTION_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
      };
    }
    case ADD_QUESTION_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
      };
    }
    case ADD_QUESTION_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
      };
    }

    // EDIT_QUESTION_REQUEST
    case EDIT_QUESTION_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
      };
    }
    case EDIT_QUESTION_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
      };
    }
    case EDIT_QUESTION_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
      };
    }

    // LOAD_QUESTIONS_REQUEST
    case LOAD_QUESTIONS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_QUESTIONS_SUCCESS: {
      return {
        ...state,
        QUESTIONs: action.data,
      };
    }
    case LOAD_QUESTIONS_FAILURE: {
      return {
        ...state,
      };
    }

    // LOAD_QUESTION_REQUEST
    case LOAD_QUESTION_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_QUESTION_SUCCESS: {
      return {
        ...state,
        questions: action.data
      };
    }
    case LOAD_QUESTION_FAILURE: {
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
