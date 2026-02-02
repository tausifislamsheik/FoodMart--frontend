import { Button } from "@/components/ui/button";
import { providerService } from "@/services/provider.service";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";

interface Provider {
  id: string;
  restaurantName: string;
  address: string;
  logo?: string | null;
  orders?: any[];
}

export default async function PopularMealsProviderSection() {
  const providersRes = await providerService.getAllProviders();
  const providers: Provider[] = providersRes.data || [];

  // sort by order count
  const sortedProviders = [...providers].sort(
    (a, b) => (b.orders?.length || 0) - (a.orders?.length || 0),
  );

  return (
    <section className="max-w-400 mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Popular Providers</h2>
        <Link href="/providers">
          <Button
            variant="default"
            className="inline-flex items-center gap-2 px-8 py-4 text-orange-500-foreground font-semibold rounded-sm hover:bg-text-orange-500 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-6xl hover:shadow-orange-100 hover:-translate-y-0.5 bg-orange-500 text-white cursor-pointer outline"
          >
            See All Providers
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </Link>
      </div>

      {/* Providers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProviders.slice(0, 4).map((provider) => (
          <Card
            key={provider.id}
            className="hover:shadow-lg transition border pt-0"
          >
            <CardHeader className="p-0">
              <div className="relative h-40 w-full bg-muted">
                <Image
                  src={provider.logo || "./globe.svg"}
                  alt={provider.restaurantName}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-1">
              <h3 className="text-lg font-semibold">
                {provider.restaurantName}
              </h3>

              <p className="text-sm text-muted-foreground">
                {provider.address}
              </p>

              <p className="text-sm mt-2">
                Orders:{" "}
                <span className="font-semibold text-orange-600">
                  {provider.orders?.length || 0}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
















// "use client";

// import { useState, useEffect } from "react";
// import { ArrowRight, MapPin, ShoppingBag } from "lucide-react";
// import Link from "next/link";

// // ── Mock data (replace with your actual async fetch) ──
// const mockProviders = [
//   {
//     id: "1",
//     restaurantName: "Pizza Express",
//     address: "123 Main Street, Dhaka",
//     logo: null,
//     orders: Array(247),
//     cuisine: "Italian",
//     emoji: "🍕",
//   },
//   {
//     id: "2",
//     restaurantName: "Fresh Garden",
//     address: "45 Green Lane, Chittagong",
//     logo: null,
//     orders: Array(189),
//     cuisine: "Healthy",
//     emoji: "🥗",
//   },
//   {
//     id: "3",
//     restaurantName: "Sushi Palace",
//     address: "78 Ocean Road, Sylhet",
//     logo: null,
//     orders: Array(156),
//     cuisine: "Japanese",
//     emoji: "🍣",
//   },
//   {
//     id: "4",
//     restaurantName: "Burger Barn",
//     address: "90 River View, Rajshahi",
//     logo: null,
//     orders: Array(134),
//     cuisine: "American",
//     emoji: "🍔",
//   },
// ];

// export default function PopularMealsProviderSection() {
//   const [width, setWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1024,
//   );
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [hoveredBtn, setHoveredBtn] = useState(false);

//   useEffect(() => {
//     const onResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const isMobile = width < 640;
//   const isTablet = width >= 640 && width < 1024;

//   // ── Palette ──
//   const accent = "#b5652a";
//   const accentHover = "#9a5222";
//   const accentLight = "#c47a3a";
//   const accentGlow = "rgba(181,101,42,0.18)";
//   const accentTint = "#faf4ee";
//   const accentTintMid = "#f2e4d4";

//   // sort by order count
//   const sorted = [...mockProviders].sort(
//     (a, b) => (b.orders?.length || 0) - (a.orders?.length || 0),
//   );
//   const displayed = sorted.slice(0, 4);

//   return (
//     <section
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         background: "#fff",
//         padding: isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 28px",
//         fontFamily: "'Georgia', serif",
//       }}
//     >
//       {/* ── Subtle top edge line ── */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: "10%",
//           right: "10%",
//           height: "1px",
//           background: `linear-gradient(to right, transparent, ${accentGlow}, transparent)`,
//         }}
//       />

//       {/* ── Ambient glow ── */}
//       <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
//         <div
//           style={{
//             position: "absolute",
//             top: "-200px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "600px",
//             height: "400px",
//             borderRadius: "50%",
//             background:
//               "radial-gradient(ellipse, rgba(181,101,42,0.04) 0%, transparent 70%)",
//           }}
//         />
//       </div>

//       {/* ── Inner ── */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           maxWidth: "1100px",
//           margin: "0 auto",
//         }}
//       >
//         {/* ── Header Row ── */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: isMobile ? "flex-start" : "center",
//             justifyContent: "space-between",
//             flexDirection: isMobile ? "column" : "row",
//             gap: isMobile ? "20px" : "0",
//             marginBottom: isMobile ? "36px" : "52px",
//           }}
//         >
//           {/* Left: badge + headline */}
//           <div>
//             {/* Badge */}
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 background: "rgba(181,101,42,0.08)",
//                 border: `1px solid rgba(181,101,42,0.22)`,
//                 borderRadius: "30px",
//                 padding: "6px 18px",
//                 marginBottom: "16px",
//               }}
//             >
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "7px",
//                   height: "7px",
//                   borderRadius: "50%",
//                   background: accent,
//                   boxShadow: `0 0 6px ${accentGlow}`,
//                 }}
//               />
//               <span
//                 style={{
//                   color: accent,
//                   fontSize: "11px",
//                   letterSpacing: "1.5px",
//                   textTransform: "uppercase",
//                   fontFamily: "'Helvetica Neue', sans-serif",
//                   fontWeight: 500,
//                 }}
//               >
//                 Top Rated
//               </span>
//             </div>

//             {/* Headline */}
//             <h2
//               style={{
//                 fontSize: isMobile ? "28px" : "38px",
//                 fontWeight: 400,
//                 color: "#1a1a1a",
//                 lineHeight: 1.2,
//                 letterSpacing: "-0.4px",
//                 margin: 0,
//               }}
//             >
//               Popular{" "}
//               <span style={{ color: accent, fontStyle: "italic" }}>
//                 Providers
//               </span>
//             </h2>
//           </div>

//           {/* CTA Button */}
//           <Link href={"/providers"}>
//             <button
//               onMouseEnter={() => setHoveredBtn(true)}
//               onMouseLeave={() => setHoveredBtn(false)}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 padding: isMobile ? "13px 24px" : "14px 30px",
//                 border: `1.5px solid ${hoveredBtn ? accent : "rgba(181,101,42,0.3)"}`,
//                 borderRadius: "50px",
//                 background: hoveredBtn
//                   ? "rgba(181,101,42,0.08)"
//                   : "rgba(181,101,42,0.04)",
//                 color: hoveredBtn ? accentLight : accentLight,
//                 fontSize: isMobile ? "13px" : "14px",
//                 fontFamily: "'Helvetica Neue', sans-serif",
//                 fontWeight: 600,
//                 letterSpacing: "0.4px",
//                 cursor: "pointer",
//                 transition: "all 0.25s ease",
//                 whiteSpace: "nowrap",
//                 flexShrink: 0,
//               }}
//             >
//               See All Providers
//               <ArrowRight
//                 size={16}
//                 style={{
//                   transform: hoveredBtn ? "translateX(3px)" : "translateX(0)",
//                   transition: "transform 0.25s ease",
//                 }}
//               />
//             </button>
//           </Link>
//         </div>

//         {/* ── Cards Grid ── */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: isMobile
//               ? "1fr"
//               : isTablet
//                 ? "1fr 1fr"
//                 : "1fr 1fr 1fr 1fr",
//             gap: isMobile ? "16px" : isTablet ? "20px" : "24px",
//           }}
//         >
//           {displayed.map((provider, index) => {
//             const isHov = hoveredCard === index;
//             return (
//               <div
//                 key={provider.id}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 style={{
//                   background: isHov ? "#fff" : "rgba(250,244,238,0.6)",
//                   border: `1px solid ${isHov ? "rgba(181,101,42,0.3)" : "rgba(0,0,0,0.07)"}`,
//                   borderRadius: "20px",
//                   overflow: "hidden",
//                   boxShadow: isHov
//                     ? "0 10px 36px rgba(181,101,42,0.15), 0 2px 8px rgba(0,0,0,0.06)"
//                     : "0 2px 10px rgba(0,0,0,0.04)",
//                   transform: isHov ? "translateY(-5px)" : "translateY(0)",
//                   transition: "all 0.3s ease",
//                   cursor: "pointer",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 {/* Logo / Image Area */}
//                 <div
//                   style={{
//                     position: "relative",
//                     height: isMobile ? "140px" : "160px",
//                     background: isHov
//                       ? `linear-gradient(135deg, ${accentTint}, ${accentTintMid})`
//                       : `linear-gradient(135deg, ${accentTintMid}, ${accentTint})`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     transition: "background 0.3s ease",
//                   }}
//                 >
//                   {/* Decorative ring */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       inset: "12px",
//                       borderRadius: "50%",
//                       border: `1px dashed rgba(181,101,42,${isHov ? "0.2" : "0.12"})`,
//                       transition: "border 0.3s ease",
//                     }}
//                   />

//                   {/* Emoji icon */}
//                   <div
//                     style={{
//                       position: "relative",
//                       zIndex: 1,
//                       width: isMobile ? "64px" : "72px",
//                       height: isMobile ? "64px" : "72px",
//                       borderRadius: "50%",
//                       background: "#fff",
//                       border: `2px solid rgba(181,101,42,${isHov ? "0.25" : "0.15"})`,
//                       boxShadow: isHov
//                         ? "0 4px 16px rgba(181,101,42,0.2)"
//                         : "0 2px 8px rgba(0,0,0,0.06)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: isMobile ? "28px" : "32px",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     {provider.emoji}
//                   </div>

//                   {/* Order count badge */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "14px",
//                       right: "14px",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "5px",
//                       background: "rgba(26,20,16,0.7)",
//                       backdropFilter: "blur(6px)",
//                       borderRadius: "20px",
//                       padding: "5px 10px",
//                       border: `1px solid rgba(181,101,42,0.2)`,
//                     }}
//                   >
//                     <ShoppingBag size={11} style={{ color: accentLight }} />
//                     <span
//                       style={{
//                         color: "#fff",
//                         fontSize: "11px",
//                         fontFamily: "'Helvetica Neue', sans-serif",
//                         fontWeight: 600,
//                         letterSpacing: "0.3px",
//                       }}
//                     >
//                       {provider.orders?.length || 0}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Info */}
//                 <div
//                   style={{
//                     padding: isMobile ? "18px 20px 20px" : "20px 22px 24px",
//                     flex: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "8px",
//                   }}
//                 >
//                   {/* Cuisine tag */}
//                   <span
//                     style={{
//                       display: "inline-block",
//                       width: "fit-content",
//                       fontSize: "10px",
//                       letterSpacing: "1.2px",
//                       textTransform: "uppercase",
//                       color: accent,
//                       fontFamily: "'Helvetica Neue', sans-serif",
//                       fontWeight: 600,
//                     }}
//                   >
//                     {provider.cuisine}
//                   </span>

//                   {/* Name */}
//                   <h3
//                     style={{
//                       fontSize: isMobile ? "16px" : "17px",
//                       fontWeight: 400,
//                       color: "#1a1a1a",
//                       margin: 0,
//                       letterSpacing: "-0.2px",
//                     }}
//                   >
//                     {provider.restaurantName}
//                   </h3>

//                   {/* Address */}
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "6px",
//                       marginTop: "auto",
//                     }}
//                   >
//                     <MapPin
//                       size={13}
//                       style={{ color: "#bbb", flexShrink: 0 }}
//                     />
//                     <span
//                       style={{
//                         fontSize: "13px",
//                         color: "#999",
//                         fontFamily: "'Helvetica Neue', sans-serif",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {provider.address}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
