import React from 'react';

export interface IitemNewJob {
  bookmarked: boolean;
  id: number;
  title: string;
  post_id: Number;
  companyName: string;
  address: string;
  salaryMax: number;
  salaryMin: number;
  createdAtText: string;
  moneyType: string;
  image: string;
  jobType: {
    id: number;
    name: string;
  };
  salaryType: {
    id: number;
    name: string;
  };
  location: {
    ward: {
      id: string;
      fullName: string;
    };
    district: {
      id: string;
      fullName: string;
    };
    province: {
      id: string;
      fullName: string;
    };
  };
  companyResourceData: {
    id: number;
    name: string;
    logo: null | string;
  };
}

interface Iprops {
  item: IitemNewJob;
}
const JobCardSearch: React.FC<Iprops> = (props) => {
  console.log('props', props);

  return <div>JobCardSearh</div>;
};

export default JobCardSearch;
