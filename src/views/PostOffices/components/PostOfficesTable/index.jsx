import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';
import { Create as UpdateIcon, Delete as DeleteIcon } from '@material-ui/icons';

// Material components
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup
} from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent
} from 'components';

// Component styles
import styles from './styles';

class PostOfficesTable extends Component {

  render() {
    const {
      classes,
      className,
      isLoading,
      postOffices,
      totalPostOffices,
      updatePostOfficeHandler,
      deletePostOfficeHandler,
      createPostOfficeHandler
    } = this.props;

    const rootClassName = classNames(classes.root, className);
    const showOrders = !isLoading && postOffices.length > 0;

    const tableBody = postOffices.map(postOffice => (
      <TableRow
        className={classes.tableRow}
        hover
        key={postOffice._id}
      >
        <TableCell align="center">{postOffice._id}</TableCell>
        <TableCell align="center" className={classes.customerCell}>
          {postOffice.name}
        </TableCell>
        <TableCell align="center" className={classes.customerCell}>
          {postOffice.zipcode}
        </TableCell>
        <TableCell align="center">
          <ButtonGroup
            color="primary"
            size="small"
            aria-label="Large outlined secondary button group"
          >
            <Button variant="contained" onClick={() => {
              updatePostOfficeHandler(postOffice);
            }}>
              <UpdateIcon/>
              Update
            </Button>
            <Button onClick={() => {
              deletePostOfficeHandler(postOffice);
            }}>
              <DeleteIcon/>Delete
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    ));

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${totalPostOffices} in total`}
            title="Post Offices"
          />
          <PortletToolbar>
            <Button
              className={classes.newEntryButton}
              color="primary"
              size="small"
              variant="outlined"
              onClick={createPostOfficeHandler}>
              New Post Office
            </Button>
          </PortletToolbar>
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent
            className={classes.portletContent}
            noPadding
          >
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress/>
              </div>
            )}

            {showOrders && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Post Office ID</TableCell>
                    <TableCell align="center">Post Office Name</TableCell>
                    <TableCell align="center">Zip Code</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableBody}
                </TableBody>
              </Table>
            )}
          </PortletContent>
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

PostOfficesTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  createPostOfficeHandler: PropTypes.func.isRequired,
  deletePostOfficeHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.string.isRequired,
  postOffices: PropTypes.array.isRequired,
  totalPostOffices: PropTypes.number.isRequired,
  updatePostOfficeHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(PostOfficesTable);
