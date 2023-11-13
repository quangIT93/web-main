import React from 'react';

interface IModalShowAvatar {
  openModalMaxUnlock: boolean;
  setOpenModalMaxUnlock: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalShowAvatar: React.FC<IModalShowAvatar> = (props) => {
  return <div>ModalShowAvatar</div>;
};

export default ModalShowAvatar;
