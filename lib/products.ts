export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  image: string
  handle: string
}

// This is the source of truth for all products.
// All UI to display products should pull from this array.
// IDs passed to the checkout session should be the same as IDs from this array.
export const PRODUCTS: Product[] = [
  {
    id: "wireless-headphones",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    priceInCents: 29999, // $299.99
    image: "/premium-wireless-headphones-on-white-background-pr.jpg",
    handle: "wireless-headphones",
  },
  {
    id: "smart-watch",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch",
    priceInCents: 19999, // $199.99
    image: "/modern-smart-fitness-watch-black-product-photograp.jpg",
    handle: "smart-watch",
  },
  {
    id: "minimalist-backpack",
    name: "Minimalist Backpack",
    description: "Sleek and functional backpack for everyday use",
    priceInCents: 8999, // $89.99
    image: "/minimalist-black-backpack-product-photography-whit.jpg",
    handle: "minimalist-backpack",
  },
  {
    id: "wireless-charger",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for all your devices",
    priceInCents: 4999, // $49.99
    image: "/sleek-wireless-charging-pad-black-product-photogra.jpg",
    handle: "wireless-charger",
  },
  {
    id: "bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    description: "Premium sound quality in a compact design",
    priceInCents: 12999, // $129.99
    image: "/portable-bluetooth-speaker-black-product-photograp.jpg",
    handle: "bluetooth-speaker",
  },
  {
    id: "usb-c-hub",
    name: "USB-C Hub",
    description: "Expand your connectivity with multiple ports",
    priceInCents: 6999, // $69.99
    image: "/modern-usb-c-hub-aluminum-product-photography-whit.jpg",
    handle: "usb-c-hub",
  },
]
