import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <>
      <div id="explore-menu" className="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          Explore a variety of delicious dishes, freshly prepared to satisfy
          every craving.
        </p>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            return (
              <div
                className="explore-menu-list-item"
                onClick={() => {
                  setCategory(item.menu_name);

                  setTimeout(() => {
                    document.getElementById("food-display")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
                key={index}
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt=""
                />
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
};

export default ExploreMenu;
