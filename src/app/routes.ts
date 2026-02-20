import { createBrowserRouter } from 'react-router';
import Cover from './pages/Cover';
import Login from './pages/Login';
import Map from './pages/Map';
import Phase from './pages/Phase';
import Celebration from './pages/Celebration';
import Transition from './pages/Transition';
import Finalization from './pages/Finalization';
import Admin from './pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Cover,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/map',
    Component: Map,
  },
  {
    path: '/phase/:id',
    Component: Phase,
  },
  {
    path: '/celebration/:id',
    Component: Celebration,
  },
  {
    path: '/transition/:id',
    Component: Transition,
  },
  {
    path: '/finalization',
    Component: Finalization,
  },
  {
    path: '/admin',
    Component: Admin,
  },
]);
