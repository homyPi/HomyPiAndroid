import React from "react-native";
let {Text, View, Image, StyleSheet, TouchableOpacity} = React;

const styles = StyleSheet.create({
	container: {
		height: 40,
		backgroundColor: "#4285f4"
	},
	menuButton: {
		marginTop: 5,
		marginLeft: 5,
		height: 30,
		width: 25
	}
});

class TopMenu extends React.Component {
	render() {
		return (
			<TouchableOpacity
				style={styles.container}
		        onPress={this.props.openMenu}>
		        <Image style={styles.menuButton} source={require('image!ic_action')} />
		    </TouchableOpacity>
		);
	}
}

export default TopMenu;