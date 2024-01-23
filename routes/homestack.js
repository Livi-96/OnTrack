import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer} from 'react-navigation'
import Home from '../screens/Home'
import Details from '../screens/Details'
import Calendar from '../screens/Calendar'

const screens = {
     Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
    Calendar: {
      screen : Calendar
    }
  };
  

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)