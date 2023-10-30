import React, { ReactNode, useState, useEffect } from 'react';

export interface IvalueJobChild {
  parentName: string;
  id: number;
}

type DivRef = React.RefObject<HTMLUListElement> | null;
export type DivRef1 = React.RefObject<HTMLDivElement> | null;

export const HomeValueContext = React.createContext<{
  SetRefNav: React.Dispatch<React.SetStateAction<DivRef1>>;
  childCateloriesArray: number[];
  openCollapseFilter: boolean;
  setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>;
  setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>;
  // heightNavbar: number
  // setHeightNavbar: React.Dispatch<React.SetStateAction<number>>
  openModalLoginNavbar: boolean;
  setOpenModalLoginNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  valueJobChild: IvalueJobChild;
  setValueJobChild: React.Dispatch<React.SetStateAction<IvalueJobChild>>;
  refCatelories: number;
  setRefCatelories: React.Dispatch<React.SetStateAction<number>>;
  setRefCatelory: React.Dispatch<React.SetStateAction<DivRef>>;
  setNavTouchCatelory: React.Dispatch<React.SetStateAction<boolean>>;
  navTouchCatelory: boolean;
  setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
  openNotificate: boolean;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  search: boolean;
  setOpenCategoryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  openCategoryDropdown: boolean;
  // setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;,
  // unsavedChanges: boolean
}>({
  childCateloriesArray: [],
  setChildCateloriesArray: () => {},
  openCollapseFilter: false,
  setOpenCollapseFilter: () => {},
  // heightNavbar: 0,
  // setHeightNavbar: () => {},
  openModalLoginNavbar: false,
  setOpenModalLoginNavbar: () => {},
  valueJobChild: {
    id: 1,
    parentName: 'Tất cả',
  },
  setValueJobChild: () => {},
  refCatelories: 0,
  setRefCatelories: () => {},
  setRefCatelory: () => {},
  SetRefNav: () => {},
  setNavTouchCatelory: () => {},
  navTouchCatelory: false,
  setOpenNotificate: () => {},
  openNotificate: false,
  setSearch: () => {},
  search: false,
  setOpenCategoryDropdown: () => {},
  openCategoryDropdown: false,
  // setUnsavedChanges: () => {},
  // unsavedChanges: false
});

type ParentComponentProps = {
  children: ReactNode;
};

const HomeValueContextProvider = ({ children }: ParentComponentProps) => {
  const [childCateloriesArray, setChildCateloriesArray] = useState<number[]>(
    [],
  );
  // const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [openCollapseFilter, setOpenCollapseFilter] = useState<boolean>(false);

  const [openNotificate, setOpenNotificate] = useState(false);
  const [search, setSearch] = useState(false);

  // const [heightNavbar, setHeightNavbar] = useState<number>(0)

  const [openModalLoginNavbar, setOpenModalLoginNavbar] = useState(false);

  const [valueJobChild, setValueJobChild] = useState<IvalueJobChild>({
    id: 1,
    parentName: 'Tất cả',
  });

  const [refCatelories, setRefCatelories] = useState<number>(0);

  const [refNav, SetRefNav] = useState<DivRef1>(null);

  const [refCatelory, setRefCatelory] = useState<DivRef>(null);

  const [prevScrollTop, setPrevScrollTop] = useState(
    refCatelory?.current
      ? Number(refCatelory?.current?.getBoundingClientRect().top)
      : 0,
  );

  const [navTouchCatelory, setNavTouchCatelory] = useState<boolean>(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] =
    useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        openCollapseFilter === false
          ? (window.scrollY || document.documentElement.scrollTop) + 71
          : (window.scrollY || document.documentElement.scrollTop) + 71 + 116;

      if (currentScrollTop > prevScrollTop) {
        setNavTouchCatelory(true);
        // Thực hiện hành động khi croll xuống trước đầu element 2
      } else if (currentScrollTop <= prevScrollTop) {
        setNavTouchCatelory(false);
        // Thực hiện hành động khi croll lên trúng đầu element 2
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollTop, openCollapseFilter]);

  useEffect(() => {
    setPrevScrollTop(Number(refCatelory?.current?.getBoundingClientRect().top));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refCatelory]);

  const homeValueContextData = {
    childCateloriesArray,
    setChildCateloriesArray,
    setOpenCollapseFilter,
    openCollapseFilter,
    // setHeightNavbar,
    // heightNavbar,
    setOpenModalLoginNavbar,
    openModalLoginNavbar,
    setValueJobChild,
    valueJobChild,
    setRefCatelories,
    refCatelories,
    setRefCatelory,
    SetRefNav,
    refNav,
    setNavTouchCatelory,
    navTouchCatelory,
    setOpenNotificate,
    openNotificate,
    setSearch,
    search,
    setOpenCategoryDropdown,
    openCategoryDropdown,
  };

  return (
    <HomeValueContext.Provider value={homeValueContextData}>
      {children}
    </HomeValueContext.Provider>
  );
};

export default HomeValueContextProvider;
