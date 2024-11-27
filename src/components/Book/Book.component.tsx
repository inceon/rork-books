import style from "./Book.module.css";
import { useState, useEffect } from "react";

const getAverageColor = (img: HTMLImageElement): [number, number, number] => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return [255, 255, 255];

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let r = 0, g = 0, b = 0;
    const pixelCount = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);

    return [r, g, b];
};

const darkenColor = (r: number, g: number, b: number, factor: number): string => {
    const darkenAmount = 0.7; // Adjust this value to control how dark the edges become
    const newR = Math.round(r * (1 - (factor * darkenAmount)));
    const newG = Math.round(g * (1 - (factor * darkenAmount)));
    const newB = Math.round(b * (1 - (factor * darkenAmount)));
    return `rgb(${newR}, ${newG}, ${newB})`;
};

interface BookComponentProps {
    src: string,
    title?: string,
    completed?: boolean,
    rating?: string,
    onClick?: () => void,
    side?: "right" | "left"
}

function BookComponent({src, title, completed, rating, onClick, side}: BookComponentProps) {
    const [bgGradient, setBgGradient] = useState("linear-gradient(90deg, white, white, white)");

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const [r, g, b] = getAverageColor(img);
                const mainColor = `rgb(${r}, ${g}, ${b})`;
                const darkerColor = darkenColor(r, g, b, .4);
                setBgGradient(`linear-gradient(90deg, 
                    ${darkerColor} 0%, 
                    ${mainColor} 50%, 
                    ${darkerColor} 96%,
					rgba(0, 0, 0, 0)
                )`);
            };
            img.src = src;
        }
    }, [src]);

    return <div className={style.bookItems} onClick={onClick} style={{
        width: side === "right" ? "200px" : "60px"
    }}>
        <div className={style.mainBookWrap}>
            <div className={style.bookCover}>
                {side === "right" && <div className={style.bookInside}></div>}
                <div className={style.bookImage} style={{
                    transform: side === "right" ? "perspective(2000px) rotateY(-15deg) translateX(-10px) scaleX(0.94)" : "perspective(2000px) rotateY(75deg) translateX(10px) scaleX(0.94)",
                }}>
                    {
                        src ?
                        <img src={src} alt={title}/> :
                        <div className={style.tempImage}>
                            {title}
                        </div>
                    }
                    <div className={style.effect}></div>
                    <div className={style.light}></div>
                </div>
                {side === "left" && <div className={style.bookOutside} style={{
                    background: bgGradient,
                }}></div>}
            </div>
            {completed && side === "right" &&
                <div className={style.completedMark}>
                    <div className={style.rating}>
                        {rating}
                    </div>✅
                </div>
            }
        </div>
    </div>;
}

export default BookComponent;
