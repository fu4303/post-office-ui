import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
// Externals
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';
import Actions from '../actions';
import {
  raiseAction
} from 'helpers';

import { ShipmentsTable, ShipmentsTableCreateOrUpdate } from '../components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

class Container extends Component {

  constructor(props) {
    super(props);
  }

  createOrUpdateShipmentHandler = () => {
    const { actions } = this.props;
    actions.raiseAction(Actions.SUBMIT_CREATE_OR_UPDATE);
  }

  onChangeHandler = (key, value) => {
    const { actions, createOrUpdateShipmentData, filter } = this.props;
    if (key === 'filter') {
      actions.raiseAction(Actions.SET_FILTER_DATA, { key, value, filterText: '' });
    } else if (key === 'filterText') {
      actions.raiseAction(Actions.SET_FILTER_DATA, { ...filter, filterText: value });
    } else {
    switch (key) {
      case 'postoffice':
        createOrUpdateShipmentData.postoffice = value;
        break;
      case 'type':
        createOrUpdateShipmentData.type = value;
        break;
      case 'name':
        createOrUpdateShipmentData.name = value;
        break;
      case 'weight':
        createOrUpdateShipmentData.weight = value;
        break;
      case 'status':
        createOrUpdateShipmentData.status = value;
        break;
    }
    actions.raiseAction(Actions.CREATE_SHIPMENT_DATA, { ...createOrUpdateShipmentData });
  }

  }

  createShipmentsHandler = () => {
    const { actions } = this.props;
    actions.raiseAction(Actions.CREATE_SHIPMENT_DATA, {});
    actions.raiseAction(Actions.OPEN_CREATE_OR_UPDATE_MODAL);
  }

  closeModal = () => {
    const { actions } = this.props;
    actions.raiseAction(Actions.CLOSE_CREATE_OR_UPDATE_MODAL);
  }

  updateShipmentsHandler = (shipment) => {
    const { actions } = this.props;
    actions.raiseAction(Actions.UPDATE_SHIPMENT_DATA, shipment);
  }

  deleteShipmentsHandler = (postOffice) => {
    const { actions } = this.props;
    actions.raiseAction(Actions.DELETE_SHIPMENT_DATA, postOffice);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.raiseAction(Actions.INIT_SHIPMENTS_COMPONENT);
  }

  render() {
    const {
      classes,
      createOrUpdateShipmentData,
      isLoading,
      shipments,
      totalShipments,
      isOpenCreateOrUpdateModal,
      postOffices,
      filter
    } = this.props;

    const shipmentsProps = {
      isLoading,
      shipments,
      totalShipments,
      filter,
      className: classes.item,
      updateShipmentsHandler: this.updateShipmentsHandler,
      deleteShipmentsHandler: this.deleteShipmentsHandler,
      createShipmentsHandler: this.createShipmentsHandler,
      onChangeHandler: this.onChangeHandler
    };

    const createOrUpdateProps = {
      postOffices,
      isOpenCreateOrUpdateModal,
      closeModal: this.closeModal,
      createOrUpdateShipmentData,
      onChangeHandler: this.onChangeHandler,
      createOrUpdateShipmentHandler: this.createOrUpdateShipmentHandler
    };

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid item>
            <ShipmentsTable {...shipmentsProps}/>
          </Grid>
        </div>
        <ShipmentsTableCreateOrUpdate {...createOrUpdateProps}/>
      </DashboardLayout>
    );
  }
}

Container.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  createOrUpdateShipmentData: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpenCreateOrUpdateModal: PropTypes.bool.isRequired,
  postOffices: PropTypes.array.isRequired,
  shipments: PropTypes.array.isRequired,
  totalShipments: PropTypes.number.isRequired
};


const mapStateToProps = (state, ownProps) => ({
  ...state,
  ...ownProps
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ raiseAction }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles)(Container)));
