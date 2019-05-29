export const initialState = {
  parts: [],
  questions: [],
};

export const ADD_PART_REQUEST = 'ADD_PART_REQUEST';
export const ADD_PART_SUCCESS = 'ADD_PART_SUCCESS';
export const ADD_PART_FAILURE = 'ADD_PART_FAILURE';

export const EDIT_PART_REQUEST = 'EDIT_PART_REQUEST';
export const EDIT_PART_SUCCESS = 'EDIT_PART_SUCCESS';
export const EDIT_PART_FAILURE = 'EDIT_PART_FAILURE';

export const LOAD_PART_REQUEST = 'LOAD_PART_REQUEST';
export const LOAD_PART_SUCCESS = 'LOAD_PART_SUCCESS';
export const LOAD_PART_FAILURE = 'LOAD_PART_FAILURE';

export const LOAD_PARTS_REQUEST = 'LOAD_PARTS_REQUEST';
export const LOAD_PARTS_SUCCESS = 'LOAD_PARTS_SUCCESS';
export const LOAD_PARTS_FAILURE = 'LOAD_PARTS_FAILURE';


export default (state = initialState, action) => {
  switch (action.type) {
    
    // ADD_PART_REQUEST
    case ADD_PART_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
      };
    }
    case ADD_PART_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
      };
    }
    case ADD_PART_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
      };
    }

    // EDIT_PART_REQUEST
    case EDIT_PART_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
      };
    }
    case EDIT_PART_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
      };
    }
    case EDIT_PART_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
      };
    }

    // LOAD_PARTS_REQUEST
    case LOAD_PARTS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_PARTS_SUCCESS: {
      return {
        ...state,
        parts: action.data,
      };
    }
    case LOAD_PARTS_FAILURE: {
      return {
        ...state,
      };
    }

    // LOAD_PART_REQUEST
    case LOAD_PART_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_PART_SUCCESS: {
      return {
        ...state,
        questions: action.data
      };
    }
    case LOAD_PART_FAILURE: {
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
