export interface IDataTiktok {
  title: string; // Kiểu dữ liệu của 'title' là string
  urlImg: string; // Kiểu dữ liệu của 'url' là string
  urlVideo: string;
}

export default class MyClass {
  data: IDataTiktok[]; // Kiểu dữ liệu của 'data' là một mảng các IDataTiktok

  constructor(dataTiktok: IDataTiktok[]) {
    this.data = dataTiktok;
  }
}
