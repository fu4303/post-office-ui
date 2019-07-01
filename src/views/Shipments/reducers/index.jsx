import Actions from '../actions';

const shipments = (state = [], action) => {
  switch (action.type) {
    case Actions.INIT_SHIPMENTS_COMPONENT:
      return [];
    case Actions.FETCH_SHIPMENTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

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
    case Actions.INIT_SHIPMENTS_COMPONENT:
      return true;
    case Actions.FETCH_SHIPMENTS_FAILURE:
    case Actions.FETCH_SHIPMENTS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const totalShipments = (state = 0, action) => {
  switch (action.type) {
    case Actions.INIT_SHIPMENTS_COMPONENT:
      return 0;
    case Actions.FETCH_SHIPMENTS_SUCCESS:
      return action.payload.length;
    case Actions.FETCH_SHIPMENTS_FAILURE:
      return 0;
    default:
      return state;
  }
};

const createOrUpdateShipmentData = (state = {}, action) => {
  switch (action.type) {
    case Actions.INIT_SHIPMENTS_COMPONENT:
    case Actions.CLOSE_CREATE_OR_UPDATE_MODAL:
      return {};
    case Actions.UPDATE_SHIPMENT_DATA:
    case Actions.CREATE_SHIPMENT_DATA:
      return action.payload;
    default:
      return state;
  }
};

const isOpenCreateOrUpdateModal = (state = false, action) => {
  switch (action.type) {
    case Actions.INIT_SHIPMENTS_COMPONENT:
    case Actions.CLOSE_CREATE_OR_UPDATE_MODAL:
    case Actions.SUBMIT_CREATE_OR_UPDATE_SUCCESS:
      return false;
    case Actions.OPEN_CREATE_OR_UPDATE_MODAL:
    case Actions.UPDATE_SHIPMENT_DATA:
      return true;
    default:
      return state;
  }
};


const filter = (state = {}, action) => {
  switch (action.type) {
    case Actions.INIT_SHIPMENTS_COMPONENT:
      return {};
    case Actions.SET_FILTER_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default {
  shipments,
  isLoading,
  totalShipments,
  createOrUpdateShipmentData,
  isOpenCreateOrUpdateModal,
  postOffices,
  filter
};