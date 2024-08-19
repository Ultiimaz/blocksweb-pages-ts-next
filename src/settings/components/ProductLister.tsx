import { ProductList } from "@/components/component/product-list";

// Define the type for a single product, including an image URL
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ProductListerProps = {
  background: string;
  title: string;
  products: {
    product_name: string;
    product_description: string;
  }[];
  children?: React.ReactNode;
};

type BlockswebComponent = {
  (props: ProductListerProps): BlockswebComponent;
  data: {
    displayName: string;
    droppable: boolean;
    editable: boolean;
    traits: {
      type: string;
      label: string;
      name: string;
    }[];
  };
};

// Define the ProductLister component with inline mocked products including real names and images
const ProductLister = (props: ProductListerProps) => {
  // Updated products array with real product names and image URLs from Unsplash

  return (
    <div
      style={{
        background: props.background,
      }}
    >
      <ProductList
        products={props.products}
        background={props.background}
        title={props.title}
      />
      {props.children}
    </div>
  );
};

ProductLister.data = {
  displayName: "ProductLister",
  droppable: true,
  editable: true,
  traits: [
    {
      type: "cms-single",
      label: "Products",
      name: "products",
      default: [],
    },
    {
      type: "text",
      label: "Title",
      name: "title",
      default: "Our Products",
    },
    {
      type: "color",
      label: "Background",
      name: "background",
      default: "#f5f5f5",
    },
  ],
};

export default ProductLister;
