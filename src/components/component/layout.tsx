import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";

export default function Layout(props: React.PropsWithChildren<{}>) {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const currentUri = useRouter().asPath.split("/")[3];

  return (
    <div
      key="1"
      className="grid w-full min-h-screen overflow-hidden sm:grid-cols-[280px_1fr] lg:grid-rows-1"
    >
      <div
        className={`border-r bg-[#0f766e] ${isMobile ? "hidden" : "lg:block"}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link
              className="flex items-center gap-2 font-semibold text-white"
              href="#"
            >
              <Package2Icon className="h-6 w-6 fill-white" />
              <span className="">Blocksweb</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium text-white">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:underline"
                href="#"
              >
                <HomeIcon className="h-4 w-4 fill-white" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:underline"
                href="products"
              >
                <PackageIcon className="h-4 w-4 fill-white" />
                Products{" "}
                {currentUri === "products" ? <div>selected</div> : null}
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all underline border-b-2 border-white"
                href="orders"
              >
                <ShoppingCartIcon className="h-4 w-4 fill-white" />
                Orders
                {currentUri === "orders" ? <div>selected</div> : null}
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e]">
                  12
                </Badge>
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:underline"
                href="customers"
              >
                <UsersIcon className="h-4 w-4 fill-white" />
                Customers
                {currentUri === "customers" ? <div>selected</div> : null}
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:underline"
                href="analytics"
              >
                <LineChartIcon className="h-4 w-4 fill-white" />
                Analytics
                {currentUri === "analytics" ? <div>selected</div> : null}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
        {props.children}
      </div>
    </div>
  );
}

const MobileHeader = () => {
  const currentUri = useRouter().asPath;

  return (
    <header className="flex h-[60px] items-center gap-4 border-b bg-[#0f766e] px-6 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6 fill-white" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-xs">
                <div className="font-medium">Jared Palmer</div>
                <div className="text-gray-500 dark:text-gray-400">
                  example@acme.inc
                </div>
              </div>
            </div>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold text-black"
              href="#"
            >
              <UserIcon className="h-4 w-4 fill-black mr-3" />
              My Account
            </Link>
            <Button className="w-full" variant="outline">
              <LogOutIcon className="h-4 w-4 fill-black mr-3" />
              Logout
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-2 py-6">
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold text-black"
              href="#"
            >
              <HomeIcon className="h-4 w-4 fill-black mr-3" />
              Home
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold text-black"
              href="products"
            >
              <PackageIcon className="h-4 w-4 fill-black mr-3" />
              Products {currentUri === "/products" ? <div>selected</div> : null}
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold text-black"
              href="orders"
            >
              <ShoppingCartIcon className="h-4 w-4 fill-black mr-3" />
              Orders {currentUri === "/orders" ? <div>selected</div> : null}
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e]">
                12
              </Badge>
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold text-black"
              href="#"
            >
              <UsersIcon className="h-4 w-4 fill-black mr-3" />
              Customers
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold text-black"
              href="#"
            >
              <LineChartIcon className="h-4 w-4 fill-black mr-3" />
              Analytics
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

const DesktopHeader = () => {
  return (
    <header className="h-[60px] items-center gap-4 border-b bg-[#0f766e] px-6 lg:flex">
      <Link className="lg:hidden" href="#">
        <Package2Icon className="h-6 w-6 fill-white" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 fill-white" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
              placeholder="Search orders..."
              type="search"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border border-white w-8 h-8"
            size="icon"
            variant="ghost"
          >
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LineChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
