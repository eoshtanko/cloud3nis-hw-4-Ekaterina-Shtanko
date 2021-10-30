import { Button } from "@ui-kitten/components"
import React, { useState, useEffect } from 'react';
import { hse_image } from "../assets/hse_image";
import * as ImagePicker from 'expo-image-picker';
import { createNote } from "../modules/notes/actions"
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, View, TouchableOpacity, Image } from "react-native"
import { loadNotes } from "../modules/notes/actions"
import { selectNotes, selectIsLoaded } from "../modules/notes/selectors"
import { useDispatch, useSelector } from "react-redux"

const initNote = "Должен признаться вам, не тая: \n я очень со зверем дружен.\n Но что касается кошек, \n то я\n всегда к ним был равнодушен.\n Так я и жил бы на свете,\n но вот,\n откуда — не знаем сами,\n у нас появился рыжайший кот,\n маленький, но — с усами.\n Этакий крохотный дуралей\n с повадками пса-задиры,\n некоронованный Царь Зверей\n в масштабах нашей квартиры.\n И я подружился с этим котом\n за то, что сколько угодно\n он слушал молча меня,\n и притом — \n слушал весьма охотно.";
const initTitle = "Новая заметка:"

export default function CreateNote() {
	const [note, setNote] = useState(initNote)
	const [title, setTitle] = useState(initTitle)
	const [image, setImage] = useState(hse_image);
	const notes = useSelector(selectNotes);
	const isLoaded = useSelector(selectIsLoaded);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isLoaded) {
			dispatch(loadNotes());
		}
	}, []);

	const saveNote = () => {
		if (title.trim() !== "") {
			let length = notes[0]?.id ? notes[notes.length - 1].id + 1 : notes.length;
			let new_note = {
				id: length,
				title: title.trim(),
				content: note.trim(),
				image: image
			};
			dispatch(createNote(new_note));
			setNote("")
			setImage(hse_image)
			setTitle("Название")
		}
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				category="h1"
				value={title}
				maxLength={18}
				style={{ color: "black", fontSize: 34, fontWeight: "bold" }}
				onChangeText={setTitle}
			/>
			<TouchableOpacity onPress={pickImage} underlayColor="gray">
				<Image style={{ height: 200, width: 200, left: Dimensions.get("window").width / 5, marginTop: 20, marginBottom: 20 }}
					source={{ uri: image }} />
			</TouchableOpacity>
			<TextInput
				value={note}
				maxHeight={Dimensions.get('window').height / 2.4}
				onChangeText={setNote}
				style={{ color: "black", fontSize: 22 }}
				multiline={true}
				autoFocus={true}
				selectionColor="blue"
			/>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
				<Button style={StyleSheet.button} appearance="filled" onPress={saveNote}>
					Create Note
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
		marginBottom: 36
	},
	button: {
		marginBottom: 30
	}
})
