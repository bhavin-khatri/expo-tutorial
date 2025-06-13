import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FontFamily from "../../ui/FontFamily";
import ResponsivePixels from "@/ui/ResponsivePixels";
import {useTheme} from "../../ui/context/ThemeContext";
import {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {CustomImagePlaceholder} from "../../components/atom/ImagePlaceHolder/CustomImagePlaceholderImage";
import {IMAGES} from "../../ui/Image";
import {useCustomNavigationHelpers} from "../../navigation/Navigator";

const User = () => {
  const { colors } = useTheme();
  const screenStyles = createStyles(colors);
    const { goBack } = useCustomNavigationHelpers();
  const {user}= useLocalSearchParams<any>()
  const [selectedTab,setSelectedTab] = useState<string>("Profile")
  const [userDetails,setUserDetails] = useState<any>({})
    const [showLoading,setShowLoading] = useState<boolean>(false)
  useEffect(()=>{
      async function getUserDetails(){
          setShowLoading(true)
          const parsedUser = JSON.parse(user);
          setUserDetails(parsedUser)
      }
      getUserDetails().finally(()=>setShowLoading(false))
  },[])


    const handleTabClick=(tabClicked)=>{
      setSelectedTab(tabClicked)
    }

    const renderProfileView=()=>{
        const { personalDetails = {} } = userDetails || {};
        const {
            city = "",
            state = "",
            country = "",
            address = {},
            postalCode = "",
        } = personalDetails?.address || {};
        return(
          <View>
              <View style={screenStyles.rowView}>
                  <Text style={screenStyles.labelTitle}>Name:</Text>
                  <Text style={screenStyles.valueText}>{personalDetails?.name}</Text>
              </View>
              <View style={screenStyles.rowView}>
                  <Text style={screenStyles.labelTitle}>DOB:</Text>
                  <Text style={screenStyles.valueText}>{personalDetails?.birthDate}</Text>
              </View>
              <View style={screenStyles.rowView}>
                  <Text style={screenStyles.labelTitle}>Address:</Text>
                  <Text style={screenStyles.valueText}>{`${address}, ${city}, ${state}, ${country} - ${postalCode}`}</Text>
              </View>
          </View>
      )
    }

    const renderContactView=()=>{
        const { contactDetails = {} } = userDetails || {};
        return(
            <View>
                <View style={screenStyles.rowView}>
                    <Text style={screenStyles.labelTitle}>Phone:</Text>
                    <Text style={screenStyles.valueText}>{contactDetails?.phone}</Text>
                </View>
                <View style={screenStyles.rowView}>
                    <Text style={screenStyles.labelTitle}>Email:</Text>
                    <Text style={screenStyles.valueText}>{contactDetails?.email}</Text>
                </View>
            </View>
        )
    }

  return (
    <SafeAreaView style={[screenStyles.container]}>
        <View style={[screenStyles.headerView]}>
            <TouchableOpacity onPress={goBack} >
                <CustomImagePlaceholder isLocalImage={true} style={screenStyles.backImage} imageUrl={IMAGES.LOCAL_IMAGES.ic_back}/>
            </TouchableOpacity>
            <Text style={screenStyles.headline}>User Details</Text>
        </View>

        <View style={screenStyles.tabView}>
            <TouchableOpacity onPress={()=>handleTabClick('Profile')} style={[screenStyles.innerTabView,{backgroundColor: selectedTab === "Profile" ? colors.primary : colors.background}]}>
                <Text style={[screenStyles.tabTitle,{color: selectedTab === "Profile" ? colors.white : colors.black65}]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>handleTabClick('Contact')}
                style={[screenStyles.innerTabView,{backgroundColor: selectedTab === "Contact" ? colors.primary : colors.background}]}
                >
                <Text style={[screenStyles.tabTitle,{color: selectedTab === "Contact" ? colors.white : colors.black65}]}>Contact</Text>
            </TouchableOpacity>
        </View>
        {selectedTab === "Profile" ?
            renderProfileView() :
            renderContactView()
        }
    </SafeAreaView>
  );
};
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: ResponsivePixels.responsiveWidth(20),
      paddingVertical: ResponsivePixels.responsiveHeight(20),
    },
    tabView:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        height:ResponsivePixels.responsiveHeight(40),
        width:"100%",
        backgroundColor:colors.background,
        elevation:2,
        alignSelf:"center",
        marginVertical:ResponsivePixels.responsiveWidth(20),
        borderRadius:ResponsivePixels.responsiveWidth(8),
    },
      headline: {
          fontFamily: FontFamily.TEXT_SEMI_BOLD,
          color: colors.text,
          fontSize: ResponsivePixels.fontSize(20),
      },
    innerTabView:{
        flex:1,
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:ResponsivePixels.responsiveWidth(8),
    },
      tabTitle:{
        fontFamily:FontFamily.TEXT_MEDIUM,
         fontSize:ResponsivePixels.fontSize(18),
         color:colors.black65
      },
      rowView:{
        display:'flex',
          alignItems:'flex-start',
          justifyContent:'flex-end',
          flexDirection:'row',
          marginTop:ResponsivePixels.responsiveHeight(10)
      },
      labelTitle:{
          fontFamily:FontFamily.TEXT_MEDIUM,
          fontSize:ResponsivePixels.fontSize(18),
          color:colors.text
      },
      valueText:{
          fontFamily:FontFamily.TEXT_REGULAR,
          fontSize:ResponsivePixels.fontSize(16),
          color:colors.black65,
          flex:1,
          marginStart:ResponsivePixels.responsiveWidth(5)
      },
      backImage:{
        height:ResponsivePixels.responsiveHeight(18),
        width:ResponsivePixels.responsiveWidth(18),
        marginEnd:ResponsivePixels.responsiveWidth(5)
      },
      headerView:{
        flexDirection:'row',
          alignItems:'center',
          justifyContent:'flex-start',

      }
  });

export default User;
