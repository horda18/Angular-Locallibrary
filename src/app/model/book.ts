export class Book {
  id: string;
  title: string;
  author: {
    id:string;
  };
  summary: string;
  isbn: string;
  genre: {
    id: string;
    name: string;
  };
}
