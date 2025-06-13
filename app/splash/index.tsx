import { StyleSheet, View } from "react-native";
import { useCustomNavigationHelpers } from "../../navigation/Navigator";
import { useEffect } from "react";
import { CustomImagePlaceholder } from "../../components/atom/ImagePlaceHolder/CustomImagePlaceholderImage";
import { IMAGES } from "../../ui/Image";
import ResponsivePixels from "../../ui/ResponsivePixels";
import { useTheme } from "../../ui/context/ThemeContext";
import { navigationConstants } from "../../constants/NavigationConstants";

const Splash = () => {
  const { push } = useCustomNavigationHelpers();
  const { colors } = useTheme();
  const screenStyles = createStyles(colors);
  useEffect(() => {
    navigateToAnotherScreen();
  }, []);

  const navigateToAnotherScreen = async () => {
    setTimeout(() => {
      push(navigationConstants.DASHBOARD);
    }, 2000);
  };

  return (
    <View style={[screenStyles.mainContainer]}>
      <CustomImagePlaceholder
        imageUrl={IMAGES.LOCAL_IMAGES.ic_app_icon}
        isLocalImage={true}
        isTypePNG={true}
        style={screenStyles.appLogo}
      />
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    appLogo: {
      height: ResponsivePixels.responsiveHeight(200),
      width: ResponsivePixels.responsiveHeight(180),
    },
  });

export default Splash;
