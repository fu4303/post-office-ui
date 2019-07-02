import Actions from '../actions';
import {
  httpUtil,
  raiseAction
} from 'helpers';
import { POST_OFFICES_URL } from '../constants';

export default (store) => next => action => {
  next(action);
  switch (action.type) {
    case Actions.INIT_POST_OFFICES_COMPONENT:
      fetchPostOffices(store);
      break;
    case Actions.SUBMIT_CREATE_OR_UPDATE:
      createOrUpdatePostOffice(store);
      break;
    case Actions.DELETE_POST_OFFICE_DATA:
      deletePostOffice(store, action.payload);
      break;
     default:
      break;


  }
}

const fetchPostOffices = async (store) => {
  try {
    const response = await httpUtil(POST_OFFICES_URL);
    store.dispatch(raiseAction(Actions.FETCH_POST_OFFICES_SUCCESS, response.data));
  } catch (error) {
    store.dispatch(raiseAction(Actions.FETCH_POST_OFFICES_FAILURE));
  }
};

const createOrUpdatePostOffice = async (store) => {
  try {
    const {
      createOrUpdatePostOfficeData: {
        name,
        zipcode,
        _id
      },
      postOffices
    } = store.getState();

    const requestData = {
      name,
      zipcode,
      _id
    };
    const response = await httpUtil(`${POST_OFFICES_URL}${_id ? _id : ''} `, requestData, { method: _id ? 'PUT' : 'POST' });
    if (response.status && response.status === 'SUCCESS') {
      if (_id) {
        const postOfficeIndex = postOffices.findIndex((postOffice) => postOffice._id === _id);
        postOffices[postOfficeIndex] = {
          name,
          zipcode,
          _id
        };
        store.dispatch(raiseAction(Actions.FETCH_POST_OFFICES_SUCCESS, [...postOffices]));
      } else {
        store.dispatch(raiseAction(Actions.FETCH_POST_OFFICES_SUCCESS, [...postOffices, response.data]));
      }
      store.dispatch(raiseAction(Actions.SUBMIT_CREATE_OR_UPDATE_SUCCESS));
    } else {
      store.dispatch(raiseAction(Actions.SUBMIT_CREATE_OR_UPDATE_FAILURE));
    }
  } catch (error) {
    store.dispatch(raiseAction(Actions.SUBMIT_CREATE_OR_UPDATE_FAILURE));
  }
};

const deletePostOffice = async (store, postOffice) => {
  try {
    const {
      _id
    } = postOffice;

    const {
      postOffices
    } = store.getState();

    const requestData = {
      _id
    };
    const response = await httpUtil(`${POST_OFFICES_URL}${_id} `, requestData, { method: 'DELETE' });
    if (response.status && response.status === 'SUCCESS') {
      store.dispatch(raiseAction(Actions.FETCH_POST_OFFICES_SUCCESS, [...postOffices.filter((postOffice) => postOffice._id !== _id)]));
      store.dispatch(raiseAction(Actions.DELETE_POST_OFFICE_SUCCESS));
    } else {
      store.dispatch(raiseAction(Actions.DELETE_POST_OFFICE_FAILURE));
    }
  } catch (error) {
    store.dispatch(raiseAction(Actions.DELETE_POST_OFFICE_FAILURE));
  }
};
