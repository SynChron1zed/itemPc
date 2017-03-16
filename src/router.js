import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Layouty from './components/Layouty';
import ItemPlay from './routes/ItemPlay';
import Holiday from './routes/Holiday';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/layouty" component={Layouty} />
      <Route path="/itemplay" component={ItemPlay} />
      <Route path="/holiday" component={Holiday} />
    </Router>
  );
}

export default RouterConfig;
