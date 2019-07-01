import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  MailOutline as MailIcon,
  LocalShipping as ShipmentIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Sidebar extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/"
          >
            <img
              alt="Deutsche Post "
              className={classes.logoImage}
              src="/images/logos/logo.jpeg"
              style={{width: 50,marginTop: 15}}
            />
          </Link>
        </div>
        <Divider className={classes.profileDivider}/>
        <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/post-offices"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <MailIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Post Offices"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/shipments"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ShipmentIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Shipments"
            />
          </ListItem>
        </List>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
