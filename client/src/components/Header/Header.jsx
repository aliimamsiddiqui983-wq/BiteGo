import React, { useEffect, useState } from "react";
import "./Header.css";
import { assets, menu_list } from "../../assets/assets";

const Header = () => {
  const [currentImage, setCurrentImage] = useState(assets.header_img);

  useEffect(() => {
    const images = [assets.header_img, assets.imageburger, assets.imagepizza];

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${currentImage})`,
      }}
    >
      <div className="header-contents">
        <h2>Order your favourite food here</h2>

        <p>
          Discover delicious meals from your favorite categories, freshly
          prepared and delivered straight to your doorstep. Order your favorite
          food and enjoy every bite!
        </p>

        <button
          onClick={() => {
            document.getElementById("explore-menu")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
