import React from 'react';
import ReservationDetails from './components/ReservationDetails'
import Create from './components/Create'
import Reservation from './components/Reservation'
import { createStackNavigator,createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';



const ResevationStack = createStackNavigator(
  {
    Reservation: Reservation,
    ReservationDetails:ReservationDetails
  },
  {
    initialRouteName: 'Reservation',
  }
);

const Tabs = createBottomTabNavigator(
  
  {
    Reservation: ResevationStack,
    New: Create,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state; 
        let iconName;
        if (routeName === 'Reservation') {
          iconName = `ios-basket`;
        } else if (routeName === 'New') {
          iconName = `ios-add-circle`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#114937',
      inactiveTintColor: 'gray',
    },
  }
);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


export default class App extends React.Component {

  static navigationOptions = ({navigation}) => { return { headerTransparent: true, headerStyle: { borderBottomWidth: 0, } } }

  constructor(props) {
    super(props);
   
  }

  render() {
    return  <ApolloProvider client={client}>
                <Tabs />
            </ApolloProvider>
    
  }
}
