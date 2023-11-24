import Colors from "enums/Colors";

class ColorUtils {
  public static getColorTitle(color: Colors): string {
    const colorMap = {
      [Colors.GREEN]: "#11E4AF",
      [Colors.PINK]: "#EC70FF",
      [Colors.PURPLE]: "#7C64F7",
      [Colors.YELLOW]: "#FFAD0A",
    }

    return colorMap[color as keyof typeof colorMap];
  }
  public static getColorBackground(color: Colors): string {
    const colorMap = {
      [Colors.GREEN]: '#C9FFF2',
      [Colors.PINK]: '#FAD9FF',
      [Colors.PURPLE]: '#CFC6FC',
      [Colors.YELLOW]: '#FFEDC9',
    }

    return colorMap[color as keyof typeof colorMap];
  }
}

export default ColorUtils;