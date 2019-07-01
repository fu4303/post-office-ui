import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  withStyles,
  TextField,
  Select,
  MenuItem,
  Grid,
  Paper,
  InputLabel
} from '@material-ui/core';
import styles from '../ShipmentsTable/styles';

const shipmentTypes = [{
  name: 'Letter'
}, {
  name: 'Package'
}];

const shipmentWeights = [{
  name: 'Less than 1kg'
}, {
  name: 'Between 1kg and 5kg'
}, {
  name: 'More than 5kg'
}];


const shipmentStatuses = [{
  name: 'Received and processed in the parcel center of origin'
}, {
  name: 'Received and processed in the destination parcel center'
}, {
  name: 'Delivered'
}];

class ShipmentsCreateOrUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      open2: false,
      open3: false
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  handleClose1 = () => {
    this.setState({
      open1: false
    });
  }

  handleClose2 = () => {
    this.setState({
      open2: false
    });
  }

  handleClose3 = () => {
    this.setState({
      open3: false
    });
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  }

  handleOpen1 = () => {
    this.setState({
      open1: true
    });
  }

  handleOpen2 = () => {
    this.setState({
      open2: true
    });
  }

  handleOpen3 = () => {
    this.setState({
      open3: true
    });
  }

  render() {

    const {
      isOpenCreateOrUpdateModal,
      closeModal,
      classes,
      createOrUpdateShipmentData,
      onChangeHandler,
      createOrUpdateShipmentHandler,
      postOffices
    } = this.props;

    const postOfficesOptions = postOffices && postOffices.map((postOffice, index) => {
      return (
        <MenuItem value={postOffice.name} key={index}>{postOffice.name}</MenuItem>
      );
    });

    const typesOptions = shipmentTypes.map((shipmentType, index) => {
      return (
        <MenuItem value={shipmentType.name} key={index}>{shipmentType.name}</MenuItem>
      );
    });

    const shipmentWeightsOptions = shipmentWeights.map((shipmentWeight, index) => {
      return (
        <MenuItem value={shipmentWeight.name} key={index}>{shipmentWeight.name}</MenuItem>
      );
    });

    const shipmentStatusesUI = shipmentStatuses.map((shipmentStatus, index) => {
      return (
        <MenuItem value={shipmentStatus.name} key={index}>{shipmentStatus.name}</MenuItem>
      );
    });

    return (
      <Dialog open={isOpenCreateOrUpdateModal} onClose={closeModal} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Manage Post Office</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Shipment Name"
            type="text"
            fullWidth
            className={classes.textField}
            value={createOrUpdateShipmentData.name}
            onChange={(event) => {
              onChangeHandler('name', event.target.value);
            }}
          />
          <br/>
          <Grid container spacing={3}>
            <Grid item xs={6}>

              <InputLabel shrink htmlFor="demo-controlled-open-select">
                Post Office
              </InputLabel>
              <Select
                open={this.state.open}
                value={createOrUpdateShipmentData.postoffice}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                onChange={(event) => {
                  onChangeHandler('postoffice', event.target.value);
                }}
                inputProps={{
                  name: 'age',
                  id: 'demo-controlled-open-select'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {postOfficesOptions}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="demo-controlled-open-select1">
                Shipment Type
              </InputLabel>
              <Select
                open={this.state.open1}
                value={createOrUpdateShipmentData.type}
                onClose={this.handleClose1}
                onOpen={this.handleOpen1}
                onChange={(event) => {
                  onChangeHandler('type', event.target.value);
                }}
                inputProps={{
                  name: 'age1',
                  id: 'demo-controlled-open-select1'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {typesOptions}
              </Select>
            </Grid>

          </Grid>


          <InputLabel shrink htmlFor="demo-controlled-open-select1">
            Shipment Weight
          </InputLabel>
          <Select
            open={this.state.open2}
            value={createOrUpdateShipmentData.weight}
            onClose={this.handleClose2}
            onOpen={this.handleOpen2}
            onChange={(event) => {
              onChangeHandler('weight', event.target.value);
            }}
            inputProps={{
              name: 'age2',
              id: 'demo-controlled-open-select2'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {shipmentWeightsOptions}
          </Select>

          <Grid item xs={6}>
            <InputLabel shrink htmlFor="demo-controlled-open-select3">
              Shipment Status
            </InputLabel>
            <Select
              open={this.state.open3}
              value={createOrUpdateShipmentData.status}
              onClose={this.handleClose3}
              onOpen={this.handleOpen3}
              onChange={(event) => {
                onChangeHandler('status', event.target.value);
              }}
              inputProps={{
                name: 'age3',
                id: 'demo-controlled-open-select3'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {shipmentStatusesUI}
            </Select>
          </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="default">
            Cancel
          </Button>
          <Button onClick={createOrUpdateShipmentHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ShipmentsCreateOrUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  createOrUpdateShipmentData: PropTypes.object.isRequired,
  createOrUpdateShipmentHandler: PropTypes.func.isRequired,
  isOpenCreateOrUpdateModal: PropTypes.bool.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  postOffices: PropTypes.array.isRequired
};

export default withStyles(styles)(ShipmentsCreateOrUpdate);

