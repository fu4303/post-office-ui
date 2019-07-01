import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, Select, MenuItem, TextField } from '@material-ui/core';
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

const filterTypes = [{
  name: 'Shipment Name',
  value: 'shipment'
}, {
  name: 'Post Office Name',
  value: 'postOffice'
}, {
  name: 'Tracking ID',
  value: 'trackingId'
}, {
  name: 'Shipment Type',
  value: 'type'
}, {
  name: 'Weight',
  value: 'weight'
}, {
  name: 'Status',
  value: 'status'
}];

class ShipmentsTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  }
  render() {
    const {
      classes,
      className,
      isLoading,
      shipments,
      totalShipments,
      updateShipmentsHandler,
      deleteShipmentsHandler,
      createShipmentsHandler,
      filter,
      onChangeHandler
    } = this.props;
    const rootClassName = classNames(classes.root, className);
    const showOrders = !isLoading && shipments.length > 0;

    const filterTypesUI = filterTypes.map((filterType, index) => {
      return (
        <MenuItem value={filterType.value} key={index}>{filterType.name}</MenuItem>
      );
    });

    const tableBody = shipments.map((shipment) => {
        let isShipmentValid = false;
        switch (filter.value) {
          case 'shipment':
            isShipmentValid = shipment.name.toLocaleLowerCase().includes(filter.filterText.toLocaleLowerCase());
            break;
          case 'postOffice':
            isShipmentValid = shipment.postoffice.toLocaleLowerCase().includes(filter.filterText.toLocaleLowerCase());
            break;
          case 'trackingId':
            isShipmentValid = shipment.trackingId.toLocaleLowerCase().includes(filter.filterText.toLocaleLowerCase());
            break;
          case 'type':
            isShipmentValid = shipment.type.toLocaleLowerCase().includes(filter.filterText.toLocaleLowerCase());
            break;
          case 'weight':
            isShipmentValid = shipment.weight.toLocaleLowerCase().includes(filter.filterText.toLocaleLowerCase());
            break;
          case 'status':
            isShipmentValid = shipment.status.toLocaleLowerCase().includes(filter.filterText.toLocaleLowerCase());
            break;
          default:
            isShipmentValid = true;
            break;
        }
        if (isShipmentValid) {
          return (
      <TableRow
        className={classes.tableRow}
        hover
        key={shipment._id}
      >
        <TableCell align="center" className={classes.customerCell}>
          {shipment.name}
        </TableCell>
        <TableCell align="center" className={classes.customerCell}>
          {shipment.postoffice}
        </TableCell>
        <TableCell align="center" className={classes.customerCell}>
          {shipment.trackingId}
        </TableCell>
        <TableCell align="center" className={classes.customerCell}>
          {shipment.type}
        </TableCell>
        <TableCell align="center" className={classes.customerCell}>
          {shipment.weight}
        </TableCell>
        <TableCell align="center" className={classes.customerCell}>
          {shipment.status}
        </TableCell>
        <TableCell align="center">
          <ButtonGroup
            color="primary"
            size="small"
            aria-label="Large outlined secondary button group"
          >
            <Button variant="contained" onClick={() => {
              updateShipmentsHandler(shipment);
            }}>
              <UpdateIcon/>
              Update
            </Button>
            <Button onClick={() => {
              deleteShipmentsHandler(shipment);
            }}>
              <DeleteIcon/>Delete
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
          );
        }

      }
    );

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${totalShipments} in total`}
            title="Shipments"
          />
          <PortletToolbar>

            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="standard-select-currency"
                select
                label="Filter"
                className={classes.textField}
                value={filter.value}
                onChange={(event) => {
                  onChangeHandler('filter', event.target.value);
                }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {filterTypesUI}
              </TextField>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {
                filter && filter.value &&
                <TextField
                  id="standard-search"
                  label="Search field"
                  type="search"
                  className={classes.textField}
                  margin="normal"
                  value={filter.text}
                  onChange={(event) => {
                    onChangeHandler('filterText', event.target.value);
                  }}
                />
              }
            </form>

            <Button
              className={classes.newEntryButton}
              color="primary"
              size="small"
              variant="outlined"
              onClick={createShipmentsHandler}>
              New Shipment
            </Button>
          </PortletToolbar>
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent
            className={classes.portletContent}
            noPadding>
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress/>
              </div>
            )}

            {showOrders && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Shipment Name</TableCell>
                    <TableCell align="center">Post Office</TableCell>
                    <TableCell align="center">Tracking ID</TableCell>
                    <TableCell align="center">Shipment Type</TableCell>
                    <TableCell align="center">Weight</TableCell>
                    <TableCell align="center">Status</TableCell>
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

ShipmentsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  createShipmentsHandler: PropTypes.func.isRequired,
  deleteShipmentsHandler: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  isLoading: PropTypes.string.isRequired,
  shipments: PropTypes.array.isRequired,
  totalShipments: PropTypes.number.isRequired,
  updateShipmentsHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(ShipmentsTable);