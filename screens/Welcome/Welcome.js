import React from "react";
import {
    Text,
    View,
    Image,
    Button,
} from "react-native";
import Logo from "../../assets/cat3.jpg";
import { styles } from "./style";

export default function Welcome(props) {

    return (
        <View style={styles.container}>

            <View style={styles.topContainer}>
                <Text style={styles.h1}>TRACK YOUR CATS</Text>
                <Text style={styles.h2}>step by step</Text>
            </View>
            <View style={styles.middleContainer}>
                <Image source={Logo} style={styles.image} />
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Add New Cat"
                        style={styles.button}
                        onPress={() => props.navigation.navigate('NewCat')}
                        color="#501da5cc"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Browse All Cats"
                        style={styles.button}
                        onPress={() => props.navigation.navigate('CatsList')}
                        color="#501da5cc"
                    />
                </View>
            </View>

        </View>
    );

}


