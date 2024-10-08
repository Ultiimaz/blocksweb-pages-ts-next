import { IBlockswebComponent } from "@blocksweb/core";

// Define the type for a single product, including an image URL
export type ProductListerProps = {
  background: string;
  title: string;
  products: {
    product_name: string;
    product_description: string;
  }[];
  children?: React.ReactNode;
};

// Define the ProductLister component with inline mocked products including real names and images
const ProductLister: IBlockswebComponent = (props: ProductListerProps) => {
  // Updated products array with real product names and image URLs from Unsplash

  return (
    <div
      style={{
        background: props.background,
      }}
    >
      <h2>{props.title}</h2>
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
      type: "library-single",
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
