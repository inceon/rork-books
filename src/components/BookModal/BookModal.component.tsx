import { Modal } from "antd";
import style from "./BookModal.module.css";
import { Book, BookInfo } from "../../types/snapshot";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";

function BookModal({
  isOpen,
  setOpen,
  selectedBook,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  selectedBook: Book | undefined;
}) {
  const [bookInfo, setBookInfo] = useState<BookInfo>();
  useEffect(() => {
    if (selectedBook) {
      apiService
        .get(`/rork/catalog/book/${selectedBook.catalog_book_id}/`)
        .then((res) => res.data)
        .then((data) => setBookInfo(data));
    }
  }, [selectedBook]);
  return (
    <>
      <Modal
        title={bookInfo?.title}
        centered
        open={isOpen}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
        closable
      >
        <div className={style.bookModal}>
          {bookInfo && (
            <>
              <div className={style.bookModalImage}>
                <img
                  src={
                    bookInfo.gr_image_url == ""
                      ? bookInfo.image.replace("SIZE", "300x480")
                      : bookInfo.gr_image_url
                  }
                  alt={bookInfo.title}
                />
              </div>
              <div className={style.bookModalInfo}>
                <div className={style.bookModalAuthor}>{bookInfo.author}</div>
                <div className={style.bookModalDescription}>
                  {bookInfo.description}
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default BookModal;
