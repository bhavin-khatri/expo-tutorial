import React from "react";
import {ActivityIndicator, Dimensions, StyleSheet, View} from "react-native";
import {useTheme} from "../../../ui/context/ThemeContext";

interface IProps{
    bgColor?:any,
}
const CustomLoader = (props:IProps) => {

    const { colors } = useTheme();
    const screenStyles = createStyles(colors);
    const {
        bgColor = colors.background
    }=props;
    return (
        <View style={[screenStyles.container,{
            backgroundColor: bgColor
        }]}>
            <ActivityIndicator
                style={screenStyles.indicatorStyle}
                size="large"
                color={colors.primary}
            />
        </View>
    );
};

const createStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get("window").height,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    indicatorStyle: {
        height: Dimensions.get("window").width * 0.2,
        width: Dimensions.get("window").width * 0.2,
    },
});
export default CustomLoader;
