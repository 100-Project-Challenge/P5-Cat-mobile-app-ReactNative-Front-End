import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    FlatList,

} from "react-native";
import { Card, FAB, IconButton,Colors  } from "react-native-paper";
import { styles } from "./style";


export default function CatsList(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    function fetchData() {
        fetch("https://cats-app-abeer.herokuapp.com/")
            .then((res) => res.json())
            .then((newData) => {
                setData(newData);
                setLoading(false);

            })
            .catch((err) => {
                Alert.alert(`error in home fetching`, err);
            });
    }

    useEffect(() => {

        fetchData()

    }, []);




    return (

        <View style={styles.root}>


            <FlatList
                data={data}
                onRefresh={() => fetchData()}
                refreshing={loading}
                keyExtractor={(item) => item._id}
                renderItem={(item) => {
                    // console.log("from flaaaaaatlist", item.item);
                    return (
                        <Card
                            style={styles.myCard}
                            key={item.item._id}
                            onPress={() =>
                                props.navigation.navigate("CatProfile",
                                    { item: item.item }
                                )
                            }
                        >
                            <View style={styles.cardView}>
                                <Image
                                    style={{ width: 60, height: 60, borderRadius: 30 }}
                                    source={{ uri: item.item.img }}
                                />
                                <View style={styles.textView}>
                                    <Text style={styles.text}>{item.item.name}</Text>

                                    <Text>{item.item.description}</Text>
                                    <Text>{item.item.age}</Text>

                                </View>
                            </View>
                        </Card>
                    );
                }}
            />
            <FAB
                onPress={() => props.navigation.navigate("NewCat")}
                style={styles.fab}
                small={false}
                theme={{ colors: { accent: "#501da5cc" } }}
                icon="plus"
            />
            <IconButton
                icon="home"
                style={styles.icn}
                color={Colors.purple700}
                size={50}
                onPress={() => props.navigation.navigate("Welcome")}
            />
        </View>
    )

}