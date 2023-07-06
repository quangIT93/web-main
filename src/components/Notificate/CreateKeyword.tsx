import React from 'react';

const CreateKeyword = () => {
  // const [dataAllLocation, setDataAllLocation] = React.useState<any>(null);
  // const [selectedProvince, setSelectedProvince] = useState<any>(null);
  // const [value, setValue] = React.useState<string | number>('');

  // const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
  //   null,
  // );

  // const [open, setOpen] = React.useState<any>([]);
  // const [location, setLocation] = React.useState<any>(
  //   locations?.map((v: any, i: number) => v.district),
  // );

  // const [locationId, setLocationId] = React.useState<any>(
  //   locations?.map((v: any, i: number) => v.district_id),
  // );

  // const [valueDistrict, setValueDistrict] = useState<string>('');

  const sharedProps = {
    style: { width: '100%' },
    defaultValue: 'Ant Design love you!',
    // ref: inputRef,
  };
  // const allLocation = async () => {
  //   try {
  //     const allLocation = await locationApi.getAllLocation();

  //     if (allLocation) {
  //       setDataAllLocation(allLocation.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  //   allLocation();
  //   // getAllLocations()
  //   // delete param when back to page
  // }, []);

  // useEffect(() => {
  //   if (dataAllLocation && dataAllLocation.length > 0) {
  //     setOpen(Array(dataAllLocation.length).fill(false));
  //   }
  // }, [dataAllLocation]);

  // const handleClickProvince = (event: any, index: number) => {
  //   event.stopPropagation();

  //   const newOpen = open.map((value: boolean, i: number) =>
  //     i === index ? !value : false,
  //   );
  //   console.log('newOpen', newOpen);
  //   setOpen(newOpen);
  // };

  // const handleChangeCheckedRadio = (e: any) => {
  //   console.log('value', e.target.value);
  //   setValueDistrict(e.target.value);
  // };

  // const renderOptions = () => {
  //   return dataAllLocation?.map((item: any, index: number) => (
  //     <div key={index}>
  //       <ListItemButton onClick={(event) => handleClickProvince(event, index)}>
  //         <ListItemText primary={item.province_fullName} />
  //         {open[index] ? <ExpandLess /> : <ExpandMore />}
  //       </ListItemButton>
  //       <Collapse in={open[index]} timeout="auto" unmountOnExit>
  //         <RadioGroup
  //           aria-labelledby="demo-controlled-radio-buttons-group"
  //           name="controlled-radio-buttons-group"
  //           value={valueDistrict}
  //           onChange={handleChangeCheckedRadio}
  //         >
  //           {item.districts.map((v: any, i: number) => (
  //             <FormControlLabel
  //               key={v.district_id} // Thêm key cho FormControlLabel
  //               value={`${v.district}, ${item.province_fullName}`}
  //               control={<Radio />}
  //               label={v.district}
  //             />
  //           ))}
  //         </RadioGroup>
  //       </Collapse>
  //     </div>
  //   ));
  // };
  return <div></div>;
};

export default CreateKeyword;

// {showCreateNotification ? (
//   <div className="modal-keyword_notification">
//     <h3>Thêm từ khoá công việc</h3>
//     <FormControl sx={{ width: '100%', margin: '12px auto' }} size="small">
//       <Select
//         multiple
//         displayEmpty
//         value={[valueDistrict]}
//         input={<OutlinedInput placeholder="Quận, Tỉnh/Thành Phố" />}
//         renderValue={(selected) => {
//           console.log("selected", selected)
//           if (selected.length === 0) {
//             return (
//               <p style={{ color: ' #aaaaaa', padding: '4px 0' }}>
//                 Quận, Tỉnh/Thành Phố
//               </p>
//             )
//           } else {
//             return (
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   gap: 0.5,
//                 }}
//               >
//                 {/* {selected.map((value: string, i: number) => (
//                   ))} */}
//                   <Chip label={`${selected[0]}`} />

//                   {/* <p>{value}</p> */}
//               </Box>
//             )
//           }
//         }}
//         MenuProps={MenuProps}
//       >
//         {renderOptions()}
//       </Select>
//     </FormControl>
//   </div>
// ) : (
//   <></>
// )}
