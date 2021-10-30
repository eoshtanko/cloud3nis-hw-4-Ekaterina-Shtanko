import { useNavigation } from "@react-navigation/native"
import { Divider, List, ListItem, Text } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { loadNotes } from "../modules/notes/actions"
import React, { useEffect } from 'react';
import { selectNotes, selectIsLoaded } from "../modules/notes/selectors"

export default function AllNotes() {
	const navigation = useNavigation()
	const notes = useSelector(selectNotes);
	const isLoaded = useSelector(selectIsLoaded);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isLoaded) {
			dispatch(loadNotes());
		}
	}, [notes, dispatch]);

	const renderItem = ({ item }) => (
		<ListItem
			title={<Text category="h2">{item.title}</Text>}
			onPress={() =>
				navigation.navigate("Note", {
					note: notes.find(e => e.id === item.id)
				})}
		/>
	)

	return (
		<View style={{ backgroundColor: "skyblue", flex: 1 }}>
			<Text style={styles.title} category="h1">
				Notes
			</Text>
			<List
				style={styles.container}
				data={notes}
				ItemSeparatorComponent={Divider}
				endFillColor='skyblue'
				renderItem={renderItem}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		fontSize: 30
	},
	item: {
		marginVertical: 4,
		fontSize: 30
	},
	title: {
		textAlign: "center",
		marginTop: 50
	},
	notes: {
		fontSize: 30
	}
})
