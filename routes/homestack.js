import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer} from 'react-navigation'
import Home from '../screens/Home'
import Details from '../screens/Details'

const screens = {
     Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
  };
  

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)