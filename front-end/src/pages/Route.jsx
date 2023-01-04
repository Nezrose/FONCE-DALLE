import Home01 from './Home01';
import Produits from './Produits';
import Produit from '../components/produits/product';
import SignInSide from './Connexion';
import SignUpSide from './Inscription';
import Profil from './Profile';
import PrivateRoute from '../services/Permission'
import UnPrivateRoute from '../services/Permission2'
import ConfirmInscription from './Confirm-Inscription';



const routes = [
  { path: '/', component: <Home01 />},
  { path: '/produits', component: <Produits />},
  { path: '/produits/:id', component: <Produit />},
  { path: '/inscription/', component: <UnPrivateRoute><SignUpSide /></UnPrivateRoute>},
  { path: '/connexion/', component: <UnPrivateRoute><SignInSide /></UnPrivateRoute>},
  { path: '/profile', component: <PrivateRoute><Profil/></PrivateRoute>},
  { path: '/profile/info', component: <PrivateRoute><Profil/></PrivateRoute>},
  { path: '/confirm-inscription', component: <UnPrivateRoute><ConfirmInscription/></UnPrivateRoute>}

]

export default routes;