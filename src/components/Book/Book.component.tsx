import style from "./Book.module.css";

interface BookComponentProps {
	src: string,
	title?: string,
	completed?: boolean,
	rating?: string,
	onClick?: () => void
}

function BookComponent({src, title, completed, rating, onClick}: BookComponentProps) {
	return <div className={style.bookItems} onClick={onClick}>
		<div className={style.mainBookWrap}>
			<div className={style.bookCover}>
				<div className={style.bookInside}></div>
				<div className={style.bookImage}>
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
