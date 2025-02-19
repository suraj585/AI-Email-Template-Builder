import React from "react";

function LogoHeaderComponent({ imageUrl, alt, style }) {
  return (
    <div style={style.outerStyle}>
      <img
        src={imageUrl}
        alt={alt}
        style={{
          width: style.width,
          height: style.height,
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default LogoHeaderComponent;
