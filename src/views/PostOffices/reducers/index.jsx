import Actions from '../actions';

const postOffices = (state = [], action) => {
  switch (action.type) {
    case Actions.INIT_POST_OFFICES_COMPONENT:
      return [];
    case Actions.FETCH_POST_OFFICES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case Actions.INIT_POST_OFFICES_COMPONENT:
      return true;
    case Actions.FETCH_POST_OFFICES_SUCCESS:
    case Actions.FETCH_POST_OFFICES_FAILURE:
      return false;
    default:
      return state;
  }
};

const totalPostOffices = (state = 0, action) => {
  switch (action.type) {
    case Actions.INIT_POST_OFFICES_COMPONENT:
      return 0;
    case Actions.FETCH_POST_OFFICES_SUCCESS:
      return action.payload.length;
    case Actions.FETCH_POST_OFFICES_FAILURE:
      return 0;
    default:
      return state;
  }
};

const createOrUpdatePostOfficeData = (state = {}, action) => {
  switch (action.type) {
    case Actions.INIT_POST_OFFICES_COMPONENT:
    case Actions.CLOSE_CREATE_OR_UPDATE_MODAL:
      return {};
    case Actions.UPDATE_POST_OFFICE_DATA:
    case Actions.CREATE_POST_OFFICE_DATA:
      return action.payload;
    default:
      return state;
  }
};

const isOpenCreateOrUpdateModal = (state = false, action) => {
  switch (action.type) {
    case Actions.INIT_POST_OFFICES_COMPONENT:
    case Actions.CLOSE_CREATE_OR_UPDATE_MODAL:
    case Actions.SUBMIT_CREATE_OR_UPDATE_SUCCESS:
    case Actions.SUBMIT_CREATE_OR_UPDATE_FAILURE:
      return false;
    case Actions.OPEN_CREATE_OR_UPDATE_MODAL:
    case Actions.UPDATE_POST_OFFICE_DATA:
      return true;
    default:
      return state;
  }
};

export default {
  postOffices,
  isLoading,
  totalPostOffices,
  createOrUpdatePostOfficeData,
  isOpenCreateOrUpdateModal
};