import { IBlockswebComponent } from "@blocksweb/core";
import ProductLister from "./ProductLister";

// Define the type for a single product, including an image URL
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type ProductListerProps = {
  children?: React.ReactNode;
  LeftComponent?: React.ReactElement;
  background: string;
};

// Define the ProductLister component with inline mocked products including real names and images
const LayoutComponent: IBlockswebComponent = ({
  children,
  LeftComponent,
  background,
}: ProductListerProps) => {
  // Updated products array with real product names and image URLs from Unsplash

  if (!LeftComponent)
    return (
      <div
        style={{
          background,
        }}
      >
        NO LEFT COMPONENT
      </div>
    );
  return (
    <div className="">
      {/* @ts-ignore */}
      <LeftComponent />
    </div>
  );
};

LayoutComponent.data = {
  displayName: "LayoutComponent",
  droppable: true,
  editable: true,
  traits: [
    {
      type: "component",
      label: "Left Component",
      name: "LeftComponent",
    },
  ],
};

export default LayoutComponent;
