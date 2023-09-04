import React,{Component} from "react";
import { View, Text, StyleSheet, Image, Platform, StatusBar,SafeAreaView, FlatList, Button } from "react-native";

import CardPost from "./CardPost";

//Necesito una página de creditos
//<a href="https://www.flaticon.es/iconos-gratis/electronica" title="electrónica iconos">Electrónica iconos creados por Muhammad Ali - Flaticon</a>

const posts = require("./temp_posts.json");

export default class Feed extends Component{
    constructor(props){
        super(props);
    }
    keyExtractor = (item, index) => index.toString();

    renderizado = ({item:post}) => {
        return(
            <CardPost post={post} navigation={this.props.navigation}/>
        );
    }

    render(){
        return(
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
                <View styles={styles.postContainer}>
                    <FlatList
                        data={posts}
                        renderItem={this.renderizado}
                        keyExtractor={this.keyExtractor}
                        horizontal={true}
                    />
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#F9F4FC"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    titleContainer:{
        flex: 0.3,
        flexDirection: 'row'
    },
    titleImageContainer:{
        flex: 0.4,
        resizeMode: 'stretch',
        height:50,
        width:50
    },
    titleTextContainer:{
        flex:0.8
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
    postContainer:{
        flex:1
    }
})

