import Actions from '../actions';
import {
  httpUtil,
  raiseAction
} from 'helpers';
import { SHIPMENTS_URL } from '../constants';
import { POST_OFFICES_URL } from '../../PostOffices/constants';

export default (store) => next => action => {
  next(action);
  switch (action.type) {
    case Actions.INIT_SHIPMENTS_COMPONENT:
      fetchShipments(store);
      fetchPostOffices(store);
      break;
    case Actions.SUBMIT_CREATE_OR_UPDATE:
      createOrUpdateShipment(store);
      break;
    case Actions.DELETE_SHIPMENT_DATA:
      deletePostOffice(store, action.payload);
      break;
    default:
      break;
  }
}

const fetchShipments = async (store) => {
  try {
    const response = await httpUtil(SHIPMENTS_URL);
    store.dispatch(raiseAction(Actions.FETCH_SHIPMENTS_SUCCESS, response.data));
  } catch (error) {
    store.dispatch(raiseAction(Actions.FETCH_SHIPMENTS_FAILURE));
  }
};

const fetchPostOffices = async (store) => {
  try {
    const response = await httpUtil(POST_OFFICES_URL);
    store.dispatch(raiseAction(Actions.FETCH_POST_OFFICES_SUCCESS, response.data));
  } catch (error) {
    store.dispatch(raiseAction(Actions.FETCH_POST_OFFICES_FAILURE));
  }
};

const createOrUpdateShipment = async (store) => {
  try {
    const {
      createOrUpdateShipmentData,
      shipments
    } = store.getState();

    const requestData = {
      ...createOrUpdateShipmentData,
      id: createOrUpdateShipmentData._id,
      trackingId: undefined
    };
    const response = await httpUtil(`${SHIPMENTS_URL}/${createOrUpdateShipmentData._id ? createOrUpdateShipmentData._id : ''} `, requestData, { method: createOrUpdateShipmentData._id ? 'PUT' : 'POST' });
    if (response.status && response.status === 'SUCCESS') {
      if (createOrUpdateShipmentData._id) {
        const postOfficeIndex = shipments.findIndex((shipment) => shipment._id === createOrUpdateShipmentData._id);
        shipments[postOfficeIndex] = {
          ...createOrUpdateShipmentData
        };
        store.dispatch(raiseAction(Actions.FETCH_SHIPMENTS_SUCCESS, [...shipments]));
      } else {
        store.dispatch(raiseAction(Actions.FETCH_SHIPMENTS_SUCCESS, [...shipments, response.data]));
      }
      store.dispatch(raiseAction(Actions.SUBMIT_CREATE_OR_UPDATE_SUCCESS));
    } else {
      store.dispatch(raiseAction(Actions.SUBMIT_CREATE_OR_UPDATE_FAILURE));
    }
  } catch (error) {
    store.dispatch(raiseAction(Actions.SUBMIT_CREATE_OR_UPDATE_FAILURE));
  }
};

const deletePostOffice = async (store, shipment) => {
  try {
    const {
      _id
    } = shipment;

    const {
      shipments
    } = store.getState();

    const requestData = {
      _id
    };
    const response = await httpUtil(`${SHIPMENTS_URL}/${_id} `, requestData, { method: 'DELETE' });
    if (response.status && response.status === 'SUCCESS') {
      store.dispatch(raiseAction(Actions.FETCH_SHIPMENTS_SUCCESS, [...shipments.filter((shipment) => shipment._id !== _id)]));
      store.dispatch(raiseAction(Actions.DELETE_SHIPMENT_SUCCESS));
    } else {
      store.dispatch(raiseAction(Actions.DELETE_SHIPMENT_FAILURE));
    }
  } catch (error) {
    store.dispatch(raiseAction(Actions.DELETE_SHIPMENT_FAILURE));
  }
};
