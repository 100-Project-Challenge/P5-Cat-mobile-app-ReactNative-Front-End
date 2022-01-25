import React, { useState, useEffect } from "react";
import {
  View,
  Modal, Alert
} from "react-native";

import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { styles, theme } from "./style";

export default function NewCat(props) {

  // console.log("from new cat", props.navigation.state.params);

  function getDetails(type) {
    if (props.navigation.state.params) {
      const { name, breed, description, img, age } = props.navigation.state.params;
      switch (type) {
        case "name":
          return name;
        case "breed":
          return breed;
        case "description":
          return description;
        case "img":
          return img;
        case "age":
          return age;
      }
    }
    return "";
  }


  const [name, setName] = useState(getDetails('name'))
  const [breed, setBreed] = useState(getDetails('breed'))
  const [description, setDescription] = useState(getDetails('description'))
  const [age, setAge] = useState(getDetails('age'))
  const [img, setImg] = useState(getDetails('img'))
  const [modal, setModal] = useState(false)


  const AddNewCat = async () => {
    await fetch("https://cats-app-abeer.herokuapp.com/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        breed,
        description,
        age,
        img,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        Alert.alert(`${data.name} is saved successfully`);
        props.navigation.navigate("CatsList");
      })
      .catch((err) => {
        Alert.alert(` error in posting cat ${err}`);
      });
  };



  const updateCat = async () => {
    await fetch("https://cats-app-abeer.herokuapp.com/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.navigation.state.params._id,
        name,
        breed,
        description,
        age,
        img,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('newdata',data)
        Alert.alert(`${data.name} is updated `);
        props.navigation.navigate("CatsList");
      })
      .catch((err) => {
        Alert.alert(`error in updating ${err}`);
      });
  };

  ///////////// pic image from gallary and from camera and upload it to cloudinary
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let newResult = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`,
      };
      upload(newResult);
      // setImg(result.uri);
    }
  };


  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      let newResult = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`,
      };
      upload(newResult);
      // setImg(result.uri);
    }
  };

  const upload = (img) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "catsApp");
    data.append("cloud_name", "abeer");

    fetch("https://api.cloudinary.com/v1_1/abeer/image/upload",
      {
        method: "post",
        body: data,
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setImg(data.url);
        setModal(false);
      })
  };
  ////////////////////////////////


  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        label="Name"
        value={name}
        mode="outlined"
        theme={theme}
        onChangeText={(name) => setName(name)}
      />

      <TextInput
        style={styles.input}
        label="Breed"
        value={breed}
        mode="outlined"
        theme={theme}
        onChangeText={(breed) => setBreed(breed)}
      />
      <TextInput
        style={styles.input}
        label="Description"
        value={description}
        mode="outlined"
        theme={theme}
        onChangeText={(description) => setDescription(description)}
      />
      <TextInput
        style={styles.input}
        label="Age"
        value={age}
        mode="outlined"
        theme={theme}
        onChangeText={(age) => setAge(age)}
      />
      <Button
        style={styles.input}
        icon={img === "" ? "upload" : "check"}
        mode="contained"
        onPress={() => setModal(true)}
      >
        Upload Image
      </Button>
      {props.navigation.state.params ? (
        <Button
          style={styles.input}
          mode="contained"
          icon="content-save-outline"
          onPress={() => {
            updateCat();
          }}
        >
          UPDATE
        </Button>
      ) : (
        <Button
          style={styles.input}
          mode="contained"
          icon="content-save-outline"
          onPress={() => {
            AddNewCat();
          }}
        >
          Save
        </Button>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalButtons}>
            <Button icon="camera" mode="contained"
              onPress={pickImageCamera}
            >
              Camera
            </Button>

            <Button icon="image" mode="contained"
              onPress={pickImageGallery}
            >
              Glary
            </Button>
          </View>
          <Button onPress={() => setModal(false)}>Cancel</Button>
        </View>
      </Modal>
    </View>
  )
}


