import React from "react";

export function Advertisement() {
  return (
    <div className="ads_restaurant_frame">
      <video
        className={"ads_video"}
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://www.dropbox.com/scl/fi/dzf6ms38wczwa8dvb1715/Corvette-CINEMATIC-Car-Commercial-I-Blender.mp4?rlkey=g156cyi4d2rf93ddbxgnpozoh&st=d9x7c87u&raw=1"
          type="video/mp4"
        />
      </video>
    </div>
  );
}