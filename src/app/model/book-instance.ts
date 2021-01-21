export class BookInstance {
  id: string;
  book: {
    id: string;
    title: string;
  };
  imprint: string;
  status: string;
  due_back: Date;
}
