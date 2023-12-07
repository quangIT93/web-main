import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

// import redux
import { RootState } from 'store';

import { EnvironmentOutlined } from '@ant-design/icons';

import { ArrowFilterIcon, NewOldFilterIcon } from '#components/Icons';

// import ant
import {
    Button,
    Cascader,
    Divider,
    Typography,
    Select,
    Space,
    Radio,
} from 'antd';
import type { RadioChangeEvent } from 'antd';

import './style.scss';
import apiCompany from 'api/apiCompany';

const CustomOption = ({
    sortType,
    setSortType,
    setNewOld,
    setValueRender,
    reset,
}: {
    sortType: any;
    setNewOld: Function;
    setSortType: any;
    setValueRender: Function;
    reset: boolean;
}) => {
    const onChange = ({ target: { value } }: RadioChangeEvent) => {
        // console.log('valueRender Loai cong viec', valueRender);
        // console.log('valueRender Loai cong viec value', value);
        const valueRender = value;
        // console.log(value);

        setNewOld(value);
        if (valueRender) {
            setValueRender(
                valueRender === 1 ?
                    languageRedux === 1
                        ? 'Mới nhất'
                        : languageRedux === 2
                            ? 'Newest'
                            : languageRedux === 3 && '최신'
                    :
                    languageRedux === 1
                        ? 'Cũ nhất'
                        : languageRedux === 2
                            ? 'Oldest'
                            : languageRedux === 3 && '가장 오래된'
            );
        }
        setSortType(value);
    };

    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );

    return (
        <div className="filter-wrap-radio_hotjob">
            <div className="title-company">
                <h3>
                    {languageRedux === 1
                        ? 'Sắp xếp theo'
                        : languageRedux === 2
                            ? "Sorted by"
                            : languageRedux === 3 && '정렬 기준'}
                </h3>
            </div>
            <Radio.Group
                style={{ width: '100%' }}
                name="radiogroup"
                onChange={onChange}
                value={reset ? 1 : sortType}
            // defaultValue={2}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Radio key={1} style={{ width: '100%' }} value={1}>
                        {languageRedux === 1
                            ? 'Mới nhất'
                            : languageRedux === 2
                                ? 'Newest'
                                : languageRedux === 3 && '최신'}
                    </Radio>
                    <Radio key={2} style={{ width: '100%' }} value={2}>
                        {languageRedux === 1
                            ? 'Cũ nhất'
                            : languageRedux === 2
                                ? 'Oldest'
                                : languageRedux === 3 && '가장 오래된'}
                    </Radio>
                </Space>
            </Radio.Group>
        </div>
    );
};

interface ISeachEducation {
    setNewOld: any;
    setReset: Function;
    reset: boolean;
}

const FilterNewOldHotJob: React.FC<ISeachEducation> = (props) => {
    const { setNewOld, setReset, reset } = props;

    const { Option } = Select;

    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const [sortType, setSortType] = React.useState(1);
    const [valueRender, setValueRender] = React.useState<any>(languageRedux === 1
        ? 'Mới nhất'
        : languageRedux === 2
            ? 'Newest'
            : languageRedux === 3 && '최신');
    // const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

    const onChange = (value: string[][]) => { };
    const handleChange = (value1: number) => {
        setReset(false);
    };

    useEffect(() => {
        if (reset) {
            setValueRender(
                languageRedux === 1
                    ? 'Mới nhất'
                    : languageRedux === 2
                        ? 'Newest'
                        : languageRedux === 3 && '최신'
            );
        }
    }, [reset]);

    return (
        <div className="filter-new-old-hotjob">
            <div className="filter-input-new-old-hotjob">
                <NewOldFilterIcon />
            </div>
            <Select
                style={{ width: 120 }}
                onChange={handleChange}
                optionLabelProp="label"
                value={reset && valueRender ?
                    languageRedux === 1
                        ? 'Mới nhất'
                        : languageRedux === 2
                            ? 'Newest'
                            : languageRedux === 3 && '최신' :
                    valueRender}
                className="inputTypeSalary input-filter_nav"
                size="large"
                placeholder={
                    languageRedux === 1
                        ? 'Sắp xếp theo'
                        : languageRedux === 2
                            ? "Sorted by"
                            : languageRedux === 3 && '정렬 기준'
                }
                suffixIcon={<ArrowFilterIcon width={14} height={10} />}
            // open={true}
            // onMouseLeave={set}
            >
                <Option className="type-salary" value={sortType} label="">
                    <div >
                        <CustomOption
                            sortType={sortType}
                            setSortType={setSortType}
                            setNewOld={setNewOld}
                            setValueRender={setValueRender}
                            reset={reset}
                        />
                    </div>
                </Option>
            </Select>
        </div>
    );
};

export default FilterNewOldHotJob;
