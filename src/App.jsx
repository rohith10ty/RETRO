import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import HeroRetro from "./components/HeroRetro";
import ShoeSelector from "./components/selector/ShoeSelector";
import FeaturedArchive from "./components/FeaturedArchive";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FooterRetro from "./components/FooterRetro";
import GlobalPagination from "./components/GlobalPagination";
import SearchModal from "./components/SearchModal";
import BagDrawer from "./components/BagDrawer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShoeFocused, setIsShoeFocused] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: "shoe-065",
      title: "Air Jordan 4 Retro 'Fire Red'",
      price: "₹24,995",
      priceRaw: 24995,
      image_url: "/shoes/shoe-065.png",
      quantity: 1,
    },
  ]);

  const addToCart = (shoe) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === shoe.id);
      if (existing) {
        return prev.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: shoe.id || `shoe-${Date.now()}`,
          title: shoe.title || shoe.name,
          price: shoe.price,
          priceRaw:
            shoe.priceRaw ||
            parseInt(String(shoe.price).replace(/[^0-9]/g, "")) ||
            14995,
          image_url: shoe.image_url || shoe.image,
          quantity: 1,
        },
      ];
    });
    setIsBagOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const lenisRef = React.useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Preloader Scroll Lock & Isolation
  useEffect(() => {
    if (!isLoaded) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      if (lenisRef.current) lenisRef.current.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const preventDefaultScroll = (e) => {
        e.preventDefault();
      };

      const preventKeys = (e) => {
        if (
          ["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(
            e.code
          )
        ) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", preventDefaultScroll, { passive: false });
      window.addEventListener("touchmove", preventDefaultScroll, { passive: false });
      window.addEventListener("keydown", preventKeys, { passive: false });

      return () => {
        window.removeEventListener("wheel", preventDefaultScroll);
        window.removeEventListener("touchmove", preventDefaultScroll);
        window.removeEventListener("keydown", preventKeys);
      };
    } else {
      // Once loaded, restore document overflow once
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [isLoaded]);

  // Handle focus mode: snap to Section 02 and lock scrolling to isolate 3D shoe inspection
  useEffect(() => {
    if (!isLoaded) return;
    if (isShoeFocused) {
      const selectorElem = document.getElementById("selector");
      if (selectorElem) {
        window.scrollTo(0, selectorElem.offsetTop);
        document.documentElement.scrollTop = selectorElem.offsetTop;
        document.body.scrollTop = selectorElem.offsetTop;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(selectorElem, { immediate: true });
          lenisRef.current.stop();
        } else {
          selectorElem.scrollIntoView({ behavior: "instant", block: "start" });
        }
      }
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [isLoaded, isShoeFocused]);

  return (
    <div
      className={`relative w-full min-h-screen bg-[#e0e2db] text-[#141414] selection:bg-[#141414] selection:text-white font-sans ${
        !isLoaded ? "h-screen max-h-screen overflow-hidden" : "overflow-x-hidden"
      }`}
    >
      {/* High-Fashion Luxury Navigation */}
      <Navbar
        isLoaded={isLoaded}
        isFocusMode={isShoeFocused}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBag={() => setIsBagOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Global Right-Side Fixed Vertical Pagination (Only visible after preloader) */}
      <GlobalPagination isLoaded={isLoaded} isFocusMode={isShoeFocused} />

      {/* Main Content */}
      <main className="w-full">
        {/* Section 01: Master Editorial Hero */}
        <section id="hero" className="w-full">
          <HeroRetro onLoaded={() => setIsLoaded(true)} />
        </section>

        {/* Section 02: 3D Interactive Shoe Selector (Curved Sphere Grid) */}
        <ShoeSelector
          onFocusChange={setIsShoeFocused}
          onAddToCart={addToCart}
        />

        {/* Section 03: The Curated Vault Archive (36 Pieces) */}
        <FeaturedArchive onAddToCart={addToCart} />

        {/* Section 04: About & Archival Heritage */}
        <AboutSection />

        {/* Section 05: Private Concierge & Sourcing Inquiries */}
        <ContactSection />
      </main>

      {/* High-End Luxury Footer */}
      <FooterRetro />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onAddToCart={addToCart}
      />

      {/* Shopping Bag Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
    </div>
  );
}
