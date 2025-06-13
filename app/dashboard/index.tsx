import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FontFamily from "../../ui/FontFamily";
import ResponsivePixels from "@/ui/ResponsivePixels";
import {useTheme} from "../../ui/context/ThemeContext";
import {useEffect, useState} from "react";
import {CommonApiService} from "../../api/apiService";
import {Logger} from "../../components/atom/Logger/Logger";
import {CustomImagePlaceholder} from "../../components/atom/ImagePlaceHolder/CustomImagePlaceholderImage";
import {IMAGES} from "../../ui/Image";
import CustomLoader from "../../components/atom/Loader/CustomLoader";
import {useCustomNavigationHelpers} from "../../navigation/Navigator";
import {navigationConstants} from "../../constants/NavigationConstants";

const Dashboard = () => {
  const { colors } = useTheme();
  const { push } = useCustomNavigationHelpers();
  const screenStyles = createStyles(colors);
  const [userList,setUserList] = useState<Array<any>>([])
  const [showLoading,setShowLoading] = useState<boolean>(false)

  useEffect(()=>{
      fetchAllUsers()
  },[])


    const fetchAllUsers=()=>{
        getUsers().finally(()=>setShowLoading(false))
    }
    async function getUsers(){
        setShowLoading(true)
        let result :any  = await CommonApiService({
            apiURL:'https://dummyjson.com/users'
        })
        if(result && result?.users && result?.users?.length  > 0){
            setUserList(result.users)
        }
    }

    const getGenderImage=(item)=>{
      return item.gender.toLocaleString() === "male" ? IMAGES.LOCAL_IMAGES.ic_male : IMAGES.LOCAL_IMAGES.ic_female
    }

    const navigateToUserDetails=(item:any)=>{
        const contactDetails ={
            phone : item.phone,
            email:item.email,
        }
        const personalDetails={
            name: `${item.firstName} ${item.lastName}`,
            birthDate:item.birthDate,
            address:item.address,
        }
        push(navigationConstants.USER,{
            user:{
                personalDetails,contactDetails
            }
        })
    }

    const renderUsers=({item}: { item:any })=>{
      Logger("userItem ==== > ",item)
      return(
          <TouchableOpacity onPress={()=>navigateToUserDetails(item)} style={screenStyles.userItem}>
              <View style={screenStyles.rowView}>
                  <View style={[screenStyles.rowView,{
                      justifyContent:'flex-start'
                  }]}>
                      <View style={screenStyles.userImageBg}>
                          <CustomImagePlaceholder style={screenStyles.userImage} isTypePNG={true} imageUrl={item.image}/>
                      </View>
                        <View style={screenStyles.userNameView}>
                            <Text style={screenStyles.userTitle}>{`${item.firstName} ${item.lastName}`}</Text>
                            <View style={[screenStyles.rowView,{
                                justifyContent:'flex-start'
                            }]}>
                                <Text style={screenStyles.userSubTitle}>{`${item.role}`}</Text>
                            <CustomImagePlaceholder style={screenStyles.genderImage} isTypePNG={true} isLocalImage={true} imageUrl={getGenderImage(item)}/>
                            </View>
                        </View>

                  </View>

              </View>
          </TouchableOpacity>
      )
    }

  return (
    <SafeAreaView style={[screenStyles.container]}>
        <View style={[screenStyles.rowView,{
            justifyContent:'flex-start',

        }]}>
            <Text style={screenStyles.headline}>Users</Text>
            <TouchableOpacity onPress={()=>fetchAllUsers()}>
            <CustomImagePlaceholder style={[screenStyles.refreshImage,{
                transform: [{ rotate: '90deg' }],
            }]} imageUrl={IMAGES.LOCAL_IMAGES.ic_refresh} isLocalImage={true}/>
            </TouchableOpacity>
        </View>

        {showLoading ?
            <CustomLoader/>
            :
            userList.length > 0 ?
                <FlatList data={userList} renderItem={renderUsers}/>
                :
                null

        }

    </SafeAreaView>
  );
}
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.background,
      paddingHorizontal: ResponsivePixels.responsiveWidth(20),
      paddingVertical: ResponsivePixels.responsiveHeight(20),
    },
    headline: {
      fontFamily: FontFamily.TEXT_SEMI_BOLD,
      color: colors.text,
      fontSize: ResponsivePixels.fontSize(20),
    },
    appLogo: {
      height: ResponsivePixels.responsiveHeight(200),
      width: ResponsivePixels.responsiveHeight(180),
    },
    userItem:{
        display:'flex',
        flexDirection:'column',
        marginTop:ResponsivePixels.responsiveHeight(20),
        borderWidth:1,
        borderRadius:ResponsivePixels.responsiveWidth(8),
        paddingHorizontal:ResponsivePixels.responsiveWidth(10),
        paddingVertical:ResponsivePixels.responsiveWidth(10),
        borderColor:colors.inputBorder,
        elevation:1,
        backgroundColor:colors.background
    },
      rowView:{
        display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:"center"
      },
      userImage:{
          height: ResponsivePixels.responsiveHeight(25),
          width: ResponsivePixels.responsiveHeight(25),
      },
      userImageBg:{
          height: ResponsivePixels.responsiveHeight(40),
          width: ResponsivePixels.responsiveHeight(40),
          borderWidth:1,
          borderColor:colors.inputBorder,
          borderRadius:ResponsivePixels.responsiveHeight(20),
          justifyContent:'center',
          alignItems:'center'
      },
      userNameView:{
        marginHorizontal:ResponsivePixels.responsiveWidth(10)
      },
      userTitle:{
          fontFamily: FontFamily.TEXT_REGULAR,
          color: colors.text,
          fontSize: ResponsivePixels.fontSize(16),
      },
      userSubTitle:{
          fontFamily: FontFamily.TEXT_REGULAR,
          color: colors.black65,
          fontSize: ResponsivePixels.fontSize(12),
      },
      genderImage:{
        width:ResponsivePixels.responsiveWidth(12),
          height:ResponsivePixels.responsiveHeight(12),
          marginStart:ResponsivePixels.responsiveWidth(2),
      },
      refreshImage:{
          width:ResponsivePixels.responsiveWidth(18),
          height:ResponsivePixels.responsiveHeight(18),
          marginHorizontal:ResponsivePixels.responsiveWidth(5)
      }
  });

export default Dashboard;
