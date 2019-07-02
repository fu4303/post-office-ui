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

import { PostOfficesTable, PostOfficesCreateOrUpdate } from '../components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: '100%'
  }
});

class Container extends Component {


  createOrUpdatePostOfficeHandler = () => {
    const { actions } = this.props;
    actions.raiseAction(Actions.SUBMIT_CREATE_OR_UPDATE);
  }

  onChangeHandler = (key, value) => {
    const { actions, createOrUpdatePostOfficeData } = this.props;
    switch (key) {
      case 'name':
        createOrUpdatePostOfficeData.name = value;
        break;
      case 'zipcode':
        createOrUpdatePostOfficeData.zipcode = value;
        break;
      default:
        break;
    }
    actions.raiseAction(Actions.CREATE_POST_OFFICE_DATA, { ...createOrUpdatePostOfficeData });
  }

  createPostOfficeHandler = () => {
    const { actions } = this.props;
    actions.raiseAction(Actions.CREATE_POST_OFFICE_DATA, {});
    actions.raiseAction(Actions.OPEN_CREATE_OR_UPDATE_MODAL);
  }

  closeModal = () => {
    const { actions } = this.props;
    actions.raiseAction(Actions.CLOSE_CREATE_OR_UPDATE_MODAL);
  }

  updatePostOfficeHandler = (postOffice) => {
    const { actions } = this.props;
    actions.raiseAction(Actions.UPDATE_POST_OFFICE_DATA, postOffice);
  }

  deletePostOfficeHandler = (postOffice) => {
    const { actions } = this.props;
    actions.raiseAction(Actions.DELETE_POST_OFFICE_DATA, postOffice);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.raiseAction(Actions.INIT_POST_OFFICES_COMPONENT);
  }

  render() {
    const {
      classes,
      createOrUpdatePostOfficeData,
      isLoading,
      postOffices,
      totalPostOffices,
      isOpenCreateOrUpdateModal
    } = this.props;

    const postOfficesProps = {
      isLoading,
      postOffices,
      totalPostOffices,
      className: classes.item,
      updatePostOfficeHandler: this.updatePostOfficeHandler,
      deletePostOfficeHandler: this.deletePostOfficeHandler,
      createPostOfficeHandler: this.createPostOfficeHandler
    };

    const createOrUpdateProps = {
      isOpenCreateOrUpdateModal,
      closeModal: this.closeModal,
      createOrUpdatePostOfficeData,
      onChangeHandler: this.onChangeHandler,
      createOrUpdatePostOfficeHandler: this.createOrUpdatePostOfficeHandler
    };

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid item>
            <PostOfficesTable {...postOfficesProps}/>
          </Grid>
        </div>
        <PostOfficesCreateOrUpdate {...createOrUpdateProps}/>
      </DashboardLayout>
    );
  }
}

Container.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  createOrUpdatePostOfficeData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpenCreateOrUpdateModal: PropTypes.bool.isRequired,
  postOffices: PropTypes.array.isRequired,
  totalPostOffices: PropTypes.number.isRequired
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
