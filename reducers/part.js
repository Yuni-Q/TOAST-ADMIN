export const initialState = {
  isAddingPost: false, // 포스트 업로드 중
};

export const ADD_PART_REQUEST = 'ADD_PART_REQUEST';
export const ADD_PART_SUCCESS = 'ADD_PART_SUCCESS';
export const ADD_PART_FAILURE = 'ADD_PART_FAILURE';

export const EDIT_PART_REQUEST = 'EDIT_PART_REQUEST';
export const EDIT_PART_SUCCESS = 'EDIT_PART_SUCCESS';
export const EDIT_PART_FAILURE = 'EDIT_PART_FAILURE';

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

    default: {
      return {
        ...state,
      };
    }
  }
};
