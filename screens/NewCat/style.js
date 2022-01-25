import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  input: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  modalButtons: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-around",
  },
  modal: {
    position: "absolute",
    bottom: 20,
    width: "100%",

    backgroundColor: "rgba(0, 0, 255, 0.15)",
  },
  
});

export const theme = { colors: { primary: "#3D19F7" } };
