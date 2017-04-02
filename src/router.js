import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Layouty from './components/Layouty';
import ItemPlay from './routes/ItemPlay';
import Holiday from './routes/Holiday';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Layouty}>
        <Route path="itemplay" component={ItemPlay} />
        <Route path="holiday" component={Holiday} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
