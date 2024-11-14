export type UserProject = {
  id: string;
  project_id: string;
  name: string;
  ui_color: string;
  ui_icon: string;
  subscription_active: string;
  created_at: string;
  updated_at: string;
};

export type LastSubscription = {
  id: string;
  type: string;
  user_id: string;
  amount: string;
  active: string;
  status: string;
  user_project_id: string;
  next_billing_date: string;
  last_billing_date: string;
  last_billing_status: string;
  created_at: string;
  updated_at: string;
};

export type Book = {
  id: string;
  uid: string;
  title: string;
  subtitle: string;
  author: string;
  image: string;
  status: string;
  position: string;
  recommendations: string;
  user_project_id: string;
  cover_color: string;
  privacy: string;
  created_at: string;
  updated_at: string;
  trash_id: string;
  catalog_book_id: string;
  catalog_image: string;
  creation_type: string;
  isbn_u: string;
  image_ratio: string;
  borrowed: string;
  lent: string;
};

export enum Status {
  DEFAULT = "",
  READING =  "1",
  STOP_BETWEEN_READING_SESSIONS = "2",
  READED = "3",
  WANT_TO_READ = "4",
  POSTPONED = "5",
  PAUSE_WHILE_READING = "6"
};

export type Marathon = {
  id: string;
  uid: string;
  book_id: string;
  book_uid: string;
  user_project_id: string;
  date_start: string;
  date_end: string;
  date_end_precision: string;
  date_updated: string;
  status: string;
  pages_total: string;
  progress: string;
  logged_progress: string;
  time_spent: string;
  time_left: string;
  created_at: string;
  updated_at: string;
  trash_id: string;
  rating: string;
  rating_system: string;
  rating_date_unix: string;
  catalog_book_id: string;
  privacy: string;
  mode: string;
  track: string;
  kind: string;
  review: string;
  review_date_unix: string;
  review_has_spoiler: string;
  cache_votes: string;
  cache_positive_votes: string;
  cache_updated_unix: string;
};

export type Progress = {
  id: string;
  uid: string;
  book_id: string;
  platform: string;
  page_start: string;
  page_end: string;
  pages_total: string;
  time_start: string;
  time_end: string;
  completed: string;
  user_project_id: string;
  marafon_id: string;
  marafon_uid: string;
  created_at: string;
  updated_at: string;
  trash_id: string;
  p_time: string;
};

export type Data = {
  user_project: UserProject;
  last_subscription: LastSubscription;
  books: Book[];
  marafon: Marathon[];
  collections: any[];
  progress: Progress[];
  collections__books: any[];
  notes: any[];
  pause: any[];
};

export type Snapshot = {
  status: string;
  errorCode: string;
  data: Data;
  serverTime: number;
};

