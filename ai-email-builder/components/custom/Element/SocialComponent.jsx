import React from "react";

function SocialComponent({ socialIcons, style }) {
  return (
    <div style={style.outerStyle}>
      {socialIcons.map((icon, index) => (
        <a
          key={index}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={icon.icon}
            alt={`social-icon-${index}`}
            style={{ width: style.width, height: style.height }}
          />
        </a>
      ))}
    </div>
  );
}

export default SocialComponent;
