import React from 'react';
import { StyleSheet, Text, View ,ImageBackground,Image, ActivityIndicator} from 'react-native';
import { YellowBox } from 'react-native';
import {formatdDate} from '../utils/constant'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import {Query } from 'react-apollo';
import gql from "graphql-tag";

const QUERY_RESERVATION = gql`
  query Reservation($id: Int!) {
    reservation(id: $id) {
      name,
      hotelName,
      arrivalDate,
      departureDate,
    }
  }
`;

export default class ReservationDetails extends React.Component {

  static navigationOptions = ({navigation}) => { return { headerTransparent: true, headerStyle: { borderBottomWidth: 0, } } }

  constructor(props) {
    super(props);
   
  }

 

  render() {

    const { navigation } = this.props;
     const id = navigation.getParam('id',' ')

    return (
      <Query query={QUERY_RESERVATION} variables={{ id }}>
      {({ loading, data: { reservation } }) => (
            
            !loading?
            <ImageBackground source={require('../img/loginBackground.jpg')} style={styles.background}>
                  <View style={styles.container}>
                      <Image source={require('../img/logo.png')} style={styles.logo}/>

                        <Text style={styles.textOptions}> Name: {reservation.name}</Text>
                        <Text style={styles.textOptions}> Hotel Name: {reservation.hotelName}</Text>
                        <Text style={styles.textOptions}> Arrival Date: { formatdDate(reservation.arrivalDate)}</Text>
                        <Text style={styles.textOptions}> Departure Date: { formatdDate(reservation.departureDate)}</Text>
                      
                  </View>
            </ImageBackground>
            :
            <View style={{flex:1,margin:5,justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator  size="large" color="#114937"/>
            </View> 
      )}
      </Query> 
    );
  }
}

var styles = StyleSheet.create({
    background: {
      flex:1,
      flexDirection: 'column',
      justifyContent: "center",
    },
    container:{
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    logo:{
        width:'75%',
        height:'50%',
        marginBottom:15
    },


    textOptions:{
      color:"#114937",
      fontSize:16,
      fontWeight:  'bold',
      marginBottom:5
    }
  });