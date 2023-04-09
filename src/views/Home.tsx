import { Carousel } from "flowbite-react";
// import type { CarouselItem, CarouselOptions, CarouselInterface } from "flowbite";
// import * as React from "react";

export default function Home() {
    const Car1 = require('../assets/001.png');
    const Car2 = require('../assets/002.png');
    const Car3 = require('../assets/003.png');
    const Car4 = require('../assets/004.png');
    const Car5 = require('../assets/005.png');

    return (
        <>
            <div className="text-center mt-10 w-2/3 lg:w-2/6 mx-auto mb-3 md:mb-5 lg:mb-10">
                <p className="text-xl font-nasalization mb-1 text-cyan-400">SPACE NEWS</p>
                <p>Up-to-date news, eye-opening blog posts and detailed reports for those,
                    who want to witness the ground-breaking developments in space activities of humankind. </p>
            </div>
            <div className="saturate-50 h-3/5 w-4/5 md:h-2/4 md:w-2/3 mx-auto">
                <Carousel slideInterval={3000}>
                    <img src={Car1} alt="Image1" />
                    <img src={Car2} alt="Image2" />
                    <img src={Car3} alt="Image3" />
                    <img src={Car5} alt="Image5" />
                    <img src={Car4} alt="Image4" />
                </Carousel>
            </div >
        </>
    );
}
