import React from 'react';
import { StyleSheet, Text,View ,ImageBackground, ActivityIndicator,KeyboardAvoidingView,Alert} from 'react-native';
import { Akira } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import DismissKeyBoard from './DismissKeyBoard'
import DateRangePicker from '../utils/DateRangePicker';
import {Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import {getFormattedTodayDate,addDays} from '../utils/constant'


export default class  Create extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      requesting:false,
      hotelName:'',
      name:'',
      arrivalDate: getFormattedTodayDate(new Date()),
      departureDate:  getFormattedTodayDate( addDays(new Date(),5) ) 

    }
   
  }



  render() {
    
    const {requesting,name,hotelName,arrivalDate,departureDate} = this.state

    return (
        <Mutation mutation={createReservation}>
        {(addReservation, { loading, error  }) => (
            <DismissKeyBoard>
                <ImageBackground source={require('../img/loginBackground.jpg')} style={styles.background}>
                    <KeyboardAvoidingView  behavior="padding" enabled>
                        
                
                        <View style={styles.container}>

                        <Akira
                            style={styles.input}
                            label={'Name'}
                            borderColor={'#114937'}
                            labelStyle={{ color: '#114937' }}
                            onChangeText={(text) =>  this.setState({name: text}) }
                            value={name}
                        />

                        <Akira
                            style={styles.input}
                            label={'Hotel name'}
                            borderColor={'#114937'}
                            labelStyle={{ color: '#114937' }}
                            onChangeText={(text) =>  this.setState({hotelName: text}) }
                            value={hotelName}
                        />

                        <DateRangePicker
                            initialRange={[arrivalDate, departureDate]}
                            onSuccess={(s, e) => this.setState({departureDate:e,arrivalDate:s}) }
                            theme={{ markColor: '#114937', markTextColor: 'white' }}/>

                        {!loading?
                        
                            <Button
                            containerStyle={styles.button}
                            disabledContainerStyle={{backgroundColor: 'grey'}}
                            style={{fontSize: 20, color: 'white'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => {
                                if(name.trim()=='')
                                  Alert.alert("Field Name can't be empty")
                                else if(hotelName.trim() == '')
                                    Alert.alert("Field Hotel name can't be empty")
                                else
                                addReservation({ variables: { name,hotelName,arrivalDate,departureDate} })
                            }}>
                            CREATE
                            </Button>
                            :
                            <ActivityIndicator size="large" color="#114937" style={{marginTop:15}} />
                        }

                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </DismissKeyBoard>
         )}
         </Mutation>
    );
  }
}

var styles = StyleSheet.create({
    background: {
      flex:1,
      flexDirection: 'column',
     
    },
    container:{
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        paddingLeft:25,
        paddingRight:25,
        paddingTop:15
    },
    input:{
        width:'100%',
        marginBottom:15,
    },
    button:{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#114937',width:150,marginTop:15},
    buttonLogout:{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#406c60',width:150,marginTop:15},
   
});


const createReservation = gql`
  mutation AddReservation($name: String!,$hotelName: String!,$arrivalDate: String!,$departureDate: String!){
    addReservation(name: $name,hotelName:$hotelName,arrivalDate:$arrivalDate,departureDate:$departureDate)
  }
`;

