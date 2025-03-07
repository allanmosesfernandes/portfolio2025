'use client';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
} from 'react-share';
import { useState, useRef, useEffect } from 'react';
import { ImFacebook } from 'react-icons/im';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialShareComponent = ({ shareURL, title, summary }) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleShareClick = async () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (navigator.share && isMobile) {
            try {
                await navigator.share({
                    title: title,
                    text: summary,
                    url: shareURL,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="cursor-pointer relative" onClick={handleShareClick} ref={modalRef}>
            <svg
                width="25px"
                height="25px"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 5.00006C3.22386 5.00006 3 5.22392 3 5.50006L3 11.5001C3 11.7762 3.22386 12.0001 3.5 12.0001L11.5 12.0001C11.7761 12.0001 12 11.7762 12 11.5001L12 5.50006C12 5.22392 11.7761 5.00006 11.5 5.00006L10.25 5.00006C9.97386 5.00006 9.75 4.7762 9.75 4.50006C9.75 4.22392 9.97386 4.00006 10.25 4.00006L11.5 4.00006C12.3284 4.00006 13 4.67163 13 5.50006L13 11.5001C13 12.3285 12.3284 13.0001 11.5 13.0001L3.5 13.0001C2.67157 13.0001 2 12.3285 2 11.5001L2 5.50006C2 4.67163 2.67157 4.00006 3.5 4.00006L4.75 4.00006C5.02614 4.00006 5.25 4.22392 5.25 4.50006C5.25 4.7762 5.02614 5.00006 4.75 5.00006L3.5 5.00006ZM7 1.6364L5.5682 3.0682C5.39246 3.24393 5.10754 3.24393 4.9318 3.0682C4.75607 2.89246 4.75607 2.60754 4.9318 2.4318L7.1818 0.181802C7.26619 0.09741 7.38065 0.049999 7.5 0.049999C7.61935 0.049999 7.73381 0.09741 7.8182 0.181802L10.0682 2.4318C10.2439 2.60754 10.2439 2.89246 10.0682 3.0682C9.89246 3.24393 9.60754 3.24393 9.4318 3.0682L8 1.6364L8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5L7 1.6364Z"
                    fill="currentColor"
                />
            </svg>
            {isOpen && (
                <div
                    ref={modalRef}
                    className="absolute top-10 left-0 bg-white dark:bg-gray-400 dark:text-white text-black p-2 rounded-lg shadow-lg"
                >
                    <ul className="flex flex-col gap-2 w-48 share-links-list">
                        <li>
                            <LinkedinShareButton url={shareURL}>
                                <FaLinkedinIn />
                                Share on Linkedin
                            </LinkedinShareButton>
                        </li>
                        <li>
                            <FacebookShareButton url={shareURL}>
                                <ImFacebook />
                                Share on Facebook
                            </FacebookShareButton>
                        </li>
                        <li>
                            <TwitterShareButton url={shareURL}>
                                <FaXTwitter />
                                Share on Twitter
                            </TwitterShareButton>
                        </li>
                        <li>
                            <WhatsappShareButton url={shareURL}>
                                <FaWhatsapp />
                                Share on Whatsapp
                            </WhatsappShareButton>
                        </li>
                    </ul>{' '}
                </div>
            )}
        </div>
    );
};

export default SocialShareComponent;
