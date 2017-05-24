import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Layouty from './components/Layouty';
import ItemPlay from './routes/ItemPlay';
import Holiday from './routes/Holiday';
import Process from './routes/Process';
import DailyPK from './routes/DailyPK';
import ProductAnaly from './routes/ProductAnaly';
import HistoryFest from './routes/HistoryFest';
import BestSell from './routes/BestSell';
import ParamSet from './routes/ParamSet';
import Login from './routes/Login';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/" component={Layouty}>
        <Route path="itemplay" component={ItemPlay} />
        <Route path="holiday" component={Holiday} />
        <Route path="process" component={Process} />
        <Route path="dailyPK" component={DailyPK} />
        <Route path="productAnaly" component={ProductAnaly} />
        <Route path="historyFest" component={HistoryFest} />
        <Route path="bestSell" component={BestSell} />
        <Route path="paramSet" component={ParamSet} />

      </Route>
      <Route path="indexPage" component={IndexPage} />
    </Router>
  );
}

export default RouterConfig;
