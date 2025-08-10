import Image from 'next/image';

const page = () => {
    return (
        <>
            <h2 className="text-black dark:text-white font-bold sm:text-5xl text-3xl flex justify-center text-center mx-auto mb-4">
                Goalazooo!
            </h2>
            <p className="text-pretty text-black dark:text-white md:text-lg text-center mb-4">
                Pretty sure my life peaked right here.
            </p>
            {/* Video */}
            <div className="video-frame">
                <video src="/video/golazo.mp4" controls muted playsInline />
            </div>
            {/* <Image src="/giphy.gif" width={300} alt="Gif" height={300} className="mx-auto my-8" />
            <div className="my-10"></div> */}
        </>
    );
};

export default page;
