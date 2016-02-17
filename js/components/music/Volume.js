import React from "react-native";

let { View, Text, TouchableHighlight} = React;

class Volume extends React.Component {
    constructor (props) {
        super(props);
        this.percentage = 100;
       
    }
    setTouch(e) {
        return true;
    }
    handleSetVolume(e) {
        e.stopPropagation();
        let { setVolume } = this.props;
        const eventPageY = e.nativeEvent.pageY;
        this.refs.volumeContainer.measure((ox, oy, width, height, px, py) => {
            const yPos = (height - (eventPageY-py));
            let value = Math.round(yPos * this.props.max/height);
            setVolume && setVolume(value);
  });
    }
    componentDidMount() {
    }
    render() {
        let { value, min, max, toogleVolumeBar, showVolumeBar } = this.props;
        if (value < min ) {
            value = min;
        }

        if (value > max) {
            value = max;
        }
        /*
        50 = 0.5
        100 = 1
        67 = x
         */
        this.percentage = (value) / max;
        /*
        1 = 160
        67 = x
         */
        let containerStyle = {
            "position": "absolute",
            "height": 160,
            "width": 30,
            "bottom": 25,
            "backgroundColor": "#667278"
        };
        let bar = {
            "position": "absolute",
            "backgroundColor": "#FC561E",
            "height": (160*value/max),
            "bottom": 0,    
            "marginLeft": 5,
            "marginRight": 5,
            "width": 20
        }

        return (
            <View>
                <TouchableHighlight style={{"height": 25, "width": 25}} onPress={toogleVolumeBar}>
                    <Text>vol</Text>
                </TouchableHighlight>
                {(showVolumeBar)?
                    (<View style={containerStyle}
                        ref="volumeContainer"
                        onStartShouldSetResponder={this.setTouch}
                        onMoveShouldSetResponder={this.setTouch}
                        onResponderRelease={(evt) => this.handleSetVolume(evt)}>
                        <View style={bar}></View>
                </View>):null}
            </View>
        );
    }
}


Volume.defaultProps = {
    value: 0,
    min:0,
    max: 100
};

export default Volume;