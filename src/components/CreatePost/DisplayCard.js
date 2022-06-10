import React, { useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './CreatePost.css';

function DisplayCard({ model, name, price, ref, desc }) {
  const tempdesc = "The release of the new Seiko 5 Sports line, cleverly nicknamed the 5KX (due to its resemblance to the very popular and now discontinued SKX line) was met with a mixed response. The new line includes a hacking and handwinding movement. However, it also lost some important specifications of its predecessor. These include a screw down crown, 200m water resistance, a lume pip on the bezel, and ISO certification. At the same time, the MSRP of this watch was just about $300 (although we have seen the price of this line slowly fall over time). To many, this was less watch at a higher price, which has been a theme for Seiko as of late.Enter the Orient Kamasu. While the MSRP of this watch is $460, they are usually available for between $200 – $300. With a hacking and handwinding movement, 200 meters of water resistance, a screw-down crown, and a sapphire crystal, the Orient Kamasu is a killer value proposition that has all of the specifications many hoped for in the new 5XK line (perhaps falling only short of ISO certification)";
  const email = "paul@gmail.com";
  //Test image data.
  const itemData = [
    {
      img: 'https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review.jpg',
      title: 'Breakfast',
    },
    {
      img: 'https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-5-2048x1365.jpg.webp',
      title: 'Burger',
    },
    {
      img: 'https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-Wristshot.jpg.webp',
      title: 'Camera',
    },
  ];
  return (
    <div className='card-container'>
        <h6 style={{color:'#2f415d',borderBottom:'5px solid', borderColor:'#2f415d'}}>MODEL: {model}</h6>
        <hr />
        {/* <img className="watch-images" src="https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review.jpg" alt="watch"/> */}
        <ImageList sx={{ width: 400, height: 300 }} cols={2} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
        <hr />
        <h6 style={{fontStyle:'italic'}}>NAME: {name}</h6>
        <h6>$ {price}</h6>
        <h6 style={{fontSize: '15px'}}>Contact: {email}</h6>
        <p>{ref}</p>
        <p style={{maxWidth:'200px'}}>{desc}</p>
    </div>
  )
}

export default DisplayCard