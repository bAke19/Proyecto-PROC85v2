import React,{Component} from "react";
import { View, 
         Text,
         Image,
         Button, 
         StyleSheet, 
         TouchableOpacity,
         SafeAreaView,
         StatusBar,
         ScrollView,
         TextInput,
         KeyboardAvoidingView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera';
import { RFValue } from "react-native-responsive-fontsize";
import CameraPost from "./CameraPost";

export default class CreatePost extends Component{
    constructor(props){
        super(props);
        this.cameraRef = null;
        this.state = {
            image : null,
            permission: false,
            cameraType: CameraType.back,
            imageHeight: 0,
            title: '',
            description: ''
        }
    }

    componentDidMount(){
        
    }

    getGranted = async () => {
        const status = await Camera.requestCameraPermissionsAsync();

        if(status.granted){
            return this.setState({permission: true});
        }else{
            return await Camera.requestCameraPermissionsAsync()
        }
        
    }

    

    toggleCameraType = () => {
        return this.setState({ cameraType: this.state.cameraType === CameraType.back ? CameraType.front : CameraType.back})
        //return await Camera.takePictureAsync()
    }

    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,

          quality: 1,
        });
    
        console.log(result.assets[0].height/10);

        var newImageHeight = result.assets[0].height/10
    
        if (!result.canceled) {
          this.setState({image: result.assets[0].uri, imageHeight: newImageHeight < 500 ? newImageHeight : 450 });
        }
      };

    takePicture = async () => {  
      const options = { uri: '' };
     
      console.log();

    };
  
    onPictureSaved = photo => {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
       // const data = this.state.cameraRef.current.takePictureAsync(options)
        return console.log("data: " + this.state.cameraRef.current);
      
    } 

    render(){
        if (!this.state.permission) {
            // Camera permissions are not granted yet
            return (
              <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.titleContainer}>
                    <View style={styles.titleImageContainer}>
                        <Image
                            style={styles.iconImage}
                            source={require("../assets/camara1.png")}
                        />
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText}>
                            Spectagram
                        </Text>
                    </View>
                </View>
                <ScrollView>
                  <Image source={{ uri: this.state.image }} style={!this.state.image ? {height:20}: [styles.imageSelected, {height: this.state.imageHeight}]} />
                  <View style={styles.twoColums}>
                    <TouchableOpacity 
                      style={styles.buttons}
                      onPress={() => {this.getGranted()}}>
                      <Text
                        style={styles.textButtons}>
                        Tomar Foto
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.buttons}
                      onPress={() =>{this.pickImage()}}>
                      <Text
                        style={styles.textButtons}>
                        Galeria
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <KeyboardAvoidingView>
                    <TextInput
                      style={[styles.buttons,styles.inputs]}
                      onChangeText={text => this.setState({title: text})}
                      placeholder="  Titulo"
                      maxLength={100}
                      />
                    <TextInput
                      style={[styles.buttons,styles.inputs]}
                      onChangeText={text => this.setState({description: text})}
                      placeholder="  Descripción"
                      multiline={true}
                      numberOfLines={4}
                      maxLength={200}
                      />
                  </KeyboardAvoidingView>
                </ScrollView>
                
              </View>
            );
        }else{
            return(
              <Camera 
                style={styles.camera} 
                type={this.state.cameraType}
                ratio="1:1">
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                      onPress={() =>{
                        this.takePicture()
                      }}>
                      <Image
                          style={[styles.iconImage, {height:40, width: 40}]}
                          source={require("../assets/camara1.png")}
                      />
                    </TouchableOpacity>
                  </View>
              </Camera>
            )
        }
        
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    camera: {
      flex: 0.8,
      justifyContent: 'center',
      width:'100%'
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
      alignItems: 'center'
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    titleContainer:{
        flexDirection: 'row'
    },
    titleImageContainer:{
        flex: 0.4,
        resizeMode: 'stretch',
        height:50,
        width:50
    },
    titleTextContainer:{
        flex:1
    },
    titleText:{
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 35
    },
    iconImage: { 
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    imageSelected:{
      width: '90%',
      borderRadius: 30,
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 30
    },
    twoColums:{
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    buttons:{
      borderRadius: 15,
      borderWidth: 2,
      width:'45%',
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: 'center',
    },
    textButtons:{
      fontSize:RFValue(15),
      alignSelf: 'center',
    },

    inputs:{
      width: '95%', 
      alignSelf: 'center',
      marginTop: 20
    }
    
  });
  