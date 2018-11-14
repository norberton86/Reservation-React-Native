import React from 'react';
import { StyleSheet, View ,ImageBackground, ActivityIndicator,Image,FlatList,AsyncStorage,Text,TouchableOpacity,Alert} from 'react-native';
import { Card } from 'react-native-cards';
import {Query } from 'react-apollo';
import gql from "graphql-tag";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


const QUERY_RESERVATIONS = gql`
{
  reservations{
    id,
    name,
    hotelName
  }
}
`;

export default class Reservation extends React.Component {

 static navigationOptions = ({navigation}) => { return { headerTransparent: true, headerStyle: { borderBottomWidth: 0, } } }

  constructor(props) {
    super(props);
    this.state={
        requesting:false,
        data:[],
    }
  }

  _keyExtractor = (item, index) => item.id;

  render() {

    return (
            <ImageBackground source={require('../img/loginBackground.jpg')} style={{flex:1,backgroundColor:'white',paddingTop:20}}>

                  <Query query={QUERY_RESERVATIONS}>
                    {({ loading, data: { reservations } ,refetch}) => (

                        !loading?
                        <View style={{flex:1,margin:5}}>
                            
                            <TouchableOpacity activeOpacity = { .5 } onPress={() => alert('dsfds')}>
                                <Text>Refresh</Text>
                            </TouchableOpacity>

                            <FlatList
                                keyExtractor={this._keyExtractor}
                                data={reservations}
                                renderItem={({ item }) => (
                                
                                    <TouchableOpacity style={{flex:1}} activeOpacity = { .5 } onPress={() => this.props.navigation.push('ReservationDetails', {id: item.id})}>
                                        <Card style={{padding:5}}>
                        
                                            <Text style={styles.text}> <Ionicons name={'ios-contact'} size={25} color={'#114937'} /> {item.name.toUpperCase()}</Text>
                                            <Text style={styles.text}> <Ionicons name={'ios-home'} size={25} color={'#114937'} /> {item.hotelName.toUpperCase()}</Text>
                                        </Card>
                                    </TouchableOpacity>
                               
                                )}
                            />
                        </View>
                        :
                        <View style={{flex:1,margin:5,justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator  size="large" color="#114937"/>
                        </View> 

                    )}
                </Query> 

            </ImageBackground>
    );
  }
}

var styles = StyleSheet.create({
    background: {
      flex:1,
      flexDirection: 'column',
      paddingLeft:25,
      paddingRight:25,
      paddingTop:20
    },
    text:{
        fontSize:20,
    }
});


