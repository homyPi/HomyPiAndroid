import React from "react-native";
let {Text, View, Image, StyleSheet, TouchableOpacity} = React;

const styles = StyleSheet.create({
	container: {
		height: 40,
		backgroundColor: "#e9e9e9"
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
		        onPress={this.handlePress.bind(this)}>
		        <Image style={styles.menuButton} source={require('image!ic_action')} />
		    </TouchableOpacity>
		);
	}
	handlePress(e) {
		this.context.menuActions.toggle();
	}
}
TopMenu.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

export default TopMenu;