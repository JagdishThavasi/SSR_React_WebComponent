import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import Routes from './client/Routes'
import server from './server/server'
import createStore from './server/createStore'

const app = express();

app.use(express.static('dist'))
app.get('*', (req, res) => {
  const store = createStore()
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null
  });

  Promise.all(promises).then(() => {
    res.send(server(req, store))
  });
});

app.listen(3030, () => {
  console.log('Listening on port 3030')
});
