import React from "react-native";
let {Text, View, Image, StyleSheet, TouchableOpacity} = React;

import {TOP_BAR_HEIGHT, palette} from "../Constants";

const styles = StyleSheet.create({
	container: {
		height: TOP_BAR_HEIGHT,
		backgroundColor: palette.PRIMARY_COLOR,
		justifyContent: "center"
	},
	menuButton: {
		marginLeft: 10,
		height: 20,
		width: 25
	}
});

class TopMenu extends React.Component {
	render() {
		return (
			<TouchableOpacity
				style={styles.container}
		        onPress={this.props.openMenu}>
		        <Image style={styles.menuButton} source={require("image!ic_action")} />
		    </TouchableOpacity>
		);
	}
}

export default TopMenu;