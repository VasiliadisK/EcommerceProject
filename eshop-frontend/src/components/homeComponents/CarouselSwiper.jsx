import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom'

export default function CarouselSwiper({carouselSlides}){
    return(
        <div className='py-2 rounded-md h-96 sm:h-125'>
            <Swiper grabCursor = {true} 
                    autoplay={{
                        delay:4000,
                        disableOnInteraction:false,
                    }}
                    navigation
                    modules={[Pagination, EffectFade, Navigation, Autoplay]}
                    pagination={{clickable:true}}
                    scrollbar= {{draggable: true}}
                    slidesPerView={1}>
                    {carouselSlides.map((item,i) => {
                        return <SwiperSlide key={i}>
                            <div className={`carousel-item rounded-md sm:h-150 h-96`} style={{
                                                                                            backgroundImage: `url(${item.image})`,
                                                                                            backgroundSize: 'cover',
                                                                                            backgroundPosition: `${item.position || 'center'}`}}>
                                <div className='flex items-center justify-center h-full'>
                                    <div className='text-center'>
                                        <h3 className='text-xl sm:text-3xl text-white font-bold font-display' style={{ textShadow: '2px 2px 8px rgba(0,0,0,1)' }}>
                                            {item.title || ''}
                                        </h3>
                                        <h2 className='text-lg sm:text-5xl text-white font-bold mt-2 font-sans' style={{ textShadow: '2px 2px 8px rgba(0,0,0,1)' }}>
                                            {item.subtitle || ''}
                                        </h2>
                                        <p className='text-sm sm:text-base text-white font-bold mt-4 font-sans' style={{ textShadow: '2px 2px 8px rgba(0,0,0,1)' }}>
                                            {item.description || ''}
                                        </p>
                                        {item.redirection && item.buttonText && 
                                            <Link to={item.redirection || '/products'} className='font-sans mt-6 inline-block bg-brand text-white py-2 px-4 rounded hover:bg-brand-dark/90'>
                                                {item.buttonText}
                                            </Link>
                                        } 
                                    </div>
                                </div>
                                
                            </div>
                        </SwiperSlide>
                    })}
            </Swiper>
        </div>
    );
}