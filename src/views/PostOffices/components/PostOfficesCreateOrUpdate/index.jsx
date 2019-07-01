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
  TextField
} from '@material-ui/core';
import styles from '../PostOfficesTable/styles';

class PostOfficeCreateOrUpdate extends Component {

  render() {

    const {
      isOpenCreateOrUpdateModal,
      closeModal,
      classes,
      createOrUpdatePostOfficeData,
      onChangeHandler,
      createOrUpdatePostOfficeHandler
    } = this.props;

    return (
      <Dialog open={isOpenCreateOrUpdateModal} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Manage Post Office</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Post Office Name"
            type="email"
            fullWidth
            className={classes.textField}
            value={createOrUpdatePostOfficeData.name}
            onChange={(event) => {
              onChangeHandler('name', event.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="name"
            label="Zip Code"
            type="zip"
            fullWidth
            className={classes.textField}
            value={createOrUpdatePostOfficeData.zipcode}
            onChange={(event) => {
              onChangeHandler('zipcode', event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="default">
            Cancel
          </Button>
          <Button onClick={createOrUpdatePostOfficeHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

PostOfficeCreateOrUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  createOrUpdatePostOfficeData: PropTypes.object.isRequired,
  createOrUpdatePostOfficeHandler: PropTypes.func.isRequired,
  isOpenCreateOrUpdateModal: PropTypes.bool.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(PostOfficeCreateOrUpdate);

