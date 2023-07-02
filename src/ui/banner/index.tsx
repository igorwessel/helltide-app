import { Image } from "expo-image";

function Banner() {
  return (
    <Image
      source={require("@assets/helltide_rises.png")}
      style={{ width: 240, height: 240 }}
    />
  );
}

export default Banner;
