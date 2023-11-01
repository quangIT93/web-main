import React from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import categoriesApi from 'api/categoriesApi';
// import redux
import { RootState } from 'store';

import { ArrowFilterIcon } from '#components/Icons';
import { CateIcon } from '#components/Icons/iconCandidate';
// import ant
import { Button, Cascader, Divider, Typography } from 'antd';

interface ISearchCate {
    setCategories: any;
    setReset: Function;
    reset: boolean;
    categories: any;
}

const SearchCateCompany: React.FC<ISearchCate> = (props) => {
    const { setCategories, reset, setReset, categories } = props;

    const [dataCategories, setDataCategories] = React.useState<any>(null);
    const [disable, setDisable] = React.useState<Boolean>(false);

    const { SHOW_CHILD } = Cascader;
    const { Text } = Typography;

    const location = useLocation();

    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
    const getCategories = async () => {
        try {
            const result = await categoriesApi.getAllCategorise(
                languageRedux === 1 ? 'vi' : 'en',
            );
            if (result) {
                setDataCategories(result.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        if (dataCategories === null) {
            getCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileV3]);

    const onChange = (value: string[][]) => {
        setReset(false);
        setCategories(value);
    };

    const DropdownRender = (menus: React.ReactNode) => (
        <div className="filter-loca-cate filter-company">
            <Text className="title-filter_location">
                {languageRedux === 1 ? 'Ngành nghề' : 'Career'}
            </Text>
            {menus}
            <Divider style={{ margin: '8px 5px' }}>
                {disable ? 'Vui lòng chọn ngành nghề bạn muốn tìm kiếm.' : ''}
            </Divider>
        </div>
    );

    return (
        <div className="wrap-search_company" style={{ width: '100%' }}>
            <div
                style={{ position: 'absolute', zIndex: '8', top: '10px', left: '10px' }}
            >
                <CateIcon />
            </div>
            <Cascader
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                style={{ width: '100%' }}
                onChange={onChange as any}
                multiple
                maxTagCount="responsive"
                showCheckedStrategy={SHOW_CHILD}
                inputIcon={<CateIcon />}
                suffixIcon={<ArrowFilterIcon width={14} height={10} />}
                size="large"
                dropdownRender={DropdownRender}
                value={reset ? [] : categories}
                options={
                    dataCategories
                        ? dataCategories.map((parentCategory: any) => ({
                            value: parentCategory.parent_category_id,
                            label: parentCategory.parent_category,
                            children: parentCategory.childs.map((child: any) => {
                                var dis = false;
                                //check id child  when disable = true

                                return {
                                    value: child.id,
                                    label: child.name,
                                    disabled: dis,
                                };
                            }),
                        }))
                        : []
                }
                placeholder={languageRedux === 1 ? 'Ngành nghề' : 'Career'}
            />
        </div>
    );
};

export default SearchCateCompany;
