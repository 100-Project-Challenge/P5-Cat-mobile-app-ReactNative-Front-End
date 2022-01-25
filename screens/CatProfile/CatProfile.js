import React from "react";
import {
    Text,
    View,
    Image,
    Alert
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Title, Button } from "react-native-paper";
import { styles, theme } from "./style";


export default function CatProfile(props) {

    const { _id, name, breed, description, img, age } = props.navigation.state.params.item;
    // console.log("from catprofile", props.navigation.state.params.item);


    function deleteCat() {
        fetch("https://cats-app-abeer.herokuapp.com/delete", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: _id,
            }),
        })
            .then((res) => res.json())
            .then((deletedItem) => {
              
                Alert.alert(`${deletedItem.name} deleted`);
                props.navigation.navigate("CatsList");
            })
            .catch((err) => {
                Alert.alert(`error in deleting`, err);
            });
    }


    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#4004D4", "#BAB5F4"]}
                style={styles.linearGradient}
            />
            <View style={{ alignItems: "center" }}>
                <Image style={styles.image}
                    source={{ uri: img }}
                />
            </View>
            <View style={styles.name}>
                <Title style={{ fontSize: 60, marginTop: 5, padding: 35 }}>{name}</Title>
                <Text style={styles.text}>{description}</Text>
                <Text style={styles.text}>{breed}</Text>
                <Text style={styles.text}>{age}</Text>
            </View>

            <View style={styles.buttons}>
                <Button
                    icon="account-edit"
                    mode="contained"
                    onPress={() => {
                        props.navigation.navigate("NewCat",
                            {
                                _id,
                                name,
                                breed,
                                description,
                                img,
                                age,
                            }
                        );
                    }}
                    theme={theme}
                    style={{ padding: 8 }}
                >
                    Edit
                </Button>
                <Button
                    icon="delete-outline"
                    mode="contained"
                    onPress={() => deleteCat()}
                    theme={theme}
                    style={{ padding: 8 }}
                >
                    Delete
                </Button>
            </View>
        </View>
    )
}