import * as eva from "@eva-design/eva"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import createSagaMiddleware from "@redux-saga/core"
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import React from "react"
import AllNotes from "./components/AllNotes"
import CreateNote from "./components/CreateNote"
import Note from "./components/Note"
import {createStore, applyMiddleware} from "redux"
import rootReducer from "./modules/reduser"
import rootSaga from "./modules/sagas"
import { Provider } from "react-redux"

const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }) => (
	<BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
		<BottomNavigationTab title="Create" />
		<BottomNavigationTab title="All Notes" />
	</BottomNavigation>
)

const TabNavigator = () => (
	<Navigator tabBar={(props) => <BottomTabBar {...props} />}>
		<Screen name="Create" component={CreateNote} />
		<Screen name="AllNotes" component={AllNotes} />
		<Screen name="Note" component={Note} />
	</Navigator>
)

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
	rootReducer, 
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// Перед работой запустить: json-server --watch db.json
export default function App() {
	return (
		<Provider store = {store}>
		<ApplicationProvider {...eva} theme={eva.light}>
			<NavigationContainer>
				<TabNavigator />
			</NavigationContainer>
		</ApplicationProvider>
		</Provider>
	)
}
