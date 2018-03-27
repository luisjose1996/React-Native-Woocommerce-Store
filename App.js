import React from "react";
import {
  Text,
  Button,
  Animated,
  Easing,
  Image
} from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import HomePage from './src/components/Home/HomePage';
import Products from "./src/components/Products/ProductList";
import Product from "./src/components/Products/Product";
import CartPage from './src/components/Cart/CartPage';
import DrawerContainer from './src/components/Drawer/DrawerContainer';
import configureStore from './src/store/configureStore';
import InitialState from './src/reducers/InitialState';

const DrawerNavigation = DrawerNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: "Laccadive IO Store"
    }
  },
  Products: {
    screen: Products,
    navigationOptions: {
      title: "Products"
    }
  },
  Product: {
    screen: Product,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.product.name
    }),
  },
  CartPage: {
    screen: CartPage,
    navigationOptions: {
      title: "Cart"
    }
  }
}, {
    gesturesEnabled: false,
    contentComponent: DrawerContainer
  });


  const StackNavigation = StackNavigator({
    DrawerNavigation: { screen: DrawerNavigation }
  }, {
      headerMode: 'float',
      navigationOptions: ({ navigation, screenProps }) => ({
        headerStyle: { backgroundColor: '#4C3E54' },
        headerTintColor: 'white',
        gesturesEnabled: false,
        headerLeft: drawerButton(navigation),
        headerRight: cartButton(navigation, screenProps)
      })
    });

const drawerButton = (navigation) => (
  <Text
    style={{ padding: 15, color: 'white' }}
    onPress={() => {
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
    }><Ionicons name="ios-menu" size={30} /></Text>
);

const cartButton = (navigation, screenProps) => <Text style={{ padding: 15, color: 'white' }} onPress={() => {
  navigation.navigate('CartPage')
}
}><EvilIcons name="cart" size={30} />{screenProps.cartCount}</Text>;

const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    }
  }

  render() {
    return (
      <Provider store={store}>
        <StackNavigation screenProps={this.state} />
      </Provider>
    )
  }
}

export default App;
