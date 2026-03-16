import Image from 'next/image';

const page = () => {
    return (
        <div className="px-6 md:px-12 lg:px-16 py-section max-w-[800px] mx-auto">
            <h2 className="font-display text-display-lg text-paper text-center mb-4">
                Goalazooo!
            </h2>
            <p className="text-muted-light text-lg text-center mb-8">
                Pretty sure my life peaked right here.
            </p>
            <div className="rounded-card overflow-hidden border border-ink-mid">
                <video src="/video/golazo.mp4" controls muted playsInline className="w-full" />
            </div>
        </div>
    );
};

export default page;
