import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, ChevronDown, ChevronUp,
  Check, MapPin, Clock,
  Mail, Phone, Instagram, User, MessageCircle,
  Mic, Square, Send,
} from "lucide-react";
import { Toaster } from "sonner";
import "../styles/fonts.css";
import tuanAnhAvatar from "../assets/team/tuan-anh-new.jpg";
import tuanAnhPortrait from "../assets/team/tuan-anh-portrait-new.jpg";
import chauAnhPortrait from "../assets/team/chau-anh-portrait.jpg";
import chauAnhAvatar from "../assets/team/chau-anh-full.jpg";
import mekongSunsetBoat from "../assets/trips/mekong-sunset-boat.jpg";
import mekongBambooCanal from "../assets/trips/mekong-bamboo-canal.jpg";
import conDaoTurtleHatchlings from "../assets/trips/con-dao-turtle-hatchlings.jpg";
import conDaoPier from "../assets/trips/con-dao-pier.jpg";
import baoTranAvatar from "../assets/team/bao-tran-full.jpg";
import diThachAvatar from "../assets/team/di-thach-full.jpg";
import logo from "../assets/logo.png";

// ─── Typography constants ────────────────────────────────────────────────────
const F = "'Plus Jakarta Sans', system-ui, sans-serif";
const S = "'Plus Jakarta Sans', system-ui, sans-serif";

// ─── Data ───────────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: "Tuấn Anh",
    role: "Founder",
    region: "Hồ Chí Minh City",
    photo: tuanAnhAvatar,
  },
  {
    name: "Châu Anh",
    role: "Co-Founder",
    region: "",
    photo: chauAnhAvatar,
  },
  {
    name: "Bảo Trân",
    role: "Local team member",
    region: "Nha Trang",
    photo: baoTranAvatar,
  },
  {
    name: "Di Thạch",
    role: "Local team member",
    region: "Đà Lạt",
    photo: diThachAvatar,
  },
];

const ITINERARY_MEKONG = [
  {
    day: 1,
    location: "Cần Thơ",
    title: "Mùa Xuân reserve, then the city",
    note: "We meet you at the gate of Mùa Xuân Eco-Tourism Area — lunch first, then a sampan through the melaleuca forest and up the 25-metre viewing tower over the rice fields. You're checked into Y Hotel by evening; bánh xèo at Bánh Xèo 7 Tới and the riverfront walking street after. Early night — tomorrow starts at 04:45. — Tuấn Anh",
    photo: mekongBambooCanal,
  },
  {
    day: 2,
    location: "Cái Răng & Cồn Sơn",
    title: "The floating market before the traders leave",
    note: "Boat out at 05:00 to catch Cái Răng at its busiest hour, breakfast eaten the way the traders eat it — bún on the boat. Then across to Cồn Sơn: the floating fish farms, a cooking class that doubles as your lunch, and a hammock in the afternoon because you've been up since before dawn. — Tuấn Anh",
    photo: mekongSunsetBoat,
  },
  {
    day: 3,
    location: "Fly to Côn Đảo",
    title: "Straight off the plane and into the water",
    note: "Domestic flight Cần Thơ to Côn Đảo, then no time wasted — snorkelling over the reef the same afternoon, then across to Hòn Bảy Cạnh to settle into a tent before the park's turtle programme starts. This departure is fixed; the boat does not wait. — Tuấn Anh",
    photo: conDaoPier,
  },
  {
    day: 4,
    location: "Hòn Bảy Cạnh",
    title: "The night the turtles come ashore",
    note: "You wait on the beach with a park ranger — the hour is set by the tide, not by us, but across the season 95% of guests see it. Hatchlings go back to the sea at first light while the sand is still cool. Then back to Côn Đảo town for a proper shower and a nap. — Tuấn Anh",
    photo: conDaoTurtleHatchlings,
  },
  {
    day: 5,
    location: "Côn Đảo",
    title: "The island's finest beach, then the flight home",
    note: "Bãi Đầm Trầu in the late morning — planes come in low over the sand, it's worth timing your visit around one. In the afternoon, the old prison complex: Côn Đảo was a penal island for over a century, and it's a part of the country's history worth sitting with before you fly back. — Tuấn Anh",
    photo: conDaoPier,
  },
];

const ITINERARY_DALAT = [
  {
    day: 1,
    location: "Đà Lạt",
    title: "A slow arrival after the sleeper bus",
    note: "You land in Đà Lạt on the overnight bus and go straight to a quiet farmhouse homestay to rest and drink coffee before anything starts. Late morning is a scenic viewpoint over the pine forests and valleys, then an unhurried lunch at a garden restaurant. The afternoon is yours — a gentle walk or just the view from where you're staying — before sunset coffee over the hills and dinner at a cozy local spot. — Di Thạch",
    photo: "https://images.unsplash.com/photo-1552310065-aad9ebece999?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 2,
    location: "Đà Lạt countryside & Tuyền Lâm Lake",
    title: "Coffee farms and a lake with nowhere to be",
    note: "A short drive out to a coffee or tea plantation to see how highland Arabica is actually grown, then lunch at a family-run countryside restaurant. In the afternoon we take a boat out on Tuyền Lâm Lake and walk the shore — no schedule pushing you along. The evening is free: relax in town or find a quiet dinner on your own. — Di Thạch",
    photo: "https://images.unsplash.com/photo-1626608017817-211d7c48177d?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 3,
    location: "Đà Lạt",
    title: "The market, a pagoda, and one last coffee with a view",
    note: "Morning starts at Đà Lạt's local market to see the produce and the daily rhythm of the town, then a peaceful pagoda with mountain views. We stop at a scenic café overlooking the valley before an easy walk through a pine forest trail — nothing steep. Lunch before the sleeper bus back to Ho Chi Minh City, or onward if you're continuing the trip. — Di Thạch",
    photo: "https://images.unsplash.com/photo-1678099006439-dba9e4d3f9f5?w=400&h=400&fit=crop&auto=format",
  },
];

const ITINERARY_FOOD = [
  {
    day: 1,
    location: "Ho Chi Minh City",
    title: "First bites, no rush",
    note: "Straight from Tân Sơn Nhất to your hotel in District 1 — check in, freshen up, and let the city come to you rather than the other way round. A gentle evening food walk covers bánh mì, chè and street-side phở, finished with your first proper Vietnamese iced coffee at a pavement café. Nothing structured tonight — tomorrow is the real start. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 2,
    location: "Ho Chi Minh City",
    title: "Coffee culture by morning, backstreets by scooter at night",
    note: "From 9am we walk through Vietnamese café culture — phin-drip to egg coffee — then into a local wet market and past the Reunification Palace and Bến Thành. The afternoon is free; use it or rest. After dark, a xe ôm scooter tour through Saigon's backstreets for bánh xèo, bún bò Huế and hủ tiếu at the stalls locals actually queue for. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1748596161492-0ebbc90489a5?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 3,
    location: "Mekong Delta – Cần Thơ",
    title: "Into the delta, floating market and all",
    note: "About three hours south to Cần Thơ, timed for Cái Răng floating market while the boats are still loaded with fruit and vegetables. A canal ride through the waterways, an orchard stop for rambutan and dragon fruit straight off the tree, then an organic farm in the afternoon. You check into a riverside homestay on Cồn Sơn for a dinner of real Mekong specialities. — Tuấn Anh",
    photo: mekongBambooCanal,
  },
  {
    day: 4,
    location: "Cần Thơ → Hội An (via Đà Nẵng)",
    title: "One last boat ride, then north",
    note: "A relaxed final morning in the delta — one more boat ride or a walk through the farm — before the flight up to Đà Nẵng and on to Hội An by car. Check-in is at a boutique hotel just outside the Ancient Town. Keep the first evening loose: cao lầu, white rose dumplings, and a walk through the lantern-lit Old Town. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1761150285751-c593ab20159c?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 5,
    location: "Hội An",
    title: "Market to table — the cooking class day",
    note: "We start at the morning market with a local chef, choosing what you'll cook, then across to Trà Quế herb garden to see what makes Hội An's food taste the way it does. The hands-on class covers four or five dishes — bánh xèo, fresh spring rolls, cao lầu — and you sit down to eat what you made with rice wine. Recipe booklet included; the afternoon is yours for the Old Town, tailors or the Thu Bồn riverside. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1560733093-b31456d43374?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 6,
    location: "Hội An countryside",
    title: "Rice paddies by bicycle",
    note: "A morning ride out through rice paddies and rural villages to Cẩm Thanh's coconut forest for the traditional basket-boat spin. Trà Quế vegetable village is next — meet the farmers, get your hands in the garden — followed by a farm-to-table lunch from what's grown on site. Expect a seafood dinner by the Thu Bồn or on Cửa Đại beach to close out one of the best-looking days of the trip. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1579518030577-b4a62b368886?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 7,
    location: "Hải Vân Pass → Đà Nẵng",
    title: "The coast road, then Mì Quảng",
    note: "Mid-morning departure by private car over Hải Vân Pass — French-era bunkers, coastal cliffs, one of the country's best drives. We drop down to Lăng Cô lagoon for a seafood lunch by the water before continuing into Đà Nẵng, checking in near Mỹ Khê beach. In the evening: Mì Quảng, Đà Nẵng's own noodle, plus bánh xèo and skewers on the street. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1751842839568-285b1ffdbd15?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 8,
    location: "Đà Nẵng",
    title: "One last coffee before you fly",
    note: "A slow last morning — a final Vietnamese iced coffee, one more pass through the market if there's time — before the transfer to Đà Nẵng airport. Nothing scheduled after breakfast; we build the timing of the day around whatever flight takes you home. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1708776480405-7ae14fe1d4c4?w=400&h=400&fit=crop&auto=format",
  },
];

const ITINERARY_GRAND = [
  {
    day: 1,
    location: "Ho Chi Minh City",
    title: "Landing on Nguyễn Huệ, rooftop first night",
    note: "Fast-track through Tân Sơn Nhất and straight to your hotel in District 1 to settle in. The evening is an easy walk down Nguyễn Huệ and around Bến Thành to get your bearings, then a welcome dinner at a rooftop bar looking out over the city at night. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 2,
    location: "Ho Chi Minh City",
    title: "Palace, market alleys, and a street-side dinner",
    note: "A city highlights tour through Reunification Palace, the War Remnants Museum, Notre-Dame Cathedral and the Central Post Office, with breakfast served on the way. The afternoon is yours — shopping on Đồng Khởi or a spa session if you want it — before a guided street food walk through the alleys for bánh mì, phở and gỏi cuốn as dinner. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1748596161492-0ebbc90489a5?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 3,
    location: "Fly to Đà Lạt",
    title: "Cool air, family fun, and the night market",
    note: "A short flight up into Đà Lạt's cool air, then check-in at a boutique highland stay. The afternoon is built for the family — go-karts, the sliding hill, the puppy farm, the zoo or the flower gardens, pick what suits the day — before dinner at Đà Lạt's night market. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1552310065-aad9ebece999?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 4,
    location: "Đà Lạt",
    title: "Pine forest trails and a coffee farm view",
    note: "A morning trek through pine forest to Elephant or Datanla waterfall, then lunch at a coffee farm with sweeping views over the highlands and a full tasting session on how Arabica is grown at altitude. The afternoon has nothing scheduled — Đà Lạt's café culture, best known for cà phê chồn, is made for sitting still for a while. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1678099006439-dba9e4d3f9f5?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 5,
    location: "Fly to Đà Nẵng",
    title: "Christmas Eve on the Golden Bridge",
    note: "The flight to Đà Nẵng lands you beachfront on Mỹ Khê in time for a full day at Bà Nà Hills — the record-holding cable car, the Golden Bridge held up by giant stone hands, and the French Village at 1,400 metres. You're back on the beach for a festive dinner as the city lights up for Christmas Eve. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1611854064186-d8dccbccb031?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 6,
    location: "Đà Nẵng & Hội An",
    title: "Beach morning, lantern-lit afternoon",
    note: "Christmas morning is unhurried — Mỹ Khê beach right outside the hotel — before a scenic coastal drive to Hội An in the early afternoon. We walk the Ancient Town in the best light of the day, release lanterns on the Thu Bồn at dusk, and eat at Bánh Mì Phượng before heading back to Đà Nẵng for the night. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1708776480405-7ae14fe1d4c4?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 7,
    location: "Scenic train to Huế",
    title: "Over Hải Vân Pass by rail",
    note: "One of the great train rides in the country — Đà Nẵng to Huế via Hải Vân Pass, coastal cliffs and jungle the whole way. In Huế, the afternoon is the Imperial City: the Citadel, the Forbidden Purple City, the Flag Tower and Noon Gate, then a proper Huế royal-cuisine dinner to match the history. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1751842839568-285b1ffdbd15?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 8,
    location: "Huế",
    title: "Royal tombs and the Perfume River",
    note: "A private tour of the tombs of Khải Định and Minh Mạng — one all ornament, the other all quiet garden — then a boat along the Perfume River to Thiên Mụ Pagoda. The afternoon is free for Đông Ba Market and Huế souvenirs before a farewell dinner served the traditional way, in many small courses. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1568775791746-bcc117bcb312?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 9,
    location: "Fly to Ho Chi Minh City",
    title: "One last night, one last round of shopping",
    note: "The flight back to Ho Chi Minh City lands you with the afternoon free for last-minute shopping around Đồng Khởi and Bến Thành, then a farewell dinner to close out the trip properly on your final night. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 10,
    location: "Departure",
    title: "Fast-track to the airport, and home",
    note: "An early breakfast, then our fast-track service meets you at the hotel lobby for stress-free check-in, security and immigration. Ten days across four cities — thank you for having us along for it. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1748271151446-0013c0bc7061?w=400&h=400&fit=crop&auto=format",
  },
];

const ITINERARY_HAGIANG = [
  {
    day: 1,
    location: "Hanoi",
    title: "Arrival & a slow introduction to the Old Quarter",
    note: "Airport pick-up straight to a small hotel in the Old Quarter — time to rest and shower after the flight before anything starts. Late afternoon is a walk through the tube houses and trades that still name the streets, an egg coffee break at a working local café, and sunset by Hoan Kiem Lake. A welcome dinner of northern home cooking closes out the day, one short walk from the hotel. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1611195328596-d8dcf57f5cea?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 2,
    location: "Hanoi",
    title: "Culture at a gentle pace",
    note: "Morning at the Temple of Literature, early enough to beat the school groups, then coffee in the shade of the courtyard trees. After lunch in Ba Dinh, the Museum of Ethnology gives you real context for the hill communities you'll meet later in Ha Giang. The late afternoon is free — a quiet walk around West Lake, or water puppet theatre if you'd rather have something scheduled. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1611195328596-d8dcf57f5cea?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 3,
    location: "Transfer to Ninh Bình & Tràng An",
    title: "Into the rice fields and limestone valleys",
    note: "About two hours by private car to a garden homestay among the rice fields, with mountain views from the room. In the afternoon, a rower takes you through Tràng An's flooded caves and between limestone karsts — roughly two and a half hours, all of it seated. Dinner is local goat, river fish, and rice grown in the field you can see from the terrace. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1626743656249-5d8fa287b941?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 4,
    location: "Ninh Bình countryside & Hoa Lư",
    title: "The ancient capital, then a quieter lagoon",
    note: "Morning at Hoa Lư, the tenth-century capital of Vietnam, followed by a gentle bike ride or short drive through Bích Động and the back lanes between the paddies — flat ground, entirely optional. The afternoon boat ride on Vân Long lagoon is shallower and far less visited than Tràng An, with a good chance of spotting the endangered Delacour's langur on the cliffs. Climbing the roughly 500 steps of Hang Múa for the valley view is there if you want it, and just as easy to skip. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1503539680555-732099a55a56?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 5,
    location: "North to Hà Giang city",
    title: "The long transfer day",
    note: "Seven to eight hours on the road from Ninh Bình to Hà Giang city, broken up with generous stops for coffee, lunch and legs. The route runs through the tea country of Tuyên Quang, with a lunch stop at a riverside restaurant we use regularly. After checking in, an early dinner in town and a short briefing on what the mountain days need from you — border-area registration, what to pack, what the weather is doing. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1670654534716-91f59fe06a26?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 6,
    location: "Quản Bạ, Yên Minh & the road to Đồng Văn",
    title: "A driving day made of viewpoints, not distance",
    note: "A relaxed 9am start to Heaven's Gate at Quản Bạ and the Twin Mountains below, then a hillside coffee stop looking down the valley. After lunch in Yên Minh, the drive climbs through pine ridges into Đồng Văn, stopping wherever the light is good. You check into a restored stone house or a comfortable local hotel by late afternoon, then dinner and a walk through Đồng Văn's old quarter, quiet and lamplit after dark. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1685584280839-a51ba5a1908d?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 7,
    location: "Lũng Cú, Mã Pí Lèng & the Nho Quế river",
    title: "The most dramatic day of the trip",
    note: "Morning at Lũng Cú, the northernmost point of Vietnam, and its flag tower. After lunch back in Đồng Văn, the afternoon covers Mã Pí Lèng — the most dramatic stretch of road in the country — with a boat trip on the Nho Quế river through Tu Sản canyon: an hour on flat green water beneath the highest cliffs in Vietnam, and the calmest part of the whole trip. You return to the same hotel in Đồng Văn for a second night — no packing, no moving on. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1686755660203-55781dbc2f24?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 8,
    location: "Market morning & return to Hà Giang",
    title: "Hill markets, then back down the mountain",
    note: "If your dates land on a Sunday, this morning is built around the Đồng Văn or Mèo Vạc market — hill communities arriving on foot from the surrounding valleys from around 6am. From there it's the drive back down through Mèo Vạc and Mậu Duệ to Hà Giang city, with stops along the way and lunch on the road. A farewell dinner in town closes out the mountain leg of the trip. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1761985747469-64dfba0906c0?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 9,
    location: "Return to Hanoi & departure",
    title: "The long way back, at the same relaxed pace",
    note: "A relaxed departure and around six hours by private car back to Hanoi, with stops along the way — including an optional village stop for lunch and a walk. Drop-off is at your Hanoi hotel, the airport, or onward to your next stop in Vietnam. A late room and shower before a night flight can be arranged on request. — Tuấn Anh",
    photo: "https://images.unsplash.com/photo-1611195328596-d8dcf57f5cea?w=400&h=400&fit=crop&auto=format",
  },
];

const TRIPS = [
  {
    id: "mekong-condao",
    name: "Mekong Delta & Côn Đảo Island",
    duration: "5 days",
    region: "Mekong Delta & Côn Đảo",
    priceFrom: 490,
    vetter: TEAM[0],
    vettedDate: "August 2026",
    photo: "https://images.unsplash.com/photo-1561461221-959c3f16234b?w=900&h=620&fit=crop&auto=format",
    tagline: "Floating markets before sunrise, then a night on a national park beach watching sea turtles nest.",
    madeFor: "Andrea and her family",
    itinerary: ITINERARY_MEKONG,
    gallery: [
      { src: mekongSunsetBoat, alt: "A cargo boat on the Hậu River at sunset, near Cần Thơ", caption: "The Hậu River near Cần Thơ, at sunset." },
      { src: mekongBambooCanal, alt: "A sampan gliding under a bamboo canopy on a Mekong Delta canal", caption: "The canal into Mùa Xuân, under the bamboo." },
      { src: conDaoTurtleHatchlings, alt: "Sea turtle hatchlings in a woven basket, ready for release on Hòn Bảy Cạnh", caption: "Hatchlings, minutes from release on Hòn Bảy Cạnh." },
    ],
    description: "This is a real itinerary we planned and ran — five days built around two things that don't wait for anyone: the floating market at Cái Răng, busiest in the first hour of light, and the sea turtles nesting on Hòn Bảy Cạnh, which come ashore on the tide's schedule, not ours. Everything in between — the homestay on Cồn Sơn, the flight out to Côn Đảo — is built around getting you to those two moments at the right time.",
    included: [
      { label: "Hotel & homestay", detail: "Y Hotel Cần Thơ and Ngân Long Home & Camp on Cồn Sơn, booked in your name." },
      { label: "Domestic flight", detail: "Cần Thơ → Côn Đảo, ticketed once your dates are confirmed." },
      { label: "Turtle conservation night", detail: "Park ranger guide, entrance, speedboat, tent, dinner and breakfast on Hòn Bảy Cạnh, plus travel insurance for that night." },
      { label: "Local planner support", detail: "Tuấn Anh reachable by WhatsApp for the full trip, plus a mid-trip check-in call." },
      { label: "One cooking class", detail: "Chả giò, bánh xèo and bún thịt xào on Cồn Sơn — what you cook is your lunch." },
    ],
    notIncluded: "Not included: the Grab from Ho Chi Minh City to Mùa Xuân, international flights, travel insurance outside the turtle night, meals unless noted, visa fees, and tips.",
  },
  {
    id: "dalat-nature",
    name: "Đà Lạt Nature & Culture",
    duration: "3 days",
    region: "Central Highlands",
    priceFrom: 250,
    vetter: TEAM[2],
    vettedDate: "March 2026",
    photo: "https://images.unsplash.com/photo-1609412058473-c199497c3c5d?w=900&h=620&fit=crop&auto=format",
    tagline: "A relaxed pace built for a couple who don't want to rush — coffee farms, a lake, pine forest.",
    madeFor: "Ilan and his wife",
    itinerary: ITINERARY_DALAT,
    gallery: [
      { src: "https://images.unsplash.com/photo-1609412058473-c199497c3c5d?w=1400&h=900&fit=crop&auto=format", alt: "Pine forest and misty hills above Đà Lạt", caption: "The pine forest above Đà Lạt, early morning." },
    ],
    description: "Three unhurried days built for a couple who don't want to be marched between sights — a quiet farmhouse homestay, a coffee farm tasting to see how highland Arabica is actually grown, and an afternoon on Tuyền Lâm Lake with nothing scheduled. The pace is the point.",
    included: [
      { label: "Farmhouse homestay", detail: "A quiet farmhouse homestay for both nights, booked in your name." },
      { label: "Private driver", detail: "A private driver for the coffee farm, Tuyền Lâm Lake and market visits." },
      { label: "Coffee farm tasting", detail: "A full tasting session at a highland coffee farm — how Arabica is grown at altitude." },
      { label: "Boat on Tuyền Lâm Lake", detail: "A slow afternoon on the water, no schedule pushing you along." },
      { label: "Local planner support", detail: "Di Thạch reachable by WhatsApp for the full trip." },
    ],
    notIncluded: "Not included: the sleeper bus to and from Đà Lạt, international flights, meals unless noted, visa fees, and tips.",
  },
  {
    id: "food-journey",
    name: "Vietnam Food Journey",
    duration: "8 days",
    region: "Saigon, Mekong Delta, Hội An & Đà Nẵng",
    priceFrom: 641,
    vetter: TEAM[0],
    vettedDate: "April 2026",
    photo: "https://images.unsplash.com/photo-1761150285751-c593ab20159c?w=900&h=620&fit=crop&auto=format",
    tagline: "A night scooter food crawl through Saigon, sunrise at Cái Răng, a full day cooking in Hội An.",
    madeFor: "Jens",
    itinerary: ITINERARY_FOOD,
    gallery: [
      { src: "https://images.unsplash.com/photo-1761150285751-c593ab20159c?w=1400&h=900&fit=crop&auto=format", alt: "A lantern-lit street food stall in Hội An's Ancient Town", caption: "Hội An's Ancient Town, lit up for the evening." },
    ],
    description: "Eight days built around eating the way locals eat — a scooter food crawl through Saigon's backstreets after dark, the floating market at Cái Răng before the traders leave, and a full day cooking in Hội An with what you bought that morning at the market. The coast road over Hải Vân Pass closes it out.",
    included: [
      { label: "Hotels & homestay", detail: "Boutique hotels in Saigon and Đà Nẵng, plus the Mekong homestay on Cồn Sơn, booked in your name." },
      { label: "Domestic flight", detail: "Cần Thơ → Đà Nẵng, ticketed once your dates are confirmed." },
      { label: "Hội An cooking class", detail: "Morning market visit with a local chef, Trà Quế herb garden, and a hands-on class covering four or five dishes." },
      { label: "Saigon scooter food crawl", detail: "A guided xe ôm tour through Saigon's backstreets after dark." },
      { label: "Local planner support", detail: "Tuấn Anh reachable by WhatsApp for the full trip." },
    ],
    notIncluded: "Not included: international flights, meals unless noted, visa fees, and tips.",
  },
  {
    id: "grand-tour",
    name: "Grand Vietnam Tour",
    duration: "10 days",
    region: "Saigon, Đà Lạt, Đà Nẵng, Hội An & Huế",
    priceFrom: 565,
    vetter: TEAM[0],
    vettedDate: "December 2024",
    photo: "https://images.unsplash.com/photo-1611854064186-d8dccbccb031?w=900&h=620&fit=crop&auto=format",
    tagline: "Christmas Eve on My Khe Beach, the Hải Vân Pass by scenic train, four cities in ten days.",
    madeFor: "Melody and her family",
    itinerary: ITINERARY_GRAND,
    gallery: [
      { src: "https://images.unsplash.com/photo-1611854064186-d8dccbccb031?w=1400&h=900&fit=crop&auto=format", alt: "The Golden Bridge at Bà Nà Hills, held up by giant stone hands", caption: "The Golden Bridge at Bà Nà Hills, outside Đà Nẵng." },
    ],
    description: "Ten days across four cities, built around a family Christmas — Bà Nà Hills and the Golden Bridge on Christmas Eve, a scenic train over Hải Vân Pass, and the Imperial City in Huế. Enough movement to see the country, enough downtime that nobody comes home exhausted.",
    included: [
      { label: "Domestic flights", detail: "Saigon → Đà Lạt → Đà Nẵng, ticketed once your dates are confirmed." },
      { label: "Hotels", detail: "Boutique hotels in Ho Chi Minh City, Đà Lạt, Đà Nẵng and Huế, booked in your name." },
      { label: "Bà Nà Hills", detail: "Cable car, Golden Bridge and French Village entrance." },
      { label: "Scenic train to Huế", detail: "Đà Nẵng to Huế by rail, over Hải Vân Pass." },
      { label: "Local planner support", detail: "Tuấn Anh reachable by WhatsApp for the full trip." },
    ],
    notIncluded: "Not included: international flights, meals unless noted, visa fees, and tips.",
  },
  {
    id: "north-vietnam-hagiang",
    name: "Relaxed North Vietnam: Hanoi, Ninh Bình & Hà Giang",
    duration: "9 days",
    region: "Hanoi, Ninh Bình & Hà Giang",
    priceFrom: 730,
    vetter: TEAM[0],
    vettedDate: "September 2026",
    photo: "https://images.unsplash.com/photo-1686755660203-55781dbc2f24?w=900&h=620&fit=crop&auto=format",
    tagline: "Two easy days in Hanoi, quiet limestone valleys in Ninh Bình, then four days on the Hà Giang loop by private car — built for a relaxed pace, not a rush.",
    madeFor: "Hellen and her girlfriend",
    itinerary: ITINERARY_HAGIANG,
    gallery: [
      { src: "https://images.unsplash.com/photo-1686755660203-55781dbc2f24?w=1400&h=900&fit=crop&auto=format", alt: "The Nho Quế river cutting through Tu Sản canyon below Mã Pí Lèng pass", caption: "Tu Sản canyon, on the Nho Quế river below Mã Pí Lèng." },
      { src: "https://images.unsplash.com/photo-1670654534716-91f59fe06a26?w=1400&h=900&fit=crop&auto=format", alt: "Golden rice terraces in the Hà Giang highlands", caption: "Terraces on the road into Hà Giang." },
      { src: "https://images.unsplash.com/photo-1626743656249-5d8fa287b941?w=1400&h=900&fit=crop&auto=format", alt: "A pagoda on the water at Tràng An, Ninh Bình, surrounded by limestone karsts", caption: "Tràng An, Ninh Bình." },
    ],
    description: "Nine days built for travellers who want to see the north without rushing: two easy days in Hanoi, two days in the rice fields and limestone valleys of Ninh Bình, and four days on the Hà Giang mountain loop with a private driver instead of a motorbike. Every day leaves room to sit down, drink coffee, and watch the place go by. The mountain roads are spectacular and genuinely winding — we build in short driving legs of two to three hours maximum between stops, front-seat rotation, and unhurried stops. Can be shortened to 7 days or extended to 11.",
    included: [
      { label: "Private car & driver", detail: "An experienced mountain driver for the full route, from Hanoi airport to the final drop-off — including fuel, tolls and parking. No motorbikes, no shared minibuses." },
      { label: "English-speaking guide", detail: "A guide for the full itinerary, from Hanoi through to Hà Giang." },
      { label: "Accommodation", detail: "Hotels, homestay and eco-lodge across Hanoi, Ninh Bình and Hà Giang, in properties our team has stayed in." },
      { label: "Border-area permits", detail: "Registration for the Đồng Văn and Lũng Cú districts, handled in advance." },
      { label: "Boat trips & entrance fees", detail: "Tràng An, Vân Long and the Nho Quế river, plus welcome and farewell dinners." },
    ],
    notIncluded: "Not included: international and domestic flights, travel insurance, most meals and drinks, personal expenses and tips, and visa fees.",
  },
];

const PLANNING_FEE = 199;
// Approximate USD → VND rate — update periodically, not a live feed.
const USD_TO_VND = 25000;
const formatPrice = (usd: number, currency: "USD" | "VND") => {
  if (currency === "VND") {
    return `₫${Math.round(usd * USD_TO_VND).toLocaleString("en-US")}`;
  }
  return `$${usd.toLocaleString("en-US")}`;
};
const EXAMPLE_PROMPTS = [
  "10 days in Vietnam with amazing food",
  "Adventurous coffee tour in Đà Lạt",
  "A relaxed 9-day loop through Hà Giang",
  "A family trip to the Mekong Delta & Côn Đảo",
  "Grand tour of Vietnam for Christmas",
];
const openInstagramProfile = () => window.open("https://instagram.com/vietnamesehangout", "_blank", "noopener,noreferrer");
const WHATSAPP_NUMBER = "84772751430";
const openWhatsApp = (text?: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const FAQS = [
  {
    question: "What's included in the price?",
    answer: "The price shown is our planning fee — it covers vetting, itinerary design, and concierge booking support from a named planner by WhatsApp for the duration of your trip. We don't sell packages: accommodation, transport and tours are booked directly with our verified suppliers, in your name, and you pay them directly. Some suppliers pay us a standard referral commission — we're transparent about that, and it's how we keep the planning fee low.",
  },
  {
    question: "Can I customise the itinerary?",
    answer: "Yes — this is the point. The trip as listed is a starting framework. Every enquiry we receive gets a response from a named planner who will adjust dates, add or remove stops, and find accommodation that suits the way you actually travel.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "Full refund up to 60 days before departure. 50% refund between 30–60 days. No refund inside 30 days, but we will always work to rebook or transfer your dates if something comes up. We've never refused a reasonable request.",
  },
  {
    question: "Is this suitable for solo travellers?",
    answer: "We have sent solo travellers on every trip we offer. Many of our best enquiries come from people travelling alone. The per-person price is slightly higher for solo travel (single supplement on accommodation) but we'll be transparent about the exact figure upfront.",
  },
  {
    question: "Do I need a visa for Vietnam?",
    answer: "Citizens of most Western countries can enter Vietnam visa-free for up to 45 days. We'll send you the current entry requirements for your passport when you enquire — they change periodically and we check them at time of booking, not at time of website update.",
  },
];

const VETTING_CHECKS = [
  { label: "Physical access", detail: "We visit in person. Not by video call, not via a partner's report." },
  { label: "Accommodation", detail: "We check the actual room sold at the price listed, not a showroom." },
  { label: "Food safety", detail: "We eat there. Ideally twice, at different times of day." },
  { label: "Ownership", detail: "We confirm who operates the business and that it hasn't changed hands." },
  { label: "Pricing honesty", detail: "We verify that the price quoted to us matches what tourists are charged." },
  { label: "Access for types", detail: "We note mobility constraints, family-appropriateness, solo-safety." },
];

// ─── Reusable components ─────────────────────────────────────────────────────

function LastVettedBadge({ date, small }: { date: string; small?: boolean }) {
  return (
    <span
      style={{ fontFamily: S }}
      className={`inline-flex items-center gap-1.5 border border-[#2E5D4B] text-[#2E5D4B] ${small ? "text-[10px] px-2 py-0.5" : "text-[11px] px-2.5 py-1"}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#2E5D4B] inline-block flex-shrink-0" />
      Last vetted {date}
    </span>
  );
}

function VetterChip({ vetter, small }: { vetter: typeof TEAM[0]; small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={vetter.photo}
        alt={vetter.name}
        className={`${small ? "w-5 h-5" : "w-7 h-7"} rounded-full object-cover bg-[#E5E0D6] flex-shrink-0`}
      />
      <span style={{ fontFamily: S }} className={`${small ? "text-[11px]" : "text-sm"} text-[#6B6457]`}>
        Vetted by <span className="font-semibold text-[#191713]">{vetter.name}</span>
      </span>
    </div>
  );
}

function Btn({
  children, variant = "primary", onClick, type = "button", disabled, className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const base = `inline-flex items-center gap-2 rounded transition-all duration-150 cursor-pointer ${className}`;
  if (variant === "primary") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={{ fontFamily: S }}
        className={`${base} bg-[#004226] text-white px-4 py-2.5 text-[15px] font-bold hover:bg-[#00331E] active:bg-[#001F11] disabled:opacity-40`}
      >
        {children}
      </button>
    );
  }
  if (variant === "secondary") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={{ fontFamily: S }}
        className={`${base} bg-white border border-[#004226] text-[#004226] px-4 py-2.5 text-[15px] font-bold hover:bg-[#004226] hover:text-white disabled:opacity-40`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ fontFamily: S }}
      className={`${base} text-[#191713] underline underline-offset-4 text-sm hover:text-[#004226] disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(25,23,19,0.15)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start py-5 text-left gap-4"
      >
        <span style={{ fontFamily: S }} className="text-sm font-medium text-[#191713]">{question}</span>
        <span className="flex-shrink-0 mt-0.5 text-[#6B6457]">
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>
      </button>
      {open && (
        <p style={{ fontFamily: S }} className="text-sm text-[#6B6457] pb-5 leading-relaxed pr-8">
          {answer}
        </p>
      )}
    </div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10 md:mb-14">
      <span style={{ fontFamily: S }} className="text-xs font-semibold tracking-[0.2em] text-[#004226]">{num}</span>
      <div className="flex-1 h-px bg-[rgba(25,23,19,0.15)]" />
      <span style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.15em] text-[#6B6457]">{label}</span>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "VI", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
  { code: "ZH", label: "中文", flag: "🇨🇳" },
  { code: "RU", label: "Русский", flag: "🇷🇺" },
  { code: "KO", label: "한국어", flag: "🇰🇷" },
];

// Maps the site's language switcher to a BCP-47 tag for the Web Speech API.
const SPEECH_LANG_MAP: Record<string, string> = {
  EN: "en-US",
  VI: "vi-VN",
  FR: "fr-FR",
  ES: "es-ES",
  ZH: "zh-CN",
  RU: "ru-RU",
  KO: "ko-KR",
};

function Nav({
  setPage,
  language,
  setLanguage,
  currency,
  setCurrency,
}: {
  setPage: (p: string) => void;
  language: typeof LANGUAGES[0];
  setLanguage: (l: typeof LANGUAGES[0]) => void;
  currency: "VND" | "USD";
  setCurrency: (c: "VND" | "USD") => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"currency" | "language" | "temp" | "account" | null>(null);
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (page: string) => {
    setPage(page);
    setMobileOpen(false);
    setOpenMenu(null);
    window.scrollTo({ top: 0 });
  };

  const toggleMenu = (menu: "currency" | "language" | "temp" | "account") => {
    setOpenMenu((cur) => (cur === menu ? null : menu));
  };

  const pillClass = "flex items-center gap-1 text-[13px] font-semibold text-[#191713] bg-white border border-[rgba(25,23,19,0.12)] rounded-full px-3 py-1.5 hover:border-[rgba(25,23,19,0.3)] transition-colors";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[rgba(25,23,19,0.08)] shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-[60px] flex items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center">
            <img src={logo} alt="Vietnamese Hangout" className="w-9 h-9 object-contain" />
          </button>

          <div className="hidden md:flex items-center gap-2.5" style={{ fontFamily: S }}>
            {/* Currency */}
            <div className="relative">
              <button onClick={() => toggleMenu("currency")} className={pillClass}>
                {currency === "VND" ? "₫" : "$"}
              </button>
              {openMenu === "currency" && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-[rgba(25,23,19,0.1)] shadow-lg py-1.5 w-28 z-10">
                  {(["VND", "USD"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCurrency(c); setOpenMenu(null); }}
                      className={`w-full text-left px-3.5 py-2 text-[13px] hover:bg-[#F5F2EC] ${currency === c ? "font-semibold text-[#191713]" : "text-[#6B6457]"}`}
                    >
                      {c === "VND" ? "₫ VND" : "$ USD"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language */}
            <div className="relative">
              <button onClick={() => toggleMenu("language")} className={pillClass}>
                <span>{language.flag}</span>
                <ChevronDown size={13} />
              </button>
              {openMenu === "language" && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-[rgba(25,23,19,0.1)] shadow-lg py-1.5 w-40 z-10">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l); setOpenMenu(null); }}
                      className={`w-full text-left flex items-center gap-2 px-3.5 py-2 text-[13px] hover:bg-[#F5F2EC] ${language.code === l.code ? "font-semibold text-[#191713]" : "text-[#6B6457]"}`}
                    >
                      <span>{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Temperature */}
            <button onClick={() => setTempUnit((u) => (u === "C" ? "F" : "C"))} className={pillClass}>
              °{tempUnit}
            </button>

            {/* Account */}
            <div className="relative">
              <button
                onClick={() => toggleMenu("account")}
                className="flex items-center gap-1 bg-white border border-[rgba(25,23,19,0.12)] rounded-full pl-2 pr-2.5 py-1.5 hover:border-[rgba(25,23,19,0.3)] transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-[#004226] text-white flex items-center justify-center">
                  <User size={13} />
                </span>
                <ChevronDown size={13} className="text-[#191713]" />
              </button>
              {openMenu === "account" && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-[rgba(25,23,19,0.1)] shadow-lg py-1.5 w-36 z-10">
                  <button onClick={() => setOpenMenu(null)} className="w-full text-left px-3.5 py-2 text-[13px] text-[#191713] hover:bg-[#F5F2EC] font-semibold">Log in</button>
                  <button onClick={() => setOpenMenu(null)} className="w-full text-left px-3.5 py-2 text-[13px] text-[#6B6457] hover:bg-[#F5F2EC]">Sign up</button>
                </div>
              )}
            </div>

          </div>

          <button className="md:hidden text-[#191713]" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-[#004226]/50" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto w-[280px] bg-white h-full flex flex-col px-8 py-10">
            <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-5 text-[#191713]">
              <X size={20} />
            </button>
            <div className="mb-10">
              <img src={logo} alt="Vietnamese Hangout" className="w-9 h-9 object-contain" />
            </div>
            <div className="flex flex-col gap-4" style={{ fontFamily: S }}>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#6B6457] mb-2">Currency</p>
                <div className="flex gap-2">
                  {(["VND", "USD"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`text-[13px] px-3 py-1.5 rounded-full border ${currency === c ? "bg-[#004226] text-white border-[#191713]" : "border-[rgba(25,23,19,0.15)] text-[#191713]"}`}
                    >
                      {c === "VND" ? "₫ VND" : "$ USD"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#6B6457] mb-2">Language</p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l)}
                      className={`text-[13px] px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${language.code === l.code ? "bg-[#004226] text-white border-[#191713]" : "border-[rgba(25,23,19,0.15)] text-[#191713]"}`}
                    >
                      <span>{l.flag}</span> {l.code}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#6B6457] mb-2">Temperature</p>
                <button
                  onClick={() => setTempUnit((u) => (u === "C" ? "F" : "C"))}
                  className="text-[13px] px-3 py-1.5 rounded-full border border-[rgba(25,23,19,0.15)] text-[#191713]"
                >
                  °{tempUnit}
                </button>
              </div>
              <div className="pt-2 border-t border-[rgba(25,23,19,0.1)]">
                <button className="flex items-center gap-2 text-[13px] text-[#191713] font-semibold">
                  <span className="w-6 h-6 rounded-full bg-[#004226] text-white flex items-center justify-center">
                    <User size={13} />
                  </span>
                  Log in
                </button>
              </div>
            </div>
            <div className="mt-auto pt-10 border-t border-[rgba(25,23,19,0.15)]">
              <p style={{ fontFamily: S }} className="text-xs text-[#6B6457]">info@vietnamesehangout.com</p>
              <p style={{ fontFamily: S }} className="text-xs text-[#6B6457] mt-1">+84 978 270 038</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: string) => void }) {
  const [lang, setLang] = useState<"EN" | "VI">("EN");
  return (
    <footer className="bg-[#004226] text-[#F5F2EC] mt-0">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-14 pb-14 border-b border-[rgba(245,242,236,0.12)]">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="bg-white rounded p-1 flex items-center justify-center flex-shrink-0">
                <img src={logo} alt="Vietnamese Hangout" className="w-6 h-6 object-contain" />
              </span>
              <span style={{ fontFamily: F }} className="text-2xl font-semibold">Vietnamese Hangout</span>
            </div>
            <p style={{ fontFamily: S }} className="text-sm text-[rgba(245,242,236,0.55)] leading-relaxed max-w-xs">
              Trip planning rooted in ground truth. Every place visited by a named person on our team. Based in Hồ Chí Minh City since 2017.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-10">
            <div>
              <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[rgba(245,242,236,0.4)] mb-4">Contact</p>
              <div className="space-y-2.5">
                <a href="mailto:info@vietnamesehangout.com" style={{ fontFamily: S }} className="flex items-center gap-2.5 text-sm text-[rgba(245,242,236,0.75)] hover:text-[#F5F2EC] transition-colors">
                  <Mail size={13} className="flex-shrink-0" />
                  info@vietnamesehangout.com
                </a>
                <a href="tel:+84978270038" style={{ fontFamily: S }} className="flex items-center gap-2.5 text-sm text-[rgba(245,242,236,0.75)] hover:text-[#F5F2EC] transition-colors">
                  <Phone size={13} className="flex-shrink-0" />
                  +84 978 270 038
                </a>
                <p style={{ fontFamily: S }} className="flex items-center gap-2.5 text-sm text-[rgba(245,242,236,0.55)]">
                  <MapPin size={13} className="flex-shrink-0" />
                  Hồ Chí Minh City, Vietnam
                </p>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[rgba(245,242,236,0.4)] mb-4">Navigate</p>
              <div className="space-y-2.5">
                {[
                  { label: "Our trips", page: "home" },
                  { label: "How we vet", page: "vetting" },
                  { label: "Our people", page: "people" },
                ].map((l) => (
                  <button
                    key={l.label}
                    onClick={() => { setPage(l.page); window.scrollTo({ top: 0 }); }}
                    style={{ fontFamily: S }}
                    className="block text-sm text-[rgba(245,242,236,0.75)] hover:text-[#F5F2EC] transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <button onClick={openInstagramProfile} style={{ fontFamily: S }} className="flex items-center gap-1.5 text-xs text-[rgba(245,242,236,0.55)] hover:text-[#F5F2EC] transition-colors">
              <Instagram size={13} />
              @vietnamesehangout
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ fontFamily: S }} className="text-xs text-[rgba(245,242,236,0.3)]">Language</span>
            {(["EN", "VI"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{ fontFamily: S }}
                className={`text-xs px-2.5 py-1 border transition-colors ${lang === l ? "border-[rgba(245,242,236,0.4)] text-[#F5F2EC]" : "border-[rgba(245,242,236,0.15)] text-[rgba(245,242,236,0.4)] hover:text-[rgba(245,242,236,0.7)]"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Home page ───────────────────────────────────────────────────────────────

function HomePage({ setPage, setSelectedTripId, language, currency }: { setPage: (p: string) => void; setSelectedTripId: (id: string) => void; language: typeof LANGUAGES[0]; currency: "VND" | "USD" }) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const baseMessageRef = useRef("");
  const finalTranscriptRef = useRef("");

  // Typewriter placeholder — cycles through real trip ideas to nudge visitors on what to type.
  const [promptIdx, setPromptIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (isListening) return;
    const current = EXAMPLE_PROMPTS[promptIdx];
    const atEnd = !deleting && charIdx === current.length;
    const atStart = deleting && charIdx === 0;
    const delay = atEnd ? 1800 : atStart ? 400 : deleting ? 25 : 45;

    const timeout = setTimeout(() => {
      if (atEnd) {
        setDeleting(true);
      } else if (atStart) {
        setDeleting(false);
        setPromptIdx((i) => (i + 1) % EXAMPLE_PROMPTS.length);
      } else {
        setCharIdx((i) => i + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, promptIdx, isListening]);

  const typedPlaceholder = EXAMPLE_PROMPTS[promptIdx].slice(0, charIdx);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setMicError("Voice input isn't supported in this browser — try Chrome, Edge or Safari.");
      return;
    }
    setMicError(null);
    baseMessageRef.current = message.trim();
    finalTranscriptRef.current = "";
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = SPEECH_LANG_MAP[language.code] || "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      const combined = [baseMessageRef.current, finalTranscriptRef.current, interimTranscript]
        .map((s) => s.trim())
        .filter(Boolean)
        .join(" ");
      setMessage(combined);
    };
    recognition.onerror = (event: any) => {
      setMicError(event.error === "not-allowed" ? "Microphone access denied — check your browser permissions." : "Couldn't hear that — try again.");
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const sendMessage = () => {
    openWhatsApp(message.trim() || undefined);
    setMessage("");
  };

  return (
    <div className="bg-white">
      {/* Hero + Trip strip — one continuous bold green gradient wash, no seam between them */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C3DFD1] via-[#E4EFE9] to-white" />
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-[#004226]/18 blur-3xl" />
        <div className="absolute top-10 -right-24 w-[420px] h-[420px] rounded-full bg-[#004226]/16 blur-3xl" />

      <section className="relative w-full px-6 md:px-16 pt-20 pb-10 md:pt-24 md:pb-14">
        <div className="relative max-w-[880px] mx-auto text-center">
          <h1
            style={{ fontFamily: F, lineHeight: 1.05 }}
            className="text-[clamp(26px,4vw,48px)] font-extrabold text-[#191713] mb-6 tracking-[-0.02em]"
          >
            Uncover unique trips in Vietnam,<br />tailored just for you
          </h1>

          {/* WhatsApp message box */}
          <div className="max-w-2xl mx-auto mb-3">
            <div className="bg-white rounded-[28px] shadow-lg p-4 flex flex-col gap-3 min-h-[130px]">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder={isListening ? "Listening… speak your trip idea" : (typedPlaceholder || " ")}
                rows={2}
                style={{ fontFamily: S }}
                className="w-full flex-1 resize-none outline-none text-[#191713] bg-transparent placeholder:text-[#191713]/70 text-sm text-left"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleListening}
                  aria-label={isListening ? "Stop voice input" : "Speak your message"}
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isListening ? "bg-red-500 text-white animate-pulse" : "text-[#6B6457] hover:text-[#191713] hover:bg-[#F5F2EC]"}`}
                >
                  {isListening ? <Square size={15} /> : <Mic size={17} />}
                </button>
                <button
                  onClick={sendMessage}
                  style={{ fontFamily: S }}
                  className="bg-[#004226] text-white rounded-full pl-5 pr-4 py-3 text-sm font-bold flex items-center gap-2 flex-shrink-0 hover:bg-[#00331E] transition-colors"
                >
                  Start planning <Send size={15} />
                </button>
              </div>
            </div>
            {micError && (
              <p style={{ fontFamily: S }} className="text-xs text-red-600 mt-2">
                {micError}
              </p>
            )}
          </div>
          <p style={{ fontFamily: S }} className="text-[15px] text-[#6B6457] leading-relaxed mb-12 max-w-lg mx-auto">
            We build every itinerary around what you actually want — then a named local checks it before you pay.
          </p>

          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {[
              { label: "Local planners on the ground", value: "5" },
              { label: "Real trips & reviews", value: "instagram" },
              { label: "Vetted in person", value: "100%" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && <div className="w-px h-8 bg-[rgba(25,23,19,0.15)]" />}
                {s.value === "instagram" ? (
                  <button onClick={openInstagramProfile} className="text-center hover:opacity-70 transition-opacity">
                    <p className="flex justify-center text-[#191713]"><Instagram size={22} /></p>
                    <p style={{ fontFamily: S }} className="text-[11px] text-[#6B6457] max-w-[110px] underline underline-offset-2">{s.label}</p>
                  </button>
                ) : (
                  <div className="text-center">
                    <p style={{ fontFamily: F }} className="text-2xl font-bold text-[#191713]">{s.value}</p>
                    <p style={{ fontFamily: S }} className="text-[11px] text-[#6B6457] max-w-[110px]">{s.label}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip strip */}
      <section className="relative px-6 md:px-16 pt-2 pb-10 md:pt-4 md:pb-14">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h2 style={{ fontFamily: F }} className="text-3xl font-bold text-[#191713] mb-2">Trips shaped around Vietnam</h2>
            <p style={{ fontFamily: S }} className="text-sm text-[#6B6457]">Every spot vetted in person by a named local before it goes on the site.</p>
          </div>
          <div className="overflow-hidden -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-5 pb-4 w-max animate-marquee">
              {["a", "b"].map((copy) => (
                <React.Fragment key={copy}>
                  {TRIPS.map((t) => (
                    <button
                      key={`${copy}-${t.id}`}
                      onClick={() => { setSelectedTripId(t.id); setPage("trip"); window.scrollTo({ top: 0 }); }}
                      className="relative flex-shrink-0 w-[240px] md:w-[270px] rounded-3xl overflow-hidden text-left group"
                      style={{ height: 340 }}
                    >
                      <img src={t.photo} alt={t.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <span style={{ fontFamily: S }} className="absolute top-4 right-4 bg-white/90 text-[#191713] text-[11px] font-semibold px-3 py-1 rounded-full">
                        {t.duration}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p style={{ fontFamily: F }} className="text-white font-bold text-lg leading-snug mb-1">{t.name}</p>
                        <p style={{ fontFamily: S }} className="text-white/70 text-xs">Made for {t.madeFor}</p>
                      </div>
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => { setSelectedTripId(TRIPS[0].id); setPage("trip"); window.scrollTo({ top: 0 }); }}
              style={{ fontFamily: S }}
              className="bg-[#004226] text-white rounded-full px-6 py-3 text-sm font-bold hover:bg-[#00331E] transition-colors"
            >
              See more trips
            </button>
          </div>
        </div>
      </section>
      </div>

      {/* WhatsApp + human duo */}
      <section className="relative overflow-hidden px-6 md:px-16 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#E4EFE9]" />
        <div className="relative max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 style={{ fontFamily: F }} className="text-[clamp(28px,4vw,44px)] font-bold text-[#191713] leading-[1.15] mb-4">
              Fast to reach. Real when it matters.
            </h2>
            <p style={{ fontFamily: S }} className="text-[15px] text-[#6B6457] leading-relaxed">
              Message us on WhatsApp with what you&apos;re picturing. Our team members will start shaping the trip with you.
            </p>
          </div>

          <div className="max-w-[1100px] mx-auto relative" style={{ paddingTop: 24, paddingBottom: 24 }}>
            <div className="relative rounded-3xl overflow-hidden" style={{ height: 420 }}>
              <img
                src="https://images.unsplash.com/photo-1609412058473-c199497c3c5d?w=1400&h=900&fit=crop&auto=format"
                alt="Rice terraces in the northern highlands"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="absolute -top-2 left-4 md:left-10 flex items-end gap-0">
              <div className="w-16 h-16 rounded-full bg-[#004226] text-white flex items-center justify-center flex-shrink-0 shadow-lg z-10 -mr-4 mb-1">
                <MessageCircle size={26} />
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-5 max-w-sm">
                <p style={{ fontFamily: S }} className="text-sm font-semibold text-[#004226] mb-1.5">Vietnamese Hangout</p>
                <p style={{ fontFamily: S }} className="text-base text-[#191713] leading-snug">
                  Message us anytime — <span className="font-semibold">we usually reply within a few hours</span>.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-2 right-4 md:right-10 flex items-end justify-end gap-0">
              <div className="bg-white rounded-2xl shadow-xl p-5 max-w-sm">
                <p style={{ fontFamily: S }} className="text-sm font-semibold text-[#004226] mb-1.5">{TEAM[0].name}, founder</p>
                <p style={{ fontFamily: S }} className="text-base text-[#191713] leading-snug">
                  A named planner replies personally — not a bot. <span className="font-semibold">You&apos;ll have my number for the whole trip.</span>
                </p>
              </div>
              <img src={TEAM[0].photo} alt={TEAM[0].name} className="w-16 h-16 rounded-full object-cover bg-[#E5E0D6] flex-shrink-0 shadow-lg z-10 -ml-4 mb-1" />
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => openWhatsApp()}
              style={{ fontFamily: S }}
              className="bg-[#004226] text-white rounded-full px-6 py-3 text-sm font-bold inline-flex items-center gap-2 hover:bg-[#00331E] transition-colors"
            >
              <MessageCircle size={16} /> Message us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Real people grid */}
      <section className="bg-[#004226] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <h2 style={{ fontFamily: F }} className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Real people who really know Vietnam
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-12 max-w-4xl mx-auto">
            {TEAM.map((m) => (
              <button
                key={m.name}
                onClick={() => { setPage("people"); window.scrollTo({ top: 0 }); }}
                className="relative rounded-3xl overflow-hidden text-left"
                style={{ aspectRatio: "4/5" }}
              >
                <img src={m.photo} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p style={{ fontFamily: F }} className="text-white font-bold text-xl mb-1">{m.name}</p>
                  <p style={{ fontFamily: S }} className="text-white/70 text-sm">{m.role}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => openWhatsApp()}
              style={{ fontFamily: S }}
              className="bg-white text-[#191713] rounded-full px-6 py-3 text-sm font-bold hover:bg-[#F5F2EC] transition-colors"
            >
              Start planning
            </button>
          </div>
        </div>
      </section>

      {/* Find your next trip */}
      <section className="px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <h2 style={{ fontFamily: F }} className="text-3xl md:text-4xl font-bold text-[#191713] text-center mb-12">
            Find your next trip in Vietnam
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TRIPS.slice(0, 4).map((t) => (
              <button
                key={t.id}
                onClick={() => { setSelectedTripId(t.id); setPage("trip"); window.scrollTo({ top: 0 }); }}
                className="text-left group"
              >
                <div className="rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: "4/3" }}>
                  <img src={t.photo} alt={t.region} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p style={{ fontFamily: F }} className="font-bold text-[#191713] mb-0.5">{t.region}</p>
                <p style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{t.tagline}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-16 py-20 md:py-28 bg-[#FAF9F7]">
        <div className="max-w-[1440px] mx-auto">
          <h2 style={{ fontFamily: F }} className="text-3xl md:text-4xl font-bold text-[#191713] text-center mb-2">
            How planning works
          </h2>
          <p style={{ fontFamily: S }} className="text-sm text-[#6B6457] text-center mb-12">Four steps, no ticket queue.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Tell us your wish list",
                body: "A 7-question brief — takes 4 minutes, no account required. Dates, who's coming, what you'd rather avoid.",
              },
              {
                title: "A named planner replies",
                body: "Same day. You'll know their name, their region, and how many places they've personally checked.",
              },
              {
                title: "We build it together",
                body: "Two or three exchanges by WhatsApp — we refine the route and source places we've stayed in ourselves.",
              },
              {
                title: "You travel, we're reachable",
                body: "A local number and a mid-trip check-in. If something changes on the ground, we're the ones who fix it.",
              },
            ].map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl border border-[rgba(25,23,19,0.08)] p-6">
                <div style={{ fontFamily: F }} className="w-9 h-9 rounded-full bg-[#004226] text-white flex items-center justify-center text-sm font-bold mb-4">
                  {i + 1}
                </div>
                <h3 style={{ fontFamily: F }} className="text-base font-semibold text-[#191713] leading-snug mb-2">
                  {step.title}
                </h3>
                <p style={{ fontFamily: S }} className="text-[13px] text-[#6B6457] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI + human planning announcement */}
      <section className="px-6 md:px-16 py-10 md:py-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-[#004226] px-6 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <div className="flex-1">
              <span style={{ fontFamily: S }} className="inline-block text-[11px] uppercase tracking-[0.15em] font-semibold text-[#F5F2EC] bg-white/10 px-3 py-1.5 rounded-full mb-4">
                Coming this December
              </span>
              <h2 style={{ fontFamily: F }} className="text-2xl md:text-[32px] font-bold text-white leading-snug mb-2">
                AI-human trip planning is on its way
              </h2>
              <p style={{ fontFamily: S }} className="text-[15px] text-[rgba(245,242,236,0.75)] max-w-xl">
                A faster way to start your plan with AI — with every spot still checked in person by a named local before it reaches you.
              </p>
            </div>
            <button
              onClick={() => openWhatsApp()}
              style={{ fontFamily: S }}
              className="bg-white text-[#191713] rounded-full px-6 py-3 text-sm font-bold hover:bg-[#F5F2EC] transition-colors flex-shrink-0"
            >
              Get notified
            </button>
          </div>
        </div>
      </section>

      {/* Why $199 */}
      <section id="why-price" className="bg-[#004226] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <h2 style={{ fontFamily: F }} className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
            A package tour hides the markup. We don&apos;t sell packages.
          </h2>
          <p style={{ fontFamily: S }} className="text-[15px] text-[rgba(245,242,236,0.7)] text-center max-w-xl mx-auto mb-12">
            Most agencies fold planning, vetting and their margin into one all-in number you can&apos;t see inside. We split it on purpose.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <p style={{ fontFamily: S }} className="text-[11px] uppercase tracking-wider text-[rgba(245,242,236,0.5)] font-semibold mb-3">Typical agency</p>
              <p style={{ fontFamily: F }} className="text-2xl font-bold text-white mb-4">One bundled price</p>
              <ul className="space-y-2.5">
                {["Planning, vetting and margin folded together", "You can't see what's a fee vs. a kickback", "No named person accountable for the plan"].map((item) => (
                  <li key={item} style={{ fontFamily: S }} className="text-[13px] text-[rgba(245,242,236,0.65)] flex items-start gap-2.5">
                    <span className="w-3 h-px bg-white/30 flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-7">
              <p style={{ fontFamily: S }} className="text-[11px] uppercase tracking-wider text-[#004226] font-semibold mb-3">Vietnamese Hangout</p>
              <p style={{ fontFamily: F }} className="text-2xl font-bold text-[#191713] mb-4">{formatPrice(PLANNING_FEE, currency)} planning fee, flat</p>
              <ul className="space-y-2.5">
                {["The whole cost of a named planner building & vetting your trip", "Hotels, drivers, tours — booked directly, in your own name", "Usually less than what's already hidden in a bundled price"].map((item) => (
                  <li key={item} style={{ fontFamily: S }} className="text-[13px] text-[#191713] flex items-start gap-2.5">
                    <Check size={13} className="text-[#004226] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Our people page ──────────────────────────────────────────────────────────

function OurPeoplePage() {
  return (
    <div className="pt-[60px]">
      <div className="bg-[#004226] px-6 md:px-16 py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto">
          <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.2em] text-[rgba(245,242,236,0.45)] mb-4">Our people</p>
          <h1 style={{ fontFamily: F }} className="text-[clamp(32px,4.5vw,56px)] font-bold text-[#F5F2EC] max-w-2xl">
            Vetted by a person, not an algorithm.
          </h1>
        </div>
      </div>

      {/* Vetter strip */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-14 md:py-16">
        <SectionLabel num="01" label="The team on the ground" />
        <div className="max-w-2xl">
          {TEAM.map((m) => (
            <div key={m.name} className="flex items-center gap-5 py-6 border-t border-[rgba(25,23,19,0.12)] last:border-b">
              <img
                src={m.photo}
                alt={m.name}
                className="w-16 h-16 rounded-full object-cover bg-[#E5E0D6] flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <span style={{ fontFamily: F }} className="text-lg font-semibold text-[#191713]">{m.name}</span>
                  <span style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{m.role}{m.region ? ` · ${m.region}` : ""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder note */}
      <section className="bg-[#EDE9E0]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 md:py-28">
          <SectionLabel num="02" label="A note from the founder" />
          <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-12 md:gap-20 items-start">
            <div className="relative">
              <img
                src={tuanAnhPortrait}
                alt="Tuấn Anh"
                className="w-full object-cover bg-[#DDD8CE]"
                style={{ aspectRatio: "4/5" }}
              />
              <figcaption style={{ fontFamily: S }} className="text-[10px] italic text-[#6B6457] mt-2">
                Tuấn Anh, founder.
              </figcaption>
            </div>
            <div className="flex flex-col justify-center">
              <div style={{ fontFamily: F }} className="text-[clamp(18px,2vw,22px)] text-[#191713] leading-[1.7] italic space-y-5">
                <p>
                  I started out as a freelance tour guide. And too often, the places we&apos;d take our guests weren&apos;t that great — recycled stops picked for convenience or commission, not because they showed visitors anything real about Vietnam.
                </p>
                <p>
                  That sat wrong with me. I felt a duty to bring Vietnam — my country — to the world through tourism done properly: real people, real places, everything pure Vietnamese. Vietnamese Hangout is that duty turned into a company.
                </p>
                <p>
                  Travel is to experience, to learn, to respect what you&apos;re having, and be grateful. Stepping outside our everyday environments is the fastest way to build empathy, adaptability, and perspective — skills that serve us both in life and in leadership.
                </p>
                <p>
                  Every place on this site has been visited by someone on this team. We write the date we last checked it and we go back. That&apos;s all we do. I hope it&apos;s useful.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[rgba(25,23,19,0.15)]">
                <p style={{ fontFamily: F }} className="text-base italic text-[#191713]">— Tuấn Anh, Ho Chi Minh City</p>
                <p style={{ fontFamily: S }} className="text-xs text-[#6B6457] mt-1">Founder, Vietnamese Hangout</p>
              </div>
              <div className="mt-8">
                <Btn variant="primary" onClick={() => openWhatsApp()}>
                  Start planning <ArrowRight size={14} />
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the founders */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 md:py-28">
        <SectionLabel num="03" label="Who's building this" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {[
            {
              photo: tuanAnhPortrait,
              role: "Founder",
              name: "Tuấn Anh",
              headline: "University drop-out — left to build this for the world.",
              bio: "Comes from an information technology background — building the tech that makes planning a trip fast, convenient and easy, paired with a real human touch on the ground.",
            },
            {
              photo: chauAnhPortrait,
              role: "Co-Founder",
              name: "Châu Anh",
              headline: "VP of Ops at Fika, a social membership club.",
              bio: "Six years building products for communities from scratch — with a passion for solving people's pain points using state-of-the-art tech, with a touch of human.",
            },
          ].map((f) => (
            <div key={f.name} className="rounded-2xl border border-[rgba(25,23,19,0.1)] overflow-hidden bg-[#F5F2EC]">
              <img
                src={f.photo}
                alt={`${f.name}, ${f.role}`}
                className="w-full object-cover bg-[#E5E0D6]"
                style={{ aspectRatio: "4/5" }}
              />
              <div className="p-7">
                <p style={{ fontFamily: S }} className="text-[11px] uppercase tracking-wider text-[#004226] font-semibold mb-2">{f.role}</p>
                <p style={{ fontFamily: F }} className="text-lg font-semibold text-[#191713] mb-2">{f.name}</p>
                <p style={{ fontFamily: F }} className="text-xl font-semibold text-[#191713] leading-snug mb-3">
                  {f.headline}
                </p>
                <p style={{ fontFamily: S }} className="text-[14px] text-[#6B6457] leading-relaxed">
                  {f.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Trip detail page ─────────────────────────────────────────────────────────

function TripDetailPage({ tripId, setSelectedTripId, currency }: { tripId: string; setSelectedTripId: (id: string) => void; currency: "VND" | "USD" }) {
  const trip = TRIPS.find((t) => t.id === tripId) ?? TRIPS[0];
  const [groupSize, setGroupSize] = useState(2);
  const [activeDay, setActiveDay] = useState(0);
  const otherTrips = TRIPS.filter((t) => t.id !== trip.id);

  useEffect(() => {
    setActiveDay(0);
  }, [tripId]);

  return (
    <div className="pt-[60px] bg-[#F5F2EC]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-10 md:py-14">

        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 style={{ fontFamily: F }} className="text-[clamp(26px,3.2vw,38px)] font-bold text-[#191713] mb-2">
              {trip.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span style={{ fontFamily: S }} className="text-sm text-[#6B6457] flex items-center gap-1.5"><MapPin size={14} />{trip.region}</span>
              <button onClick={openInstagramProfile} style={{ fontFamily: S }} className="text-sm text-[#6B6457] flex items-center gap-1.5 hover:text-[#004226] transition-colors underline underline-offset-2">
                <Instagram size={14} />Reviews &amp; real trips on Instagram
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button style={{ fontFamily: S }} className="flex items-center gap-2 text-sm text-[#191713] border border-[rgba(25,23,19,0.15)] rounded-full px-4 py-2 hover:bg-white transition-colors">
              Share
            </button>
            <button style={{ fontFamily: S }} className="flex items-center gap-2 text-sm text-[#191713] border border-[rgba(25,23,19,0.15)] rounded-full px-4 py-2 hover:bg-white transition-colors">
              Save
            </button>
          </div>
        </div>

        {/* Photo gallery */}
        {trip.gallery.length > 1 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 mb-3">
              <img
                src={trip.gallery[0].src}
                alt={trip.gallery[0].alt}
                className="w-full object-cover rounded-2xl"
                style={{ height: 420 }}
              />
              <div className="hidden md:flex flex-col gap-3">
                {trip.gallery.slice(1, 3).map((g) => (
                  <img
                    key={g.src}
                    src={g.src}
                    alt={g.alt}
                    className="w-full object-cover rounded-2xl"
                    style={{ height: 204 }}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 mb-14">
              <p style={{ fontFamily: S }} className="text-[11px] italic text-[#6B6457]">{trip.gallery[0].caption}</p>
              <div className="hidden md:flex flex-col gap-3">
                {trip.gallery.slice(1, 3).map((g) => (
                  <p key={g.src} style={{ fontFamily: S }} className="text-[11px] italic text-[#6B6457]">{g.caption}</p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              src={trip.gallery[0].src}
              alt={trip.gallery[0].alt}
              className="w-full object-cover rounded-2xl mb-3"
              style={{ height: 420 }}
            />
            <p style={{ fontFamily: S }} className="text-[11px] italic text-[#6B6457] mb-14">{trip.gallery[0].caption}</p>
          </>
        )}

        {/* Quick facts card + description */}
        <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-10 mb-16">
          <div className="rounded-2xl border border-[rgba(25,23,19,0.1)] shadow-sm bg-white p-7 h-fit">
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-wider text-[#004226] font-semibold mb-2">
              Last vetted {trip.vettedDate}
            </p>
            <h2 style={{ fontFamily: F }} className="text-xl font-semibold text-[#191713] leading-snug mb-3">
              {trip.tagline}
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 py-4 my-1 border-y border-[rgba(25,23,19,0.1)]">
              <VetterChip vetter={trip.vetter} small />
              <span style={{ fontFamily: S }} className="text-xs text-[#6B6457] flex items-center gap-1.5"><Clock size={13} />{trip.duration}</span>
              <span style={{ fontFamily: S }} className="text-xs text-[#6B6457] flex items-center gap-1.5"><MapPin size={13} />{trip.region}</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <label style={{ fontFamily: S }} className="text-xs text-[#6B6457]">Travellers</label>
              <button onClick={() => setGroupSize((g) => Math.max(1, g - 1))} className="w-7 h-7 rounded-full border border-[rgba(25,23,19,0.2)] flex items-center justify-center text-[#191713] hover:bg-[#F5F2EC]">−</button>
              <span style={{ fontFamily: F }} className="text-base font-semibold text-[#191713] w-5 text-center tabular-nums">{groupSize}</span>
              <button onClick={() => setGroupSize((g) => Math.min(12, g + 1))} className="w-7 h-7 rounded-full border border-[rgba(25,23,19,0.2)] flex items-center justify-center text-[#191713] hover:bg-[#F5F2EC]">+</button>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: S }} className="text-xs text-[#6B6457]">Trip cost ({groupSize} {groupSize === 1 ? "traveller" : "travellers"})</span>
                <span style={{ fontFamily: F }} className="text-sm font-medium text-[#191713]">{formatPrice(trip.priceFrom * groupSize, currency)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: S }} className="text-xs text-[#6B6457]">Planning fee</span>
                <span style={{ fontFamily: F }} className="text-sm font-medium text-[#191713]">{formatPrice(PLANNING_FEE, currency)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[rgba(25,23,19,0.1)]">
              <div>
                <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-wider text-[#6B6457]">From</p>
                <p><span style={{ fontFamily: F }} className="text-2xl font-bold text-[#191713]">{formatPrice(trip.priceFrom, currency)}</span> <span style={{ fontFamily: S }} className="text-xs text-[#6B6457]">per person</span></p>
              </div>
              <button
                onClick={() => openWhatsApp()}
                style={{ fontFamily: S }}
                className="bg-[#004226] text-white rounded-full px-6 py-3 text-[15px] font-bold hover:bg-[#00331E] transition-colors"
              >
                Booking Now
              </button>
            </div>
            <p style={{ fontFamily: S }} className="text-[10px] text-[#6B6457] mt-3">
              No payment now. A planner replies within 24 hours. Trip cost is paid directly to suppliers, in your name.
            </p>
          </div>

          <div>
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-4">[Description]</p>
            <p style={{ fontFamily: S }} className="text-[15px] text-[#191713] leading-[1.8] mb-12">
              {trip.description}
            </p>

            {/* Itinerary — sits alongside the quick facts card, in the same column */}
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-2">[Travel plans]</p>
            <h2 style={{ fontFamily: F }} className="text-3xl font-bold text-[#191713] mb-1">Your Travel Itinerary</h2>
            <p style={{ fontFamily: S }} className="text-sm text-[#6B6457] mb-8">{trip.itinerary.length} days &middot; tap a day to see the plan.</p>

            <div className="max-w-2xl">
              {trip.itinerary.map((item, i) => {
                const open = i === activeDay;
                const isLast = i === trip.itinerary.length - 1;
                return (
                  <div key={item.day} className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        style={{ fontFamily: F }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${open ? "bg-[#004226] text-white" : "bg-white border border-[rgba(25,23,19,0.15)] text-[#191713]"}`}
                      >
                        {item.day}
                      </div>
                      {!isLast && <div className="w-px flex-1 bg-[rgba(25,23,19,0.15)] my-1" />}
                    </div>

                    <div className="flex-1 min-w-0 pb-6">
                      <button
                        onClick={() => setActiveDay(open ? -1 : i)}
                        className={`w-full flex items-center gap-4 text-left rounded-2xl border p-3 transition-colors ${open ? "border-[#004226]/30 bg-white shadow-sm" : "border-[rgba(25,23,19,0.1)] bg-white hover:border-[#004226]/25"}`}
                      >
                        <img
                          src={item.photo}
                          alt={item.location}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p style={{ fontFamily: S }} className="text-[11px] text-[#6B6457] flex items-center gap-1 mb-1">
                            <MapPin size={11} className="flex-shrink-0" /> Day {item.day} &middot; {item.location}
                          </p>
                          <p style={{ fontFamily: F }} className="text-[15px] font-semibold text-[#191713] leading-snug truncate">
                            {item.title}
                          </p>
                        </div>
                        {open
                          ? <ChevronUp size={16} className="flex-shrink-0 text-[#6B6457]" />
                          : <ChevronDown size={16} className="flex-shrink-0 text-[#6B6457]" />}
                      </button>

                      {open && (
                        <p style={{ fontFamily: S }} className="text-[14px] text-[#6B6457] leading-relaxed mt-4 px-1">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* What's covered */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10 mb-16 items-start">
          <div>
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-2">[What&apos;s included]</p>
            <h2 style={{ fontFamily: F }} className="text-3xl font-bold text-[#191713] mb-8">What&apos;s Covered in Your Experience</h2>
            <div>
              {trip.included.map((item) => (
                <Accordion key={item.label} question={item.label} answer={item.detail} />
              ))}
              <p style={{ fontFamily: S }} className="text-[12px] text-[#6B6457] mt-4">
                {trip.notIncluded}
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1748271151446-0013c0bc7061?w=700&h=900&fit=crop&auto=format"
            alt="Boats on the water at dusk, southern Vietnam"
            className="w-full object-cover rounded-2xl hidden md:block"
            style={{ aspectRatio: "4/5" }}
          />
        </div>

        {/* Explore more */}
        <div className="mb-16">
          <h2 style={{ fontFamily: F }} className="text-3xl font-bold text-[#191713] mb-1">Explore More Trips</h2>
          <p style={{ fontFamily: S }} className="text-sm text-[#6B6457] mb-8">Whether it&apos;s coast, highlands or the city — every trip is vetted the same way.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherTrips.map((t) => (
              <button key={t.id} onClick={() => { setSelectedTripId(t.id); window.scrollTo({ top: 0 }); }} className="text-left group">
                <div className="rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: "4/3" }}>
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <p style={{ fontFamily: F }} className="text-base font-semibold text-[#191713] mb-1">{t.name}</p>
                <p style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{t.region} &middot; {t.duration}</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-6">
            Frequently asked
          </p>
          {FAQS.map((f) => <Accordion key={f.question} question={f.question} answer={f.answer} />)}
        </div>
      </div>

      {/* Closing CTA banner */}
      <div className="px-6 md:px-16 pb-16 md:pb-20">
        <div className="max-w-[1440px] mx-auto relative rounded-3xl overflow-hidden" style={{ height: 340 }}>
          <img
            src="https://images.unsplash.com/photo-1751842839568-285b1ffdbd15?w=1600&h=900&fit=crop&auto=format"
            alt="Mountain pass road in Central Vietnam"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(25,23,19,0.55)]" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <h2 style={{ fontFamily: F }} className="text-[clamp(26px,3.5vw,42px)] font-bold text-white mb-3 max-w-xl">
              Uncover unique trips, tailored just for you
            </h2>
            <p style={{ fontFamily: S }} className="text-sm text-[rgba(255,255,255,0.8)] mb-6 max-w-md">
              We build every itinerary around what you actually want — then a named local checks it before you pay.
            </p>
            <button
              onClick={() => openWhatsApp()}
              style={{ fontFamily: S }}
              className="bg-white text-[#191713] rounded-full px-6 py-3 text-[15px] font-bold hover:bg-[#F5F2EC] transition-colors inline-flex items-center gap-2"
            >
              Get Started <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Vetting page ─────────────────────────────────────────────────────────────

function VettingPage() {
  return (
    <div className="pt-[60px]">
      {/* Header */}
      <div className="bg-[#004226] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.2em] text-[rgba(245,242,236,0.4)] mb-6">Our standard</p>
          <h1 style={{ fontFamily: F, lineHeight: 1.08 }} className="text-[clamp(40px,6vw,80px)] font-bold text-[#F5F2EC] max-w-3xl tracking-[-0.02em]">
            How we vet<br />every place<br />on this site.
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24">

        {/* What we check */}
        <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-12 md:gap-20 mb-20 pb-20 border-b border-[rgba(25,23,19,0.15)]">
          <div>
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.2em] text-[#6B6457] mb-4">What we check</p>
            <h2 style={{ fontFamily: F }} className="text-[32px] font-semibold text-[#191713] leading-snug mb-4">
              Six things every vetter must confirm before a place is listed.
            </h2>
            <p style={{ fontFamily: S }} className="text-sm text-[#6B6457] leading-relaxed">
              Our checklist was written after the first route verification trip in 2017 and has been revised once since, in 2021. It is deliberately short. Comprehensive checklists that no one follows are worse than none.
            </p>
          </div>
          <div className="space-y-0">
            {VETTING_CHECKS.map((c, i) => (
              <div key={c.label} className="flex gap-6 py-5 border-b border-[rgba(25,23,19,0.1)] last:border-0">
                <div style={{ fontFamily: F }} className="text-[32px] font-bold text-[rgba(25,23,19,0.1)] leading-none flex-shrink-0 w-10 pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p style={{ fontFamily: S }} className="text-sm font-semibold text-[#191713] mb-1">{c.label}</p>
                  <p style={{ fontFamily: S }} className="text-[13px] text-[#6B6457] leading-relaxed">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How often */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 pb-20 border-b border-[rgba(25,23,19,0.15)]">
          <div>
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.2em] text-[#6B6457] mb-4">Frequency</p>
            <h2 style={{ fontFamily: F }} className="text-[28px] font-semibold text-[#191713] leading-snug mb-4">
              We re-check every listing at least once every six months.
            </h2>
            <p style={{ fontFamily: S }} className="text-[14px] text-[#6B6457] leading-relaxed mb-4">
              Vietnam changes fast. Restaurants under new management taste different. Guesthouses get renovated or don&apos;t. Beaches that were quiet fill up. The &ldquo;last vetted&rdquo; date on every listing tells you when someone from our team was last on the ground.
            </p>
            <p style={{ fontFamily: S }} className="text-[14px] text-[#6B6457] leading-relaxed">
              If a place hasn&apos;t been checked in over a year — due to access issues, weather, or staffing — we either note it clearly or remove the listing until we can get back. We don&apos;t mark listings as current when they aren&apos;t.
            </p>
          </div>
          <div className="bg-[#EDE9E0] p-8">
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-6">Last vetted — example</p>
            <div className="space-y-5">
              {[
                { place: "Bà Thuý Cooking School, Hội An", vetter: "Tuấn Anh", date: "October 2024", status: "current" },
                { place: "Café Sớm Mai, Đà Lạt", vetter: "Tuấn Anh", date: "August 2024", status: "current" },
                { place: "Lăng Cô Guesthouse", vetter: "Tuấn Anh", date: "May 2024", status: "current" },
                { place: "Floating market, Cần Thơ (Sector 3)", vetter: "Tuấn Anh", date: "March 2024", status: "review" },
              ].map((p) => (
                <div key={p.place} className="flex items-start gap-4 pb-4 border-b border-[rgba(25,23,19,0.08)] last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: S }} className="text-sm font-medium text-[#191713] truncate">{p.place}</p>
                    <p style={{ fontFamily: S }} className="text-[11px] text-[#6B6457]">by {p.vetter}</p>
                  </div>
                  <LastVettedBadge date={p.date} small />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What gets rejected */}
        <div className="mb-20">
          <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.2em] text-[#6B6457] mb-4">What gets rejected</p>
          <h2 style={{ fontFamily: F }} className="text-[28px] font-semibold text-[#191713] leading-snug mb-8 max-w-lg">
            Most places we visit don&apos;t make the list. Here&apos;s why.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                reason: "Pricing inconsistency",
                detail: "If the price quoted to our vetters doesn't match what tourists are charged on arrival, we reject. This is more common than it should be, and we catch it because we go back unannounced.",
              },
              {
                reason: "Changed ownership",
                detail: "A place we loved in 2022 can become mediocre after a management change. We check ownership at every visit. If it's changed and we haven't re-evaluated the new management, the listing comes down.",
              },
              {
                reason: "Tourism damage",
                detail: "Some places we recommended heavily are no longer on the list because we recommended them heavily. If the thing that made a place special has been worn away by volume, we note it and often stop listing it.",
              },
            ].map((r, i) => (
              <div key={r.reason} className="pt-6 border-t-2 border-[#004226]">
                <p style={{ fontFamily: F }} className="text-2xl font-bold text-[rgba(25,23,19,0.2)] leading-none mb-3">0{i + 1}</p>
                <p style={{ fontFamily: S }} className="text-sm font-semibold text-[#191713] mb-2">{r.reason}</p>
                <p style={{ fontFamily: S }} className="text-[13px] text-[#6B6457] leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedTripId, setSelectedTripId] = useState(TRIPS[0].id);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [currency, setCurrency] = useState<"VND" | "USD">("USD");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  return (
    <div className="bg-[#F5F2EC] min-h-screen">
      <Toaster position="top-center" richColors />
      <Nav setPage={setPage} language={language} setLanguage={setLanguage} currency={currency} setCurrency={setCurrency} />

      <main>
        {page === "home" && <HomePage setPage={setPage} setSelectedTripId={setSelectedTripId} language={language} currency={currency} />}
        {page === "trip" && <TripDetailPage tripId={selectedTripId} setSelectedTripId={setSelectedTripId} currency={currency} />}
        {page === "vetting" && <VettingPage />}
        {page === "people" && <OurPeoplePage />}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
