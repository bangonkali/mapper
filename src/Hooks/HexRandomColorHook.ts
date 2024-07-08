const HexRandomColorHook = () => {
  const generateRandomHexColor = () => {
    const hexValues = "0123456789ABCDEF";
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
      newColor += hexValues[Math.floor(Math.random() * 16)];
    }
    return newColor;
  };
  const generateOutlineHexColor = () => {
    const hexValues = "0123456789ABCDEF";
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
      newColor += hexValues[Math.floor(Math.random() * 32)];
    }
    return newColor;
  };
  return [generateOutlineHexColor, generateRandomHexColor];
};

export default HexRandomColorHook;
