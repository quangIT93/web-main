const breakpoints = {
  mobile: '420px',
  tablet: '784px',
  laptop: '1024px',
  desktop: '1200px',
  largeDesktop: '1400px',
}

export default breakpoints

// export const ChoosesCarreer = styled('div')(({ theme }) => ({
//   border: '1px solid #ccc',
//   width: '260px',
//   padding: '8px',
//   borderRadius: '8px',
//   display: 'flex',
//   alignItems: 'center',
//   cursor: 'pointer',
//   position: 'relative',

//   //  Additional styles for screens with a maximum width of 768px */
//   [`@media (max-width: ${mobile})`]: {
//     backgroundColor: 'red',
//     /* Additional styles for screens with a maximum width of the specified breakpoint */
//   },

//   [`@media (min-width: ${mobile}) and (max-width: ${tablet}) `]: {
//     backgroundColor: 'yellow',
//     /* Additional styles for screens with a maximum width of the specified breakpoint */
//   },

//   [`@media (min-width: ${tablet}) and (max-width: ${laptop})`]: {
//     backgroundColor: 'green',
//     /* Additional styles for screens with a maximum width of the specified breakpoint */
//   },

//   [`@media (min-width: ${laptop}) and (max-width: ${desktop})`]: {
//     backgroundColor: 'blue',
//     /* Additional styles for screens with a maximum width of the specified breakpoint */
//   },

//   [`@media (min-width: ${desktop}) and (max-width: ${largeDesktop})`]: {
//     background: 'purple',
//     /* Additional styles for screens with a maximum width of the specified breakpoint */
//   },

//   [`@media (min-width: ${largeDesktop})`]: {
//     backgroundColor: 'white',
//     /* Additional styles for screens with a maximum width of the specified breakpoint */
//   },
// }))
