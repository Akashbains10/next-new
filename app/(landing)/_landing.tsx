import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import img1 from '@/assets/carousel7.avif';
import img2 from '@/assets/carousel8.jpg';
import img3 from '@/assets/carousel3.avif';
import img4 from '@/assets/carousel4.avif';
import img5 from '@/assets/carousel5.avif';
import Image from 'next/image';

export default function Landing() {

    const imagesArr = [img1, img2, img3, img4, img5]

    return (
        <>
            <div className='landing-container'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >

                    {imagesArr.map((i, index) => (
                        <SwiperSlide key={index}>
                            <Image src={i} alt='landing-page' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}