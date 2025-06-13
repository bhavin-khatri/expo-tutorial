import React from "react";
import { SvgUri } from "react-native-svg";
import { Image } from "react-native";
import { Logger } from "../Logger/Logger";

interface IProps {
  isLocalImage?: boolean;
  isTypePNG?: boolean;
  style: any;
  imageUrl: any;
}
export const CustomImagePlaceholder = (props: IProps) => {
  const { isLocalImage, isTypePNG, style, imageUrl } = props;
  const width = style && style.width ? style.width : 30;
  const height = style && style.width ? style.width : 30;
  return (
    <>
      {isLocalImage ? (
        <Image source={imageUrl} style={style} />
      ) : isTypePNG ? (
        <Image source={{ uri: imageUrl }} style={style} />
      ) : (
        <SvgUri width={width} height={height} uri={imageUrl} style={style} />
      )}
    </>
  );
};
