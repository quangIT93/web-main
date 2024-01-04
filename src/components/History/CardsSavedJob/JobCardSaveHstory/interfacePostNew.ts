export interface PropsTypePostNew {
  accountId: string;
  address: string;
  bookmarked: boolean;
  companyName: string;
  companyResourceData: PropsTypeCompanyResourceData;
  createdAtText: string;
  id: number;
  image: string;
  jobType: PropsJobType;
  location: PropsLocation;
  moneyType: string;
  salaryMax: number;
  salaryMin: number;
  salaryType: PropsSalaryType;
  title: string;
  created_at: number;
}

interface PropsTypeCompanyResourceData {
  id: number;
  logo: string;
  name: string;
}

interface PropsJobType {
  id: number;
  name: string;
}

interface PropsChildLocation {
  fullName: string;
  id: string;
}

interface PropsSalaryType {
  name: string;
  id: number;
}

interface PropsLocation {
  district: PropsChildLocation;
  province: PropsChildLocation;
  ward: PropsChildLocation;
}
