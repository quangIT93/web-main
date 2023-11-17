import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'store';

interface Props {
    children?: React.ReactNode
  }
const PostProtect = ({children} : Props) => {
    const profileV3 = useSelector(
        (state: RootState) => state.dataProfileInformationV3.data,
      );

      if(profileV3?.companyInfo?.status === 0){
        const url = `/`
        return <Navigate to={url} />;
      }
    
    return children ? <>{children}
    
    </> : null;
}

export default PostProtect