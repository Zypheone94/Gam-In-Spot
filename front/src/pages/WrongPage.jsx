import {Helmet} from "react-helmet";
import React from "react";

const WrongPage = () => {


    return (
        <>
            <Helmet>
                <title>Error 404 | Gam'in-Spot</title>
                <meta name="description" content="Browse our e-commerce website for an extensive collection of video
                games. Find the perfect game on our product page, featuring top-rated titles and unbeatable deals. About
                this game"  />
                <meta name="keywords" content="videogames gaming games game retro retrogaming" />
                <meta name="robots" content="index, follow" />
            </Helmet>
        <div className='flex flex-col items-center justify-center min-h-[60vh] xl:min-h-[45vh]'>
            <h3 className="text-pink text-7xl">404</h3>
            <p>Il semblerait que votre page n'existe pas</p>
        </div>
        </>

    )
}

export default WrongPage