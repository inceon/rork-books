import { Avatar, Button, Select } from "antd";
import { useAuth } from "../../hooks/useAuth";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import BookComponent from "../../components/Book/Book.component";
import { Snapshot, Marathon, Book, Status } from "../../types/snapshot";
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { apiService } from "../../services/apiService";

function Home() {
  enum SortByEnum {
    TITLE = "title",
    COMPLETED = "completed",
    AUTHOR = "author",
    RATING = "rating",
  };
  const { user } = useAuth();
  const [snapshot, setSnapshot] = useState<Snapshot>();
  const [marafon, setMarafon] = useState<Marathon[]>();
  const [sortBy, setSortBy] = useState<SortByEnum>(SortByEnum.COMPLETED);
  const [filterBy, setFilterBy] = useState<string | undefined>();
  const [order, setOrder] = useState("asc");

  const compareFunction = {
    [SortByEnum.TITLE]: (a: Book, b: Book) => {
      const aRes = a.title.toLowerCase();
      const bRes = b.title.toLowerCase();
      return order === "asc"
        ? aRes.localeCompare(bRes)
        : bRes.localeCompare(aRes);
    },
    [SortByEnum.AUTHOR]: (a: Book, b: Book) => {
      const aRes = a.author.toLowerCase();
      const bRes = b.author.toLowerCase();
      return order === "asc"
        ? aRes.localeCompare(bRes)
        : bRes.localeCompare(aRes);
    },
    [SortByEnum.RATING]: (a: Book, b: Book) => {
      const aRes = Number(marafon?.find((m) => m.book_uid === a.uid)?.rating);
      const bRes = Number(marafon?.find((m) => m.book_uid === b.uid)?.rating);
      return order === "asc" ? aRes - bRes : bRes - aRes;
    },
    [SortByEnum.COMPLETED]: (a: Book, b: Book) => {
      const aRes = Number(
        marafon?.find((m) => m.book_uid === a.uid)?.status === Status.READED
      );
      const bRes = Number(
        marafon?.find((m) => m.book_uid === b.uid)?.status === Status.READED
      );
      return order === "asc" ? aRes - bRes : bRes - aRes;
    },
  };

  useEffect(() => {
    apiService.get('/rork/sync/snapshot?uiVersion=11.1')
      .then(res => res.data)
      .then((data) => {
        setSnapshot(data);
        setMarafon(data.data.marafon);
      });
  }, []);

  return (
    <>
      <div className={style.topPanel}>
          <div className={style.userArea}>
            <Avatar
              src={user?.avatar.replace("SIZE", "200x200")}
              size={40}
            ></Avatar>
            {user?.name}
          </div>
          
        <div className={style.sortArea}>
          <Select 
            placeholder="Sort by"
            value={sortBy}
            style={{ width: 150 }}
            onChange={(value) => setSortBy(value)}
            options={[{
              label: <span>Sort by</span>,
              title: 'Sort by',
              options: Object.keys(SortByEnum).map((sort) => ({
                value: SortByEnum[sort as keyof typeof SortByEnum],
                label: sort.split("_").join(" "),
              }))
            }]}
          />

          <Button
            className={style.sortDirection}
            onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          >
            {order === "asc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Button>
          <Select
            placeholder="Filter by"
            style={{ width: 150 }}
            defaultValue=""
            value={filterBy}
            onChange={(value) => setFilterBy(value)}
            options={
              [{
                label: <span>Filter by</span>,
                title: 'Filter by',
                options: Object.keys(Status).map((status) => ({
                  value: Status[status as keyof typeof Status],
                  label: status.split("_").join(" "),
                }))
              }]
            }
          />
        </div>
      </div>
      <div className={style.library}>
        {snapshot?.data.books
          .sort(compareFunction[sortBy])
          .filter((book) => {
            if (filterBy) {
              return (
                marafon?.find((m) => m.book_uid === book.uid)?.status ==
                filterBy
              );
            }
            return true;
          })
          .map((bookData, index: number) => {
            return (
              <BookComponent
                src={bookData.catalog_image.replace("SIZE", "300x480")}
                title={bookData.title}
                completed={
                  marafon?.find((m) => m.book_uid === bookData.uid)?.status ==
                  Status.READED
                }
                rating={marafon?.find((m) => m.book_uid === bookData.uid)
                  ?.rating}
                key={index}
              />
            );
          })}
      </div>
    </>
  );
}

export default Home;
