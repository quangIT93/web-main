import React from 'react';

const theme1 = () => {
  return (
    <div id="pdf-container">
      {/* <h2>CV Preview</h2> */}
      {/* {imageURL && <img src={imageURL} alt="Profile" width="50" height="50" />} */}
      <div className="header-cv">
        <div className="header-cv_left">
          <h2>Tên ứng viên</h2>
          <p>Ngành nghề</p>
        </div>
        <div className="header-cv_right">
          <img src="./images/project-manager.png" alt="" />
        </div>
      </div>
      <div className="content-cv">
        <div className="content-cv_left">
          <div className="itemCV">
            <div className="wrap-titleCv">
              <h3>PROFILE</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              voluptatibus ex libero sit voluptatum consequatur sed ullam
              mollitia minima vel obcaecati dicta quae, asperiores laborum
              blanditiis illo quasi rem eligendi.
            </p>
          </div>
          <div className="itemCV">
            <div className="wrap-titleCv">
              <h3>PROFILE</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              voluptatibus ex libero sit voluptatum consequatur sed ullam
              mollitia minima vel obcaecati dicta quae, asperiores laborum
              blanditiis illo quasi rem eligendi.
            </p>
          </div>
          <div className="itemCV">
            <div className="wrap-titleCv">
              <h3>PROFILE</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              voluptatibus ex libero sit voluptatum consequatur sed ullam
              mollitia minima vel obcaecati dicta quae, asperiores laborum
              blanditiis illo quasi rem eligendi.
            </p>
          </div>
        </div>

        <div className="content-cv_right">
          <div className="wrap-titleCv">
            <h3>PROFILE</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            voluptatibus ex libero sit voluptatum consequatur sed ullam mollitia
            minima vel obcaecati dicta quae, asperiores laborum blanditiis illo
            quasi rem eligendi.
          </p>
        </div>
      </div>
      {/* {/* <p>Name: {name}</p> */}
    </div>
  );
};

export default theme1;
