export const htmlCv = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <!-- A4 Size -->
    <div
      style="
        position: relative;
        background: white;
        height: 297mm;
        width: 210mm;
        padding: 25mm 10mm 25mm 10mm;
        border: 1px solid #eee;
      "
    >
      <div style="display: flex; width: 100%; height: 100%; flex-flow: column">
        <div style="display: flex; width: 100%; flex-flow: row; height: 50mm">
          <div
            style="
              display: flex;
              height: 100%;
              flex-flow: column;
              flex: auto;
              justify-content: space-between;
            "
          >
            <div style="flex: auto">
              <p
                style="
                  font-size: 37pt;
                  margin: 0;
                  letter-spacing: 5pt;
                  font-family: system-ui, -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                    'Helvetica Neue', sans-serif;
                  width: 100%;
                "
              >
                NGUYEN <br />
                VAN ABC
              </p>
            </div>
            <div
              style="
                height: 12.5mm;
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
                align-items: center;
                display: flex;
              "
            >
              <p
                style="
                  font-size: 14pt;
                  margin: 0;
                  letter-spacing: 5pt;
                  font-family: system-ui, -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                    'Helvetica Neue', sans-serif;
                  width: 100%;
                "
              >
                SOFWARE ENGINEER
              </p>
            </div>
          </div>
          <div style="width: 50mm; height: 50mm; margin-left: 10mm">
            <img
              src="https://via.placeholder.com/132x132"
              alt="avt"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
        <div
          style="
            margin-top: 16mm;
            width: 100%;
            flex: auto;
            display: flex;
            flex-flow: row;
          "
        >
          <div
            style="
              display: flex;
              flex-flow: column;
              width: 50mm;
              justify-content: space-between;
              align-items: stretch;
              min-width: 50mm;
              gap: 8mm;
            "
          >
            <div style="display: flex; flex-flow: column">
              <!-- <div style="display: flex; flex-flow: column;"> -->
              <div
                style="
                  border-bottom: 1px solid #eee;
                  display: flex;
                  flex-flow: row;
                  align-items: center;
                  padding-bottom: 1.5mm;
                "
              >
                <div
                  style="
                    height: 32px;
                    width: 32px;
                    margin-right: 4mm;
                    border: 1px solid #000;
                    border-radius: 50%;
                    padding: 6px;
                  "
                >
                  <img
                    src="./icons/profile.png"
                    alt="profile"
                    style="width: 100%; height: 100%"
                  />
                </div>
                <div>
                  <p
                    style="
                      letter-spacing: 1pt;
                      margin: 0;
                      font-size: 14pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    PROFILE
                  </p>
                </div>
              </div>
              <!-- </div> -->
              <div style="margin-top: 6mm">
                <p
                  style="
                    margin: 0;
                    text-align: justify;
                    font-size: 8pt;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont,
                      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                      'Helvetica Neue', sans-serif;
                    width: 100%;
                  "
                >
                  Experienced backend developer with a strong understanding of
                  server-side programming languages and frameworks. Proficient
                  in designing and implementing scalable and secure RESTful
                  APIs, database management, and cloud computing. Skilled in
                  optimizing application performance, troubleshooting issues,
                  and collaborating with cross-functional teams. Passionate
                  about staying up-to-date with the latest technologies and
                  continuously improving development processes.
                </p>
              </div>
            </div>
            <div style="display: flex; flex-flow: column">
              <!-- <div style="display: flex; flex-flow: column;"> -->
              <div
                style="
                  border-bottom: 1px solid #eee;
                  display: flex;
                  flex-flow: row;
                  align-items: center;
                  padding-bottom: 1.5mm;
                "
              >
                <div
                  style="
                    height: 32px;
                    width: 32px;
                    margin-right: 4mm;
                    border: 1px solid #000;
                    border-radius: 50%;
                    padding: 6px;
                  "
                >
                  <img
                    src="./icons/contact.png"
                    alt="profile"
                    style="width: 100%; height: 100%"
                  />
                </div>
                <div>
                  <p
                    style="
                      letter-spacing: 1pt;
                      margin: 0;
                      font-size: 14pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    CONTACT
                  </p>
                </div>
              </div>
              <!-- </div> -->
              <div style="margin-top: 1mm">
                <div style="margin-top: 5mm">
                  <p
                    style="
                      letter-spacing: 0pt;
                      margin: 0;
                      font-size: 9pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    Address:
                  </p>
                  <p
                    style="
                      letter-spacing: 0pt;
                      margin: 0;
                      font-size: 9pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    Ho Chi Minh City
                  </p>
                </div>
                <div style="margin-top: 5mm">
                  <p
                    style="
                      letter-spacing: 0pt;
                      margin: 0;
                      font-size: 9pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    Mobile:
                  </p>
                  <p
                    style="
                      letter-spacing: 0pt;
                      margin: 0;
                      font-size: 9pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    +84 123 456 789
                  </p>
                </div>
                <div style="margin-top: 5mm">
                  <p
                    style="
                      letter-spacing: 0pt;
                      margin: 0;
                      font-size: 9pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    Mail:
                  </p>
                  <p
                    style="
                      letter-spacing: 0pt;
                      margin: 0;
                      font-size: 9pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    example@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div style="display: flex; flex-flow: column">
              <!-- <div style="display: flex; flex-flow: column;"> -->
              <div
                style="
                  border-bottom: 1px solid #eee;
                  display: flex;
                  flex-flow: row;
                  align-items: center;
                  padding-bottom: 1.5mm;
                "
              >
                <div
                  style="
                    height: 32px;
                    width: 32px;
                    margin-right: 4mm;
                    border: 1px solid #000;
                    border-radius: 50%;
                    padding: 6px;
                  "
                >
                  <img
                    src="./icons/skill.png"
                    alt="profile"
                    style="width: 100%; height: 100%"
                  />
                </div>

                <div>
                  <p
                    style="
                      letter-spacing: 1pt;
                      margin: 0;
                      font-size: 14pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    Skills
                  </p>
                </div>
              </div>
              <!-- </div> -->
              <div
                style="
                  margin-top: 1mm;
                  display: flex;
                  flex-direction: column;
                  gap: 1mm;
                "
              >
                <div>
                  <div style="margin-top: 5mm">
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 11pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        font-weight: 500;
                      "
                    >
                      React
                    </p>
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 9pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        text-align: justify;
                        word-break: break-all;
                      "
                    >
                      Trung cấp
                    </p>
                  </div>
                </div>
                <div>
                  <div style="margin-top: 5mm">
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 11pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        font-weight: 500;
                      "
                    >
                      React
                    </p>
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 9pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                      "
                    >
                      Trung cấp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Languages -->
            <div style="display: flex; flex-flow: column">
              <!-- <div style="display: flex; flex-flow: column;"> -->
              <div
                style="
                  border-bottom: 1px solid #eee;
                  display: flex;
                  flex-flow: row;
                  align-items: center;
                  padding-bottom: 1.5mm;
                "
              >
                <div
                  style="
                    height: 32px;
                    width: 32px;
                    margin-right: 4mm;
                    border: 1px solid #000;
                    border-radius: 50%;
                    padding: 6px;
                  "
                >
                  <img
                    src="./icons/skill.png"
                    alt="profile"
                    style="width: 100%; height: 100%"
                  />
                </div>

                <div>
                  <p
                    style="
                      letter-spacing: 1pt;
                      margin: 0;
                      font-size: 14pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    Languages
                  </p>
                </div>
              </div>
              <!-- </div> -->
              <div
                style="
                  margin-top: 1mm;
                  display: flex;
                  flex-direction: column;
                  gap: 1mm;
                "
              >
                <div>
                  <div style="margin-top: 5mm">
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 11pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        font-weight: 500;
                      "
                    >
                      React
                    </p>
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 9pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                      "
                    >
                      Trung cấp
                    </p>
                  </div>
                </div>
                <div>
                  <div style="margin-top: 5mm">
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 11pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        font-weight: 500;
                      "
                    >
                      Tiếng Anh
                    </p>
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 9pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                      "
                    >
                      Trung cấp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Awards -->
            <div style="display: flex; flex-flow: column">
              <!-- <div style="display: flex; flex-flow: column;"> -->
              <div
                style="
                  border-bottom: 1px solid #eee;
                  display: flex;
                  flex-flow: row;
                  align-items: center;
                  padding-bottom: 1.5mm;
                "
              >
                <div
                  style="
                    height: 32px;
                    width: 32px;
                    margin-right: 4mm;
                    border: 1px solid #000;
                    border-radius: 50%;
                    padding: 6px;
                  "
                >
                  <img
                    src="./icons/skill.png"
                    alt="profile"
                    style="width: 100%; height: 100%"
                  />
                </div>

                <div>
                  <p
                    style="
                      letter-spacing: 1pt;
                      margin: 0;
                      font-size: 14pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    Awards
                  </p>
                </div>
              </div>
              <!-- </div> -->
              <div
                style="
                  margin-top: 1mm;
                  display: flex;
                  flex-direction: column;
                  gap: 1mm;
                "
              >
                <div>
                  <div style="margin-top: 5mm">
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 11pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        font-weight: 500;
                      "
                    >
                      Vô địch LOL
                    </p>
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 9pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        text-align: justify;
                        word-break: break-all;
                      "
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Minima pariatur, a, aperiam accusamus laboriosam fugit est
                      eaque aliquam dolores molestias facilis repudiandae odio.
                      Facere amet distinctio, sequi blanditiis maxime ea!
                    </p>
                  </div>
                </div>
                <div>
                  <div style="margin-top: 5mm">
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 11pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        font-weight: 500;
                      "
                    >
                      Tiếng Anh
                    </p>
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 9pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                      "
                    >
                      Trung cấp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hobbies -->
            <div style="display: flex; flex-flow: column">
              <!-- <div style="display: flex; flex-flow: column;"> -->
              <div
                style="
                  border-bottom: 1px solid #eee;
                  display: flex;
                  flex-flow: row;
                  align-items: center;
                  padding-bottom: 1.5mm;
                "
              >
                <div
                  style="
                    height: 32px;
                    width: 32px;
                    margin-right: 4mm;
                    border: 1px solid #000;
                    border-radius: 50%;
                    padding: 6px;
                  "
                >
                  <img
                    src="./icons/skill.png"
                    alt="profile"
                    style="width: 100%; height: 100%"
                  />
                </div>

                <div>
                  <p
                    style="
                      letter-spacing: 1pt;
                      margin: 0;
                      font-size: 14pt;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                        'Open Sans', 'Helvetica Neue', sans-serif;
                      width: 100%;
                    "
                  >
                    Hobbies
                  </p>
                </div>
              </div>
              <!-- </div> -->
              <div
                style="
                  margin-top: 1mm;
                  display: flex;
                  flex-direction: column;
                  gap: 1mm;
                "
              >
                <div>
                  <div style="margin-top: 5mm">
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 9pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        text-align: justify;
                        word-break: break-all;
                      "
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Minima pariatur, a, aperiam accusamus laboriosam fugit est
                      eaque aliquam dolores molestias facilis repudiandae odio.
                      Facere amet distinctio, sequi blanditiis maxime ea!
                    </p>
                  </div>
                </div>
                <div>
                  <div style="margin-top: 5mm">
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 11pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                        font-weight: 500;
                      "
                    >
                      Tiếng Anh
                    </p>
                    <p
                      style="
                        letter-spacing: 0pt;
                        margin: 0;
                        line-height: 14pt;
                        font-size: 9pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                      "
                    >
                      Trung cấp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style="border-top: 1px solid #eee">
              <div style="display: flex; flex-flow: row; margin-top: 2mm">
                <div
                  style="
                    width: 16px;
                    height: 16px;
                    margin-right: 5mm;
                    display: flex;
                    justify-content: center;
                  "
                >
                  <img
                    src="./icons/twitter.png"
                    alt=""
                    style="width: 100%; height: 100%"
                  />
                </div>
                <div
                  style="
                    width: 16px;
                    height: 16px;
                    margin-right: 5mm;
                    display: flex;
                    justify-content: center;
                  "
                >
                  <img
                    src="./icons/fb.png"
                    alt=""
                    style="width: auto; height: 100%; max-width: 100%"
                  />
                </div>
                <div
                  style="
                    width: 16px;
                    height: 16px;
                    margin-right: 5mm;
                    display: flex;
                    justify-content: center;
                  "
                >
                  <img
                    src="./icons/in.png"
                    alt=""
                    style="width: 100%; height: 100%"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style="
              flex: auto;
              margin-left: 20mm;
              display: flex;
              flex-flow: column;
            "
          >
            <!-- Experiences -->
            <div>
              <div style="display: flex; flex-flow: column">
                <!-- ICON -->
                <div
                  style="
                    border-bottom: 1px solid #eee;
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    padding-bottom: 1.5mm;
                  "
                >
                  <div
                    style="
                      height: 32px;
                      width: 32px;
                      margin-right: 4mm;
                      border: 1px solid #000;
                      border-radius: 50%;
                      padding: 6px;
                    "
                  >
                    <img
                      src="./icons/experiences.png"
                      alt="profile"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div>
                    <p
                      style="
                        letter-spacing: 1pt;
                        margin: 0;
                        font-size: 14pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                      "
                    >
                      EXPERIENCES
                    </p>
                  </div>
                </div>
                <!-- CONTENT -->
                <div style="margin-top: 6mm">
                  <ul style="list-style: none">
                    <li style="margin-bottom: 7mm">
                      <div style="display: flex; flex-flow: column">
                        <!-- COMPANY -->
                        <div style="display: flex; flex-flow: row">
                          <!-- COMPANY - DESCRIPTIOM -->
                          <div style="min-width: 33%">
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin: 0;
                                font-size: 10pt;
                                font-weight: bold;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              Neoworks
                            </p>
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin-top: 4mm;
                                font-size: 9pt;
                                font-style: italic;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              2019 - Present
                            </p>
                          </div>
                          <div style="display: flex; flex-flow: column">
                            <!-- POSITION -->
                            <div>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 10pt;
                                  font-weight: bold;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                Software Engineer
                              </p>
                            </div>
                            <!-- DESC -->
                            <div style="margin-top: 4mm">
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Build and manage IT team
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Build testing process
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Develop process documentaton
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Have experiences in working
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li style="margin-bottom: 7mm">
                      <div style="display: flex; flex-flow: column">
                        <!-- COMPANY -->
                        <div style="display: flex; flex-flow: row">
                          <!-- COMPANY - DESCRIPTION -->
                          <div style="min-width: 33%">
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin: 0;
                                font-size: 10pt;
                                font-weight: bold;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              Neoworks
                            </p>
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin-top: 4mm;
                                font-size: 9pt;
                                font-style: italic;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              2019 - Present
                            </p>
                          </div>
                          <div style="display: flex; flex-flow: column">
                            <!-- POSITION -->
                            <div>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 10pt;
                                  font-weight: bold;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                Software Engineer
                              </p>
                            </div>
                            <!-- DESC -->
                            <div style="margin-top: 4mm">
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Build and manage IT team
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Build testing process
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Develop process documentaton
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Have experiences in working
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li style="margin-bottom: 7mm">
                      <div style="display: flex; flex-flow: column">
                        <!-- COMPANY -->
                        <div style="display: flex; flex-flow: row">
                          <!-- COMPANY - DESCRIPTIOM -->
                          <div style="min-width: 33%">
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin: 0;
                                font-size: 10pt;
                                font-weight: bold;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              Neoworks
                            </p>
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin-top: 4mm;
                                font-size: 9pt;
                                font-style: italic;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              2019 - Present
                            </p>
                          </div>
                          <div style="display: flex; flex-flow: column">
                            <!-- POSITION -->
                            <div>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 10pt;
                                  font-weight: bold;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                Software Engineer
                              </p>
                            </div>
                            <!-- DESC -->
                            <div style="margin-top: 4mm">
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Build and manage IT team
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Build testing process
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Develop process documentaton
                              </p>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                - Have experiences in working
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--  -->
            <!-- EDUCATIONS -->
            <div>
              <div style="display: flex; flex-flow: column">
                <!-- ICON -->
                <div
                  style="
                    border-bottom: 1px solid #eee;
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    padding-bottom: 1.5mm;
                  "
                >
                  <div
                    style="
                      height: 32px;
                      width: 32px;
                      margin-right: 4mm;
                      border: 1px solid #000;
                      border-radius: 50%;
                      padding: 6px;
                    "
                  >
                    <img
                      src="./icons/education.png"
                      alt="profile"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div>
                    <p
                      style="
                        letter-spacing: 1pt;
                        margin: 0;
                        font-size: 14pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                      "
                    >
                      EDUCATIONS
                    </p>
                  </div>
                </div>
                <!-- CONTENT -->
                <div style="margin-top: 6mm">
                  <ul style="list-style: none">
                    <li style="margin-bottom: 7mm">
                      <div style="display: flex">
                        <!-- COMPANY -->
                        <div
                          style="
                            display: flex;
                            flex-flow: row;
                            justify-content: space-between;
                          "
                        >
                          <!-- COMPANY - DESCRIPTIOM -->
                          <div
                            style="
                              display: flex;
                              flex-flow: column;
                              width: auto;
                              min-width: 33%;
                            "
                          >
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin: 0;
                                font-size: 10pt;
                                font-weight: bold;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              FPT University
                            </p>
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin-top: 4mm;
                                font-size: 9pt;
                                font-style: italic;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              2019 - Present
                            </p>
                          </div>
                          <div style="display: flex; flex-flow: column">
                            <!-- POSITION -->
                            <div>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 10pt;
                                  font-weight: bold;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                Information Technology
                              </p>
                            </div>
                            <!-- DESC -->
                            <div style="margin-top: 4mm">
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                Comprehensive education in IT with a focus on
                                computer science, software engineering, and
                                information systems. Strong foundation in
                                programming languages, algorithms, data
                                structures, and database management. Proficient
                                in software development methodologies, including
                                Agile and Waterfall, and experienced in using
                                industry-standard tools and technologies.
                                Skilled in problem-solving, critical thinking,
                                and effective communication. Passionate about
                                continuous learning and staying up-to-date with
                                emerging trends and technologies in the field.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Activities -->
            <div>
              <div style="display: flex; flex-flow: column">
                <!-- ICON -->
                <div
                  style="
                    border-bottom: 1px solid #eee;
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    padding-bottom: 1.5mm;
                  "
                >
                  <div
                    style="
                      height: 32px;
                      width: 32px;
                      margin-right: 4mm;
                      border: 1px solid #000;
                      border-radius: 50%;
                      padding: 6px;
                    "
                  >
                    <img
                      src="./icons/education.png"
                      alt="profile"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div>
                    <p
                      style="
                        letter-spacing: 1pt;
                        margin: 0;
                        font-size: 14pt;
                        font-family: system-ui, -apple-system,
                          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        width: 100%;
                      "
                    >
                      Activities
                    </p>
                  </div>
                </div>
                <!-- CONTENT -->
                <div style="margin-top: 6mm">
                  <ul style="list-style: none">
                    <li style="margin-bottom: 7mm">
                      <div style="display: flex">
                        <!-- COMPANY -->
                        <div
                          style="
                            display: flex;
                            flex-flow: row;
                            justify-content: space-between;
                          "
                        >
                          <!-- COMPANY - DESCRIPTIOM -->
                          <div
                            style="
                              display: flex;
                              flex-flow: column;
                              width: auto;
                              min-width: 33%;
                            "
                          >
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin: 0;
                                font-size: 10pt;
                                font-weight: bold;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              FPT University
                            </p>
                            <p
                              style="
                                letter-spacing: 0pt;
                                margin-top: 4mm;
                                font-size: 9pt;
                                font-style: italic;
                                font-family: system-ui, -apple-system,
                                  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                                  Ubuntu, Cantarell, 'Open Sans',
                                  'Helvetica Neue', sans-serif;
                                width: 100%;
                              "
                            >
                              2019 - Present
                            </p>
                          </div>
                          <div style="display: flex; flex-flow: column">
                            <!-- POSITION -->
                            <div>
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 10pt;
                                  font-weight: bold;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                Information Technology
                              </p>
                            </div>
                            <!-- DESC -->
                            <div style="margin-top: 4mm">
                              <p
                                style="
                                  letter-spacing: 0pt;
                                  margin: 0;
                                  font-size: 9pt;
                                  font-style: italic;
                                  font-family: system-ui, -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Oxygen, Ubuntu, Cantarell, 'Open Sans',
                                    'Helvetica Neue', sans-serif;
                                  width: 100%;
                                "
                              >
                                Comprehensive education in IT with a focus on
                                computer science, software engineering, and
                                information systems. Strong foundation in
                                programming languages, algorithms, data
                                structures, and database management. Proficient
                                in software development methodologies, including
                                Agile and Waterfall, and experienced in using
                                industry-standard tools and technologies.
                                Skilled in problem-solving, critical thinking,
                                and effective communication. Passionate about
                                continuous learning and staying up-to-date with
                                emerging trends and technologies in the field.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`;