import React from 'react'


export default (props) => {
  return (
    <div className="swiper-container live-banner">
      <div className="swiper-wrapper">
        {/* <div className="swiper-slide">slider1</div>
                <div className="swiper-slide">slider2</div>
                <div className="swiper-slide">slider3</div> */}
              
        {props.bannerList && props.bannerList.map(item => {
          return (
            <div
              referrer="no-referrer|origin|unsafe-url"
              key={item.id}
              className="swiper-slide"
            >
              <img  src={item.pic} alt={item.name} />
            </div>
          );
        })}
      </div>
    </div>
  )
}

