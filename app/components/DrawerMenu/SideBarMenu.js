import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
const StyledLink = styled(Link)`
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

const styles = theme => ({
  root:{
    backgroundColor: '#f5f802',
    color: '#242D3E'
  },
  icon: {
    color: '#242D3E'
  },
  text: {
    color: '#242D3E'
  }
})
class SideBarMenu extends React.Component {
  render() {
    const {location: {pathname}, icon, text, classes, to} = this.props;
    const selected = (to == pathname);
    return (<StyledLink to={to}><div className={classNames(selected && classes.root)}><ListItem button>
      <ListItemIcon>
        <Icon className={classNames(selected && classes.icon)}>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={text} classes={{ primary: selected && classes.text}}/>
    </ListItem></div></StyledLink>)
  }
}

export default withRouter(withStyles(styles)(SideBarMenu))
