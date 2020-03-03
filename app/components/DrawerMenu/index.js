import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import List from '@material-ui/core/List';
import Img from './Img';
import Logo from './logo.png';
import SideBarMenu from './SideBarMenu';

const drawerWidth = 240;

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      button: {
        '&:focus':{
          // backgroundColor: '#f5f802',
        },
        '&:hover': {
          // backgroundColor: '#aaaa3e'
        },
      }
    },
    MuiListItemIcon: {
      root: {
        color: '#f5f802',
      }
    },
    MuiListItemText:{
      primary: {
        color: '#f5f802',
      },
    }
  },
  typography: { useNextVariants: true },
});

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: '#242D3E',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    color: 'white',
    ...theme.mixins.toolbar,
  },
  list: {
    color: 'white',
  }
})
class DrawerMenu extends React.Component {
  render() {
    const { classes, isOpen, onClose } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
          }}
          open={isOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton color="inherit" onClick={onClose}>
              <Icon>chevron_left</Icon>
            </IconButton>
          </div>
          <Img src={Logo} alt="Beeroll Logo" />
          <List>
          <SideBarMenu to="/" icon="movie_creation" text="Storyboards"/>
          <SideBarMenu to="/videos" icon="camera_roll" text="Videos"/>
          <SideBarMenu to="/users" icon="people" text="Users"/>
        </List>
        </Drawer>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(styles)(DrawerMenu);
