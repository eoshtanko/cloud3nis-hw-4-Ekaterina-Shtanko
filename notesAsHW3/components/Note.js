import { Button } from "@ui-kitten/components"
import React, { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { updateNote, deleteNote } from '../modules/notes/actions';
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, View, TouchableOpacity, Image } from "react-native"
import { useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native"

export default function Note({ route }) {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	/*
	 Я пыталась делать иначе: передавать в route.params не note, а id,  
	 здесь же доставать нужный note из state. Результат был тот же. 
	*/
	const note = route.params.note

	const [title, setTitle] = useState(note.title);
	const updateTitle = (value) => {
		setTitle(value);
		if (value.trim() != "") {
			let object = {
				id: note.id,
				title: value,
			};
			dispatch(updateNote(object));
		}
	};

	const [content, setContent] = useState(note.content);
	const updateContent = value => {
		setContent(value);
		let object = {
			id: note.id,
			content: value,
		};
		dispatch(updateNote(object));
	};

	const [image, setImage] = useState(note.image);
	const updateImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setImage(result.uri);
			if (image) {
				let object = {
					id: note.id,
					image: result.uri,
				};
				dispatch(updateNote(object));
			}
		}
	};

	const delNote = () => {
		let object = {
			id: note.id,
		};
		dispatch(deleteNote(object));
		navigation.navigate("AllNotes")
	}

	return (
		<View style={styles.container}>
			<TextInput
				category="h1"
				value={title}
				maxLength={18}
				style={{ color: "black", fontSize: 34, fontWeight: "bold" }}
				onChangeText={v => updateTitle(v)}
			/>
			<TouchableOpacity onPress={updateImage} underlayColor="gray">
				<Image style={{ height: 200, width: 200, left: Dimensions.get("window").width / 5, marginTop: 20, marginBottom: 20 }}
					source={{ uri: image }} />
			</TouchableOpacity>
			<TextInput
				value={content}
				onChangeText={v => updateContent(v)}
				maxHeight={Dimensions.get('window').height / 2.2}
				style={{ color: "black", fontSize: 22 }}
				multiline={true}
				selectionColor="blue"
			/>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
				<Button style={StyleSheet.button} appearance="ghost" size="giant" onPress={delNote}>
					Delete
				</Button>
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "skyblue",
		color: "black",
		textDecorationColor: "black",
		padding: 30,
		paddingTop: 80,

		width: Dimensions.get("window").width
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
	},
	button: {
		marginBottom: 0
	}
})
