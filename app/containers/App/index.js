/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import {
  makeSelectCurrentUser,
} from 'containers/App/selectors';

import LoginPage from 'containers/LoginPage/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import DrawerMenu from 'components/DrawerMenu';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';
import StoryboardPage from '../StoryboardPage';

const AppWrapper = styled.div`
  display: flex;
`;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: 60,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class App extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Beeroll Client Portal"
          defaultTitle="Beeroll Client Portal"
        >
          <meta name="description" content="Beeroll Client Portal Application" />
        </Helmet>

        { !user ?
          (
            <Switch>
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          ) : (
            <div>
            <Header isOpen={this.state.open} onOpen={this.handleDrawerOpen} />
            <DrawerMenu isOpen={this.state.open} onClose={this.handleDrawerClose} />
            
            <main className={classes.content}>
              <Switch>
                <Route exact path="/" component={StoryboardPage} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            <Footer />
            <GlobalStyle />
            </main>
            </div>
          )}

        
        
      </AppWrapper>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(withStyles(styles)(App));
