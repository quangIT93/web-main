export interface TypeCategories {
  parent_category_id: number;
  parent_category: string;
  image: string;
  childs: childCate[];
}

interface childCate {
  id: number;
  name: string;
}
