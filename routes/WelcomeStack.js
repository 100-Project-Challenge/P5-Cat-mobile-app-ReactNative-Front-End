
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Welcome from "../screens/Welcome/Welcome";
import NewCat from "../screens/NewCat/NewCat";
import CatsList from "../screens/CatsList/CatsList";
import CatProfile from "../screens/CatProfile/CatProfile";


const screens = {
   Welcome : {
       screen: Welcome
   },
   NewCat : {
       screen: NewCat
   },
   CatProfile:{
       screen: CatProfile
   },

   CatsList: {
       screen: CatsList
   }
}

const WelcomeStack = createStackNavigator(screens);

export default createAppContainer(WelcomeStack);