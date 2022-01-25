import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  linearGradient: {
    height: "25%",
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    marginTop: -100,
   
  },
  name: {
    alignItems: "center",
    marginTop: 50,
  },
  card: {
    margin: 10,
  },
  
  text: { fontSize: 25, marginTop: 10, marginLeft: 30, marginRight:30 , alignItems: "center",},
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
});

export const theme = { colors: { primary: "#3D19F7" } };
