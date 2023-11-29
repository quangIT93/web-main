import React from 'react';
// @ts-ignore

import './style.scss';

import { dataInstruction } from './dataInContruction';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const InstructionsCv = () => {
  const [itemParent, setItemParent] = React.useState(1);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleClickItemIns = (id: number) => {
    setItemParent(id);
  };

  return (
    <div className="instructionsCv">
      {/* <Navbar /> */}
      <div className="instructionCv-container">
        <div className="instructionCv-container_top">
          <div className="container-top_content">
            <div className="top-content_title">
              <h3>
                {languageRedux === 1
                  ? 'Hướng dẫn tạo CV trên HiJob'
                  : languageRedux === 2
                    ? 'Instructions for creating a CV on HiJob'
                    : languageRedux === 3 && 'HiJob에서 이력서 작성 지침'}{' '}
              </h3>{' '}
              <h3 style={{ color: '#0d99ff' }}>Chi tiết</h3>
            </div>
            <p>
              Trong chuyên mục này, bạn nhận được hướng dẫn chi tiết về nội dung
              và cách trình bày CV chuẩn, đẹp và được Nhà tuyển dụng đánh giá
              cao!
            </p>
          </div>

          <div className="content-top_img">
            <img src="./images/pageCv/cv trang 3 1.png" alt="" />
          </div>
        </div>

        <div className="instructionCv-container_bottom">
          <div className="container_bottom-list">
            <div className="list-items_ins">
              <div className="title-items_ins">
                <h3>Danh sách hướng dẫn</h3>
              </div>
              <ul className="items-ins">
                {dataInstruction.map((itemParentIns: any) => {
                  return (
                    <li
                      className={`item-ins ${
                        itemParentIns.id === itemParent ? 'active' : ''
                      }`}
                      onClick={() => handleClickItemIns(itemParentIns.id)}
                    >
                      {itemParentIns.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="container_bottom-content">
            {dataInstruction.map((ins: any) => {
              if (ins.id === itemParent) {
                return (
                  <div className="wrap-bottom_content">
                    <h3 className="bottom_content_title">{ins.title}</h3>
                    {ins.itemsParent.map((insParent: any) => (
                      <ul className="bottom-content_items">
                        <h3>{insParent.title}</h3>
                        <li>
                          {insParent.content}
                          {insParent.itemsChild.map((insChild: any) => (
                            <ul className="bottom-content_item">
                              <h4>{insChild.title}</h4>
                              <ul>
                                <li>
                                  {insChild.content
                                    ? insChild.content
                                        .split('\n')
                                        .map((line: any, index: number) => (
                                          <React.Fragment key={index}>
                                            {line}
                                            <br />
                                          </React.Fragment>
                                        ))
                                    : ''}
                                </li>
                              </ul>
                            </ul>
                          ))}
                        </li>
                      </ul>
                    ))}
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsCv;
