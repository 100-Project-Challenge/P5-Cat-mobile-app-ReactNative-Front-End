import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
    },
    h1: {
        color: '#501da5cc',
        fontSize: 40,
    },
    h2: {
        color: '#FAE042',
        fontSize: 25,
        marginTop: 8,
    },
    image: {
        width: 320,
        height: 350,
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#501da5cc',
        borderRadius: 5,
        padding: 8,
        margin: 8,
    },
    topContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bottomContainer: {
        justifyContent: 'flex-end',
        width: '90%',
        margin: 20,
        padding: 10,
    },
});