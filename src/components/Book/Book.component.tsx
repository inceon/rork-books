import style from "./Book.module.css";

interface BookComponentProps {
	src: string,
	title?: string,
	completed?: boolean,
	rating?: string,
	onClick?: () => void,
	side?: "right" | "left"
}

function BookComponent({src, title, completed, rating, onClick, side}: BookComponentProps) {
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
				{side === "left" && <div className={style.bookOutside}></div>}
			</div>
			{completed &&
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
