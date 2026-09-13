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
import nhatHaoAvatar from "../assets/team/nhat-hao-full.jpg";
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
  {
    name: "Nhật Hào",
    role: "Local team member",
    region: "Tây Ninh",
    photo: nhatHaoAvatar,
  },
];

const ITINERARY_MEKONG = [
  {
    day: 1,
    location: { EN: "Cần Thơ", ES: "Cần Thơ", ZH: "Cần Thơ", KO: "Cần Thơ" },
    title: { EN: "Mùa Xuân reserve, then the city", ES: "La reserva Mùa Xuân, luego la ciudad", ZH: "先游穆春保护区，再进城", KO: "무아쑤언 보호구역, 그다음 시내로" },
    note: { EN: "We meet you at the gate of Mùa Xuân Eco-Tourism Area — lunch first, then a sampan through the melaleuca forest and up the 25-metre viewing tower over the rice fields. You're checked into Y Hotel by evening; bánh xèo at Bánh Xèo 7 Tới and the riverfront walking street after. Early night — tomorrow starts at 04:45. — Tuấn Anh", ES: "Nos encontramos en la entrada del Área Ecoturística Mùa Xuân — primero el almuerzo, luego un paseo en sampán por el bosque de melaleuca y la torre mirador de 25 metros sobre los arrozales. Por la tarde-noche te registras en el Y Hotel; después, bánh xèo en Bánh Xèo 7 Tới y un paseo por la calle peatonal junto al río. Noche corta — mañana empezamos a las 04:45. — Tuấn Anh", ZH: "我们在穆春生态旅游区门口与您会合——先享用午餐，再乘坐小船穿过白千层林，登上25米高的观景塔俯瞰稻田。傍晚入住Y酒店，随后前往Bánh Xèo 7 Tới品尝越式煎饼，并沿江边步行街散步。请早点休息，明天04:45就要出发。——Tuấn Anh", KO: "무아쑤언 생태관광지구 입구에서 만나 먼저 점심을 드신 뒤, 삼판 배를 타고 멜라루카 숲을 지나 논이 내려다보이는 25미터 전망대에 오릅니다. 저녁 무렵 Y 호텔에 체크인하시고, 이후 Bánh Xèo 7 Tới에서 반쎄오를 즐기신 다음 강변 산책로를 걷습니다. 내일은 새벽 04:45 출발이니 일찍 잠자리에 드세요. — Tuấn Anh" },
    photo: mekongBambooCanal,
  },
  {
    day: 2,
    location: { EN: "Cái Răng & Cồn Sơn", ES: "Cái Răng y Cồn Sơn", ZH: "Cái Răng 与 Cồn Sơn", KO: "Cái Răng & Cồn Sơn" },
    title: { EN: "The floating market before the traders leave", ES: "El mercado flotante antes de que se vayan los comerciantes", ZH: "赶在商贩收摊前的水上市场", KO: "상인들이 떠나기 전 수상시장" },
    note: { EN: "Boat out at 05:00 to catch Cái Răng at its busiest hour, breakfast eaten the way the traders eat it — bún on the boat. Then across to Cồn Sơn: the floating fish farms, a cooking class that doubles as your lunch, and a hammock in the afternoon because you've been up since before dawn. — Tuấn Anh", ES: "Salimos en barco a las 05:00 para llegar a Cái Răng en su hora de mayor movimiento, desayunando como lo hacen los comerciantes — bún a bordo del barco. Luego cruzamos a Cồn Sơn: las granjas flotantes de peces, una clase de cocina que también es tu almuerzo, y una hamaca por la tarde porque llevas despierto desde antes del amanecer. — Tuấn Anh", ZH: "早上5点出发乘船，赶在最热闹的时段抵达Cái Răng水上市场，像商贩一样在船上吃碗米线当早餐。随后前往Cồn Sơn：参观水上养鱼场，参加一堂顺便当作午餐的烹饪课，下午则可以在吊床上小憩——毕竟您从天没亮就开始忙碌了。——Tuấn Anh", KO: "새벽 5시에 배를 타고 출발해 가장 붐비는 시간대의 Cái Răng 수상시장에 도착하며, 상인들처럼 배 위에서 쌀국수(분)로 아침을 먹습니다. 이후 Cồn Sơn으로 건너가 수상 양어장을 둘러보고, 점심을 겸한 요리 수업에 참여합니다. 새벽부터 움직이셨으니 오후에는 해먹에서 편히 쉬세요. — Tuấn Anh" },
    photo: mekongSunsetBoat,
  },
  {
    day: 3,
    location: { EN: "Fly to Côn Đảo", ES: "Vuelo a Côn Đảo", ZH: "飞往昆岛", KO: "꼰다오로 비행" },
    title: { EN: "Straight off the plane and into the water", ES: "Directo del avión al agua", ZH: "下飞机直接下水", KO: "비행기에서 내리자마자 바다로" },
    note: { EN: "Domestic flight Cần Thơ to Côn Đảo, then no time wasted — snorkelling over the reef the same afternoon, then across to Hòn Bảy Cạnh to settle into a tent before the park's turtle programme starts. This departure is fixed; the boat does not wait. — Tuấn Anh", ES: "Vuelo doméstico de Cần Thơ a Côn Đảo, y sin perder tiempo: snorkel sobre el arrecife esa misma tarde, luego cruzamos a Hòn Bảy Cạnh para instalarnos en una tienda de campaña antes de que empiece el programa de tortugas del parque. Esta salida es a hora fija; el barco no espera. — Tuấn Anh", ZH: "从芹苴飞往昆岛的国内航班抵达后，我们不浪费一分钟——当天下午就在珊瑚礁浮潜，随后前往Hòn Bảy Cạnh，在公园的护龟项目开始前安顿好帐篷。这趟出发时间是固定的，船不会等人。——Tuấn Anh", KO: "껀터에서 꼰다오까지 국내선 비행 후 바로 이동합니다 — 그날 오후 바로 산호초 스노클링을 즐기고, 이어서 Hòn Bảy Cạnh으로 건너가 국립공원의 바다거북 프로그램이 시작되기 전 텐트에 짐을 풉니다. 이 출발 시간은 고정되어 있어 배가 기다려주지 않습니다. — Tuấn Anh" },
    photo: conDaoPier,
  },
  {
    day: 4,
    location: { EN: "Hòn Bảy Cạnh", ES: "Hòn Bảy Cạnh", ZH: "Hòn Bảy Cạnh", KO: "Hòn Bảy Cạnh" },
    title: { EN: "The night the turtles come ashore", ES: "La noche en que las tortugas llegan a la orilla", ZH: "海龟上岸产卵之夜", KO: "바다거북이 산란하러 오는 밤" },
    note: { EN: "You wait on the beach with a park ranger — the hour is set by the tide, not by us, but across the season 95% of guests see it. Hatchlings go back to the sea at first light while the sand is still cool. Then back to Côn Đảo town for a proper shower and a nap. — Tuấn Anh", ES: "Esperas en la playa junto a un guardabosques del parque — la hora la marca la marea, no nosotros, pero durante la temporada el 95% de los huéspedes logra verlo. Las crías vuelven al mar con las primeras luces, mientras la arena aún está fresca. Después, de regreso a la ciudad de Côn Đảo para una ducha como corresponde y una siesta. — Tuấn Anh", ZH: "您将和公园护林员一起在海滩上等候——具体时间由潮汐决定，而非我们能控制，但整个季节下来95%的客人都能亲眼见证。孵化的小海龟会在天刚亮、沙子还凉爽的时候被放归大海。之后返回昆岛镇，好好冲个澡、小睡一下。——Tuấn Anh", KO: "국립공원 레인저와 함께 해변에서 기다립니다 — 정확한 시각은 저희가 아닌 조수 시간에 따라 정해지지만, 시즌 전체로 보면 95%의 손님이 실제로 목격합니다. 부화한 새끼 거북들은 모래가 아직 서늘한 이른 아침 빛과 함께 바다로 돌아갑니다. 이후 꼰다오 시내로 돌아가 제대로 샤워하고 낮잠을 즐기세요. — Tuấn Anh" },
    photo: conDaoTurtleHatchlings,
  },
  {
    day: 5,
    location: { EN: "Côn Đảo", ES: "Côn Đảo", ZH: "Côn Đảo", KO: "Côn Đảo" },
    title: { EN: "The island's finest beach, then the flight home", ES: "La mejor playa de la isla, luego el vuelo de regreso", ZH: "岛上最美海滩，随后启程回家", KO: "섬에서 가장 아름다운 해변, 그리고 귀국 비행" },
    note: { EN: "Bãi Đầm Trầu in the late morning — planes come in low over the sand, it's worth timing your visit around one. In the afternoon, the old prison complex: Côn Đảo was a penal island for over a century, and it's a part of the country's history worth sitting with before you fly back. — Tuấn Anh", ES: "Bãi Đầm Trầu a media mañana — los aviones pasan bajo sobre la arena, vale la pena programar tu visita alrededor de uno. Por la tarde, el antiguo complejo penitenciario: Côn Đảo fue una isla-prisión durante más de un siglo, y es una parte de la historia del país que vale la pena conocer antes de volar de regreso. — Tuấn Anh", ZH: "上午前往Đầm Trầu海滩——飞机会低空掠过沙滩上空，不妨算好时间去看一次。下午参观昔日的监狱建筑群：昆岛曾作为关押重犯的岛屿长达一个多世纪，这段历史值得您在返程前静心了解。——Tuấn Anh", KO: "늦은 오전에는 Đầm Trầu 해변으로 — 비행기가 백사장 위로 낮게 지나가니, 그 시간에 맞춰 방문하시면 좋습니다. 오후에는 옛 형무소 단지를 둘러봅니다. 꼰다오는 한 세기 넘게 유배지로 쓰였던 섬으로, 귀국 비행 전에 한 번쯤 마주할 가치가 있는 베트남 역사의 한 부분입니다. — Tuấn Anh" },
    photo: conDaoPier,
  },
];

const ITINERARY_DALAT = [
  {
    day: 1,
    location: { EN: "Đà Lạt", ES: "Đà Lạt", ZH: "Đà Lạt", KO: "Đà Lạt" },
    title: { EN: "A slow arrival after the sleeper bus", ES: "Una llegada tranquila tras el bus nocturno", ZH: "夜间大巴后的悠闲抵达", KO: "슬리핑 버스 후의 느긋한 도착" },
    note: { EN: "You land in Đà Lạt on the overnight bus and go straight to a quiet farmhouse homestay to rest and drink coffee before anything starts. Late morning is a scenic viewpoint over the pine forests and valleys, then an unhurried lunch at a garden restaurant. The afternoon is yours — a gentle walk or just the view from where you're staying — before sunset coffee over the hills and dinner at a cozy local spot. — Di Thạch", ES: "Llegas a Đà Lạt en el bus nocturno y vas directo a un tranquilo homestay tipo granja para descansar y tomar un café antes de que empiece nada. A media mañana, un mirador panorámico sobre los bosques de pinos y los valles, seguido de un almuerzo relajado en un restaurante con jardín. La tarde es tuya — un paseo tranquilo o simplemente disfrutar de la vista desde donde te alojas — antes de un café al atardecer sobre las colinas y cena en un lugar local y acogedor. — Di Thạch", ZH: "夜间大巴抵达大叻后，直接前往一处安静的农家民宿休息、喝杯咖啡，然后再开始行程。上午稍晚会前往能俯瞰松林与山谷的观景点，接着在花园餐厅享用一顿从容的午餐。下午完全自由——可以悠闲散步，或就在住处欣赏风景——傍晚在山间咖啡馆看日落，晚餐则在一家温馨的本地小店解决。——Di Thạch", KO: "야간 슬리핑 버스로 달랏에 도착해 곧바로 조용한 농가형 홈스테이로 이동, 아무 일정 없이 휴식을 취하고 커피를 마십니다. 늦은 오전에는 소나무 숲과 계곡이 내려다보이는 전망대를 둘러본 뒤, 정원이 있는 식당에서 여유롭게 점심을 드십니다. 오후는 자유 시간 — 가볍게 산책하시거나 숙소에서 풍경을 즐기시면 됩니다 — 저녁에는 언덕 위에서 노을을 보며 커피를 마시고, 아늑한 현지 식당에서 저녁 식사를 합니다. — Di Thạch" },
    photo: "https://images.unsplash.com/photo-1552310065-aad9ebece999?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 2,
    location: { EN: "Đà Lạt countryside & Tuyền Lâm Lake", ES: "Zona rural de Đà Lạt y lago Tuyền Lâm", ZH: "大叻乡间与绥林湖", KO: "달랏 근교와 뚜옌럼 호수" },
    title: { EN: "Coffee farms and a lake with nowhere to be", ES: "Fincas de café y un lago sin prisas", ZH: "咖啡庄园与不慌不忙的湖畔时光", KO: "커피 농장과 서두를 필요 없는 호수" },
    note: { EN: "A short drive out to a coffee or tea plantation to see how highland Arabica is actually grown, then lunch at a family-run countryside restaurant. In the afternoon we take a boat out on Tuyền Lâm Lake and walk the shore — no schedule pushing you along. The evening is free: relax in town or find a quiet dinner on your own. — Di Thạch", ES: "Una corta salida a una plantación de café o té para ver cómo se cultiva realmente el Arábica de las tierras altas, seguida de un almuerzo en un restaurante rural familiar. Por la tarde salimos en barco por el lago Tuyền Lâm y caminamos por la orilla — sin ningún horario que te apure. La noche es libre: relájate en la ciudad o busca por tu cuenta una cena tranquila. — Di Thạch", ZH: "短途前往咖啡或茶园，实地了解高原阿拉比卡咖啡的种植方式，随后在一家家庭经营的乡村餐厅享用午餐。下午乘船游览绥林湖，沿岸漫步——没有任何日程催促您。晚上完全自由：可以在市区放松，或自行寻一处安静的地方用晚餐。——Di Thạch", KO: "고원 아라비카 커피가 실제로 어떻게 재배되는지 살펴보기 위해 커피 또는 차 농장으로 짧게 이동한 뒤, 가족이 운영하는 시골 식당에서 점심을 즐깁니다. 오후에는 뚜옌럼 호수에서 배를 타고 호숫가를 걷습니다 — 서두를 일정이 전혀 없습니다. 저녁은 자유 시간으로, 시내에서 편히 쉬시거나 원하시는 곳에서 조용히 저녁 식사를 하시면 됩니다. — Di Thạch" },
    photo: "https://images.unsplash.com/photo-1626608017817-211d7c48177d?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 3,
    location: { EN: "Đà Lạt", ES: "Đà Lạt", ZH: "Đà Lạt", KO: "Đà Lạt" },
    title: { EN: "The market, a pagoda, and one last coffee with a view", ES: "El mercado, una pagoda y un último café con vistas", ZH: "市场、寺庙，与最后一杯风景咖啡", KO: "시장, 사원, 그리고 마지막 전망 커피" },
    note: { EN: "Morning starts at Đà Lạt's local market to see the produce and the daily rhythm of the town, then a peaceful pagoda with mountain views. We stop at a scenic café overlooking the valley before an easy walk through a pine forest trail — nothing steep. Lunch before the sleeper bus back to Ho Chi Minh City, or onward if you're continuing the trip. — Di Thạch", ES: "La mañana comienza en el mercado local de Đà Lạt para ver los productos y el ritmo diario de la ciudad, seguida de una pagoda tranquila con vistas a las montañas. Paramos en un café panorámico frente al valle antes de una caminata fácil por un sendero de bosque de pinos — nada empinado. Almuerzo antes del bus nocturno de regreso a Ciudad Ho Chi Minh, o hacia tu próximo destino si continúas el viaje. — Di Thạch", ZH: "早晨从大叻本地市场开始，感受当地物产与日常节奏，随后前往一座可远眺群山的宁静寺庙。途中在能俯瞰山谷的观景咖啡馆稍作停留，再沿松林步道轻松漫步——全程平坦不费力。午餐后乘坐夜间大巴返回胡志明市，如果继续行程，也可由此前往下一站。——Di Thạch", KO: "아침은 달랏 현지 시장에서 시작해 지역 특산물과 일상의 활기를 느껴보고, 이어서 산 전망이 아름다운 조용한 사원으로 이동합니다. 계곡이 내려다보이는 전망 좋은 카페에 들른 뒤, 가파르지 않은 소나무 숲길을 편안하게 걷습니다. 점심 식사 후에는 야간 버스로 호치민시로 돌아가시거나, 여행을 계속하신다면 다음 목적지로 이동합니다. — Di Thạch" },
    photo: "https://images.unsplash.com/photo-1678099006439-dba9e4d3f9f5?w=400&h=400&fit=crop&auto=format",
  },
];

const ITINERARY_FOOD = [
  {
    day: 1,
    location: { EN: "Ho Chi Minh City", ES: "Ciudad Ho Chi Minh", ZH: "胡志明市", KO: "호치민시" },
    title: { EN: "First bites, no rush", ES: "Primeros bocados, sin prisa", ZH: "初尝美味，不慌不忙", KO: "첫 한 입, 서두르지 않게" },
    note: { EN: "Straight from Tân Sơn Nhất to your hotel in District 1 — check in, freshen up, and let the city come to you rather than the other way round. A gentle evening food walk covers bánh mì, chè and street-side phở, finished with your first proper Vietnamese iced coffee at a pavement café. Nothing structured tonight — tomorrow is the real start. — Tuấn Anh", ES: "Directo desde Tân Sơn Nhất a tu hotel en el Distrito 1 — check-in, refrescarte y dejar que la ciudad venga a ti en lugar de lo contrario. Una tranquila caminata gastronómica por la noche recorre bánh mì, chè y phở callejero, terminando con tu primer café vietnamita helado como corresponde en una cafetería de la acera. Nada estructurado esta noche — mañana empieza lo serio. — Tuấn Anh", ZH: "从新山一机场直接前往第一郡的酒店——办理入住、稍作整理，今晚让城市主动向您展开，而不是您急着去追赶它。傍晚的美食漫步会带您品尝法棍三明治、越式甜品和街边河粉，最后在路边咖啡馆喝上一杯地道的越南冰咖啡收尾。今晚不安排具体行程——真正的旅程从明天开始。——Tuấn Anh", KO: "떤선녓 공항에서 곧바로 1군 호텔로 이동합니다 — 체크인 후 짐을 풀고, 오늘은 도시를 쫓아다니기보다 도시가 다가오게 두세요. 저녁에는 여유로운 미식 산책으로 반미, 째, 길거리 퍼를 맛보고, 노상 카페에서 처음 맛보는 진짜 베트남 아이스커피로 마무리합니다. 오늘 밤은 별다른 일정 없이 — 진짜 시작은 내일부터입니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 2,
    location: { EN: "Ho Chi Minh City", ES: "Ciudad Ho Chi Minh", ZH: "胡志明市", KO: "호치민시" },
    title: { EN: "Coffee culture by morning, backstreets by scooter at night", ES: "Cultura del café por la mañana, callejones en scooter por la noche", ZH: "清晨咖啡文化，夜晚摩托车穿梭小巷", KO: "아침엔 커피 문화, 밤엔 스쿠터로 골목 탐방" },
    note: { EN: "From 9am we walk through Vietnamese café culture — phin-drip to egg coffee — then into a local wet market and past the Reunification Palace and Bến Thành. The afternoon is free; use it or rest. After dark, a xe ôm scooter tour through Saigon's backstreets for bánh xèo, bún bò Huế and hủ tiếu at the stalls locals actually queue for. — Tuấn Anh", ES: "Desde las 9am recorremos la cultura del café vietnamita — desde el phin hasta el café de huevo — luego un mercado local y pasamos por el Palacio de la Reunificación y Bến Thành. La tarde es libre; úsala o descansa. Al anochecer, un tour en scooter (xe ôm) por los callejones de Saigón para probar bánh xèo, bún bò Huế y hủ tiếu en los puestos donde realmente hacen fila los locales. — Tuấn Anh", ZH: "上午9点开始，我们将带您深入了解越南咖啡文化——从滴漏咖啡到鸡蛋咖啡，随后逛逛本地菜市场，途经统一宫和滨城市场。下午自由活动，可自行安排或休息。入夜后，乘坐摩托车穿梭西贡的大街小巷，品尝越式煎饼、顺化牛肉米线，以及本地人真正排队光顾的粿条摊。——Tuấn Anh", KO: "오전 9시부터 필터커피부터 에그커피까지 베트남 커피 문화를 두루 체험하고, 이어서 현지 재래시장과 통일궁, 벤타인 시장을 둘러봅니다. 오후는 자유 시간으로, 원하시는 대로 보내시거나 쉬셔도 좋습니다. 해가 진 뒤에는 쎄옴(오토바이) 투어로 사이공의 뒷골목을 누비며 반쎄오, 분보후에, 그리고 현지인들이 실제로 줄 서는 노점의 후띠에우를 맛봅니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1748596161492-0ebbc90489a5?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 3,
    location: { EN: "Mekong Delta – Cần Thơ", ES: "Delta del Mekong – Cần Thơ", ZH: "湄公河三角洲——芹苴", KO: "메콩 델타 – 껀터" },
    title: { EN: "Into the delta, floating market and all", ES: "Al delta, con mercado flotante incluido", ZH: "深入三角洲，水上市场初体验", KO: "델타 속으로, 수상시장까지" },
    note: { EN: "About three hours south to Cần Thơ, timed for Cái Răng floating market while the boats are still loaded with fruit and vegetables. A canal ride through the waterways, an orchard stop for rambutan and dragon fruit straight off the tree, then an organic farm in the afternoon. You check into a riverside homestay on Cồn Sơn for a dinner of real Mekong specialities. — Tuấn Anh", ES: "Unas tres horas al sur hacia Cần Thơ, calculadas para llegar al mercado flotante de Cái Răng mientras los barcos aún están cargados de frutas y verduras. Un paseo en barco por los canales, una parada en un huerto para probar rambután y pitaya recién cortados del árbol, y luego una granja orgánica por la tarde. Te alojas en un homestay junto al río en Cồn Sơn para cenar auténticas especialidades del Mekong. — Tuấn Anh", ZH: "驱车南下约三小时抵达芹苴，时间正好赶上Cái Răng水上市场满载水果蔬菜的繁忙时刻。乘船穿行水道，停靠果园现摘红毛丹与火龙果，下午再参观一处有机农场。晚上入住Cồn Sơn江边民宿，享用地道的湄公河特色晚餐。——Tuấn Anh", KO: "남쪽으로 약 세 시간을 달려 껀터에 도착하며, 배들이 과일과 채소를 가득 싣고 있는 가장 분주한 시간대에 맞춰 Cái Răng 수상시장을 둘러봅니다. 운하를 따라 배를 타고, 과수원에 들러 갓 딴 람부탄과 용과를 맛본 뒤 오후에는 유기농 농장을 방문합니다. 저녁은 Cồn Sơn의 강변 홈스테이에 머물며 진짜 메콩 특산 요리로 식사합니다. — Tuấn Anh" },
    photo: mekongBambooCanal,
  },
  {
    day: 4,
    location: { EN: "Cần Thơ → Hội An (via Đà Nẵng)", ES: "Cần Thơ → Hội An (vía Đà Nẵng)", ZH: "芹苴 → 会安（经岘港）", KO: "껀터 → 호이안 (다낭 경유)" },
    title: { EN: "One last boat ride, then north", ES: "Un último paseo en barco, y luego al norte", ZH: "最后一次乘船，随后北上", KO: "마지막 뱃놀이, 그리고 북쪽으로" },
    note: { EN: "A relaxed final morning in the delta — one more boat ride or a walk through the farm — before the flight up to Đà Nẵng and on to Hội An by car. Check-in is at a boutique hotel just outside the Ancient Town. Keep the first evening loose: cao lầu, white rose dumplings, and a walk through the lantern-lit Old Town. — Tuấn Anh", ES: "Una última mañana tranquila en el delta — un paseo más en barco o una caminata por la granja — antes del vuelo hacia Đà Nẵng y luego hasta Hội An en auto. El check-in es en un hotel boutique justo a las afueras del Casco Antiguo. Deja la primera noche libre: cao lầu, bánh bao vạc (rosa blanca) y un paseo por el Casco Antiguo iluminado con farolillos. — Tuấn Anh", ZH: "在三角洲度过悠闲的最后一个上午——可以再乘一次船，或到农场走走——随后飞往岘港，再驱车前往会安。入住古镇外围一家精品酒店。第一晚不做安排，随性而为：品尝高楼面、白玫瑰饺，在灯笼点亮的古镇漫步。——Tuấn Anh", KO: "델타에서 느긋한 마지막 아침을 보냅니다 — 뱃놀이를 한 번 더 즐기시거나 농장을 거니셔도 좋습니다 — 이후 다낭으로 비행 후 차로 호이안까지 이동합니다. 올드타운 바로 외곽의 부티크 호텔에 체크인합니다. 첫날 저녁은 일정 없이 자유롭게: 까오러우, 화이트로즈 만두를 맛보고 등불이 켜진 올드타운을 거닐어보세요. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1761150285751-c593ab20159c?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 5,
    location: { EN: "Hội An", ES: "Hội An", ZH: "Hội An", KO: "Hội An" },
    title: { EN: "Market to table — the cooking class day", ES: "Del mercado a la mesa — el día de la clase de cocina", ZH: "从市场到餐桌——烹饪课之日", KO: "시장에서 식탁까지 — 요리 수업의 날" },
    note: { EN: "We start at the morning market with a local chef, choosing what you'll cook, then across to Trà Quế herb garden to see what makes Hội An's food taste the way it does. The hands-on class covers four or five dishes — bánh xèo, fresh spring rolls, cao lầu — and you sit down to eat what you made with rice wine. Recipe booklet included; the afternoon is yours for the Old Town, tailors or the Thu Bồn riverside. — Tuấn Anh", ES: "Empezamos en el mercado matutino con un chef local, eligiendo lo que vas a cocinar, luego pasamos al jardín de hierbas de Trà Quế para ver qué le da a la comida de Hội An su sabor característico. La clase práctica cubre cuatro o cinco platos — bánh xèo, rollitos primavera frescos, cao lầu — y te sientas a comer lo que preparaste con vino de arroz. Incluye un cuadernillo de recetas; la tarde es tuya para el Casco Antiguo, los sastres o la ribera del río Thu Bồn. — Tuấn Anh", ZH: "清晨与本地厨师一同前往市场，挑选您要烹饪的食材，随后前往茶桂香草园，了解会安美食风味的秘密所在。这堂实操课将教您制作四到五道菜——越式煎饼、鲜春卷、高楼面——完成后即可搭配米酒品尝自己的成果。附赠食谱手册；下午可自由安排，逛古镇、订制衣物，或沿秋盆河畔散步。——Tuấn Anh", KO: "현지 셰프와 함께 아침 시장에서 요리할 재료를 직접 고르는 것으로 시작해, 짜꾸에 허브 마을로 이동해 호이안 음식만의 맛의 비밀을 알아봅니다. 실습 수업에서는 반쎄오, 생춘권, 까오러우 등 네다섯 가지 요리를 배우고, 완성한 요리를 쌀술과 함께 맛봅니다. 레시피 소책자가 포함되며, 오후는 자유 시간으로 올드타운 구경, 맞춤 의상 제작, 투본강변 산책 등을 즐기시면 됩니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1560733093-b31456d43374?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 6,
    location: { EN: "Hội An countryside", ES: "Zona rural de Hội An", ZH: "会安乡间", KO: "호이안 근교" },
    title: { EN: "Rice paddies by bicycle", ES: "Arrozales en bicicleta", ZH: "骑行稻田间", KO: "자전거로 둘러보는 논길" },
    note: { EN: "A morning ride out through rice paddies and rural villages to Cẩm Thanh's coconut forest for the traditional basket-boat spin. Trà Quế vegetable village is next — meet the farmers, get your hands in the garden — followed by a farm-to-table lunch from what's grown on site. Expect a seafood dinner by the Thu Bồn or on Cửa Đại beach to close out one of the best-looking days of the trip. — Tuấn Anh", ES: "Un paseo matutino en bicicleta por arrozales y pueblos rurales hasta el bosque de cocoteros de Cẩm Thanh para dar la vuelta tradicional en el bote-cesta. Luego, el pueblo de vegetales de Trà Quế — conoce a los agricultores, ensúciate las manos en el huerto — seguido de un almuerzo de la granja a la mesa con lo cultivado allí mismo. Espera una cena de mariscos junto al Thu Bồn o en la playa de Cửa Đại para cerrar uno de los días más bonitos del viaje. — Tuấn Anh", ZH: "清晨骑车穿越稻田与乡村，前往锦青椰林体验传统的簸箕船打转。接着来到茶桂蔬菜村，与当地菜农交流、亲手体验田间劳作，随后享用一顿食材全部产自现场的农场直供午餐。傍晚可在秋盆河畔或Cửa Đại海滩享用海鲜晚餐，为本次旅程中风景最美的一天画上句号。——Tuấn Anh", KO: "아침에는 자전거를 타고 논과 시골 마을을 지나 껌탄 코코넛 숲으로 이동해 전통 바구니배 회전 체험을 합니다. 이어서 짜꾸에 채소 마을에서 농부들을 만나고 직접 텃밭 일을 체험한 뒤, 현장에서 재배한 재료로 만든 팜투테이블 점심을 즐깁니다. 저녁에는 투본강변이나 끄어다이 해변에서 해산물 저녁 식사를 하며 이번 여행에서 가장 아름다운 하루를 마무리합니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1579518030577-b4a62b368886?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 7,
    location: { EN: "Hải Vân Pass → Đà Nẵng", ES: "Paso de Hải Vân → Đà Nẵng", ZH: "海云关 → 岘港", KO: "하이반 고개 → 다낭" },
    title: { EN: "The coast road, then Mì Quảng", ES: "La carretera costera, y luego Mì Quảng", ZH: "沿海公路，随后品尝广南面", KO: "해안도로, 그리고 미꽝" },
    note: { EN: "Mid-morning departure by private car over Hải Vân Pass — French-era bunkers, coastal cliffs, one of the country's best drives. We drop down to Lăng Cô lagoon for a seafood lunch by the water before continuing into Đà Nẵng, checking in near Mỹ Khê beach. In the evening: Mì Quảng, Đà Nẵng's own noodle, plus bánh xèo and skewers on the street. — Tuấn Anh", ES: "Salida a media mañana en auto privado sobre el Paso de Hải Vân — búnkeres de la era francesa, acantilados costeros, una de las mejores rutas del país. Bajamos hasta la laguna de Lăng Cô para un almuerzo de mariscos junto al agua antes de continuar hacia Đà Nẵng, con check-in cerca de la playa de Mỹ Khê. Por la noche: Mì Quảng, el fideo propio de Đà Nẵng, además de bánh xèo y brochetas en la calle. — Tuấn Anh", ZH: "上午稍晚乘私人轿车翻越海云关——沿途可见法属时期的碉堡与海岸悬崖，堪称越南最美公路之一。下山后在Lăng Cô泻湖享用一顿临海海鲜午餐，随后继续前往岘港，入住美溪海滩附近的酒店。晚上品尝岘港特色面食——广南面，以及街边的越式煎饼与烤串。——Tuấn Anh", KO: "오전 늦게 전용 차량으로 하이반 고개를 넘습니다 — 프랑스 식민지 시대의 벙커와 해안 절벽이 이어지는, 베트남에서 손꼽히는 드라이브 코스입니다. 랑꼬 라군으로 내려가 물가에서 해산물 점심을 즐긴 뒤, 다낭으로 이동해 미케 해변 근처 숙소에 체크인합니다. 저녁에는 다낭의 대표 국수 미꽝과 함께 길거리 반쎄오, 꼬치 요리를 맛봅니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1751842839568-285b1ffdbd15?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 8,
    location: { EN: "Đà Nẵng", ES: "Đà Nẵng", ZH: "Đà Nẵng", KO: "Đà Nẵng" },
    title: { EN: "One last coffee before you fly", ES: "Un último café antes de volar", ZH: "起飞前的最后一杯咖啡", KO: "비행 전 마지막 커피 한 잔" },
    note: { EN: "A slow last morning — a final Vietnamese iced coffee, one more pass through the market if there's time — before the transfer to Đà Nẵng airport. Nothing scheduled after breakfast; we build the timing of the day around whatever flight takes you home. — Tuấn Anh", ES: "Una última mañana tranquila — un café vietnamita helado final, quizás otra vuelta por el mercado si hay tiempo — antes del traslado al aeropuerto de Đà Nẵng. Nada programado después del desayuno; organizamos el día según el horario de tu vuelo de regreso. — Tuấn Anh", ZH: "悠闲的最后一个上午——再喝一杯越南冰咖啡，如果时间允许，可以再逛一次市场——随后前往岘港机场。早餐之后不再安排具体行程，一切以您回程航班的时间为准。——Tuấn Anh", KO: "느긋한 마지막 아침 — 마지막 베트남 아이스커피 한 잔, 시간이 되면 시장을 한 번 더 둘러보셔도 좋습니다 — 이후 다낭 공항으로 이동합니다. 아침 식사 이후에는 별도 일정 없이, 귀국 항공편 시간에 맞춰 하루를 조정해 드립니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1708776480405-7ae14fe1d4c4?w=400&h=400&fit=crop&auto=format",
  },
];

const ITINERARY_GRAND = [
  {
    day: 1,
    location: { EN: "Ho Chi Minh City", ES: "Ciudad Ho Chi Minh", ZH: "胡志明市", KO: "호치민시" },
    title: { EN: "Landing on Nguyễn Huệ, rooftop first night", ES: "Aterrizaje en Nguyễn Huệ, primera noche en una azotea", ZH: "抵达阮惠街，第一晚天台之夜", KO: "응우옌후에 거리에 도착, 첫날 밤은 루프탑에서" },
    note: { EN: "Fast-track through Tân Sơn Nhất and straight to your hotel in District 1 to settle in. The evening is an easy walk down Nguyễn Huệ and around Bến Thành to get your bearings, then a welcome dinner at a rooftop bar looking out over the city at night. — Tuấn Anh", ES: "Trámite rápido en Tân Sơn Nhất y directo a tu hotel en el Distrito 1 para instalarte. La noche es un paseo tranquilo por Nguyễn Huệ y alrededor de Bến Thành para orientarte, seguido de una cena de bienvenida en un bar en la azotea con vistas a la ciudad de noche. — Tuấn Anh", ZH: "在新山一机场快速通关后直接前往第一郡的酒店安顿。晚上沿阮惠步行街和滨城市场周边悠闲散步，熟悉环境，随后在天台酒吧享用欢迎晚宴，俯瞰夜色中的城市。——Tuấn Anh", KO: "떤선녓 공항에서 빠르게 수속을 마친 뒤 곧바로 1군 호텔로 이동해 여장을 풉니다. 저녁에는 응우옌후에 거리와 벤타인 시장 주변을 가볍게 걸으며 도시에 적응한 뒤, 야경이 내려다보이는 루프탑 바에서 환영 만찬을 즐깁니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 2,
    location: { EN: "Ho Chi Minh City", ES: "Ciudad Ho Chi Minh", ZH: "胡志明市", KO: "호치민시" },
    title: { EN: "Palace, market alleys, and a street-side dinner", ES: "Palacio, callejones de mercado y cena callejera", ZH: "统一宫、市场小巷与街头晚餐", KO: "궁전, 시장 골목, 그리고 길거리 저녁 식사" },
    note: { EN: "A city highlights tour through Reunification Palace, the War Remnants Museum, Notre-Dame Cathedral and the Central Post Office, with breakfast served on the way. The afternoon is yours — shopping on Đồng Khởi or a spa session if you want it — before a guided street food walk through the alleys for bánh mì, phở and gỏi cuốn as dinner. — Tuấn Anh", ES: "Un recorrido por los puntos destacados de la ciudad: el Palacio de la Reunificación, el Museo de los Vestigios de Guerra, la Catedral de Notre-Dame y la Oficina Central de Correos, con desayuno incluido en el camino. La tarde es tuya — compras en Đồng Khởi o una sesión de spa si lo deseas — antes de un recorrido guiado por callejones de comida callejera con bánh mì, phở y gỏi cuốn como cena. — Tuấn Anh", ZH: "参观城市地标之旅：统一宫、战争遗迹博物馆、圣母大教堂与中央邮局，途中安排早餐。下午自由活动——可以在同起街购物，或享受一次水疗——晚上则跟随导览穿梭街头巷尾，品尝法棍三明治、河粉与生春卷作为晚餐。——Tuấn Anh", KO: "통일궁, 전쟁유적박물관, 노트르담 대성당, 중앙우체국을 둘러보는 시내 하이라이트 투어를 하며 도중에 아침 식사가 제공됩니다. 오후는 자유 시간으로, 동커이 거리에서 쇼핑을 즐기시거나 스파를 이용하셔도 좋습니다. 저녁에는 가이드와 함께 골목길 스트리트푸드 투어를 하며 반미, 퍼, 고이꾸온으로 저녁을 즐깁니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1748596161492-0ebbc90489a5?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 3,
    location: { EN: "Fly to Đà Lạt", ES: "Vuelo a Đà Lạt", ZH: "飞往大叻", KO: "달랏으로 비행" },
    title: { EN: "Cool air, family fun, and the night market", ES: "Aire fresco, diversión familiar y el mercado nocturno", ZH: "清凉空气、亲子乐趣与夜市", KO: "선선한 공기, 가족 나들이, 그리고 야시장" },
    note: { EN: "A short flight up into Đà Lạt's cool air, then check-in at a boutique highland stay. The afternoon is built for the family — go-karts, the sliding hill, the puppy farm, the zoo or the flower gardens, pick what suits the day — before dinner at Đà Lạt's night market. — Tuấn Anh", ES: "Un vuelo corto hasta el aire fresco de Đà Lạt, luego check-in en un alojamiento boutique en las tierras altas. La tarde está pensada para la familia — karts, la colina deslizante, la granja de cachorros, el zoológico o los jardines de flores, elige lo que se ajuste al día — antes de la cena en el mercado nocturno de Đà Lạt. — Tuấn Anh", ZH: "短途飞行抵达气候凉爽的大叻，随后入住高原精品住宿。下午专为家庭安排——卡丁车、滑草坡、幼犬农场、动物园或花园，可根据当天情况自由选择——晚上则在大叻夜市享用晚餐。——Tuấn Anh", KO: "짧은 비행으로 선선한 달랏에 도착해 고원 지역의 부티크 숙소에 체크인합니다. 오후는 온 가족이 즐길 수 있도록 구성됩니다 — 카트, 슬라이딩 힐, 강아지 농장, 동물원, 꽃 정원 중 그날 상황에 맞게 선택하시면 됩니다 — 저녁은 달랏 야시장에서 즐깁니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1552310065-aad9ebece999?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 4,
    location: { EN: "Đà Lạt", ES: "Đà Lạt", ZH: "Đà Lạt", KO: "Đà Lạt" },
    title: { EN: "Pine forest trails and a coffee farm view", ES: "Senderos de bosque de pinos y vistas desde una finca de café", ZH: "松林小径与咖啡庄园景观", KO: "소나무 숲길과 커피 농장 전망" },
    note: { EN: "A morning trek through pine forest to Elephant or Datanla waterfall, then lunch at a coffee farm with sweeping views over the highlands and a full tasting session on how Arabica is grown at altitude. The afternoon has nothing scheduled — Đà Lạt's café culture, best known for cà phê chồn, is made for sitting still for a while. — Tuấn Anh", ES: "Una caminata matutina por el bosque de pinos hasta la cascada Elephant o Datanla, luego almuerzo en una finca de café con vistas panorámicas sobre las tierras altas y una sesión completa de cata sobre cómo se cultiva el Arábica en altitud. La tarde no tiene nada programado — la cultura del café de Đà Lạt, conocida por el cà phê chồn, está hecha para sentarse a disfrutar con calma. — Tuấn Anh", ZH: "上午沿松林步道前往象牙瀑布或Datanla瀑布徒步，随后在能俯瞰高原全景的咖啡庄园享用午餐，并参加一场完整的品鉴活动，了解高海拔阿拉比卡咖啡的种植方式。下午不安排任何行程——大叻以貂咖啡闻名的咖啡文化，正适合静静坐下慢慢品味。——Tuấn Anh", KO: "오전에는 소나무 숲길을 따라 엘리펀트 폭포 또는 다딴라 폭포까지 트레킹한 뒤, 고원 전경이 펼쳐지는 커피 농장에서 점심을 먹으며 고지대 아라비카 재배 과정을 알아보는 시음 시간을 가집니다. 오후는 별도 일정 없이 자유롭게 — 코피루왁으로 유명한 달랏의 커피 문화를 느긋하게 즐기기에 좋은 시간입니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1678099006439-dba9e4d3f9f5?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 5,
    location: { EN: "Fly to Đà Nẵng", ES: "Vuelo a Đà Nẵng", ZH: "飞往岘港", KO: "다낭으로 비행" },
    title: { EN: "Christmas Eve on the Golden Bridge", ES: "Nochebuena en el Puente Dorado", ZH: "金桥上的平安夜", KO: "골든브릿지에서 맞는 크리스마스이브" },
    note: { EN: "The flight to Đà Nẵng lands you beachfront on Mỹ Khê in time for a full day at Bà Nà Hills — the record-holding cable car, the Golden Bridge held up by giant stone hands, and the French Village at 1,400 metres. You're back on the beach for a festive dinner as the city lights up for Christmas Eve. — Tuấn Anh", ES: "El vuelo a Đà Nẵng te deja frente a la playa de Mỹ Khê a tiempo para un día completo en Bà Nà Hills — el teleférico récord mundial, el Puente Dorado sostenido por manos de piedra gigantes, y el Pueblo Francés a 1.400 metros de altura. Regresas a la playa para una cena festiva mientras la ciudad se ilumina en Nochebuena. — Tuấn Anh", ZH: "飞往岘港后直达美溪海滩，正好安排一整天的巴拿山之旅——刷新世界纪录的缆车、由巨型石手托举的金桥，以及海拔1400米的法式小镇。傍晚返回海滩，享用节日晚餐，欣赏平安夜城市点亮的璀璨灯光。——Tuấn Anh", KO: "다낭행 비행기로 미케 해변에 도착해 바나힐에서 하루를 온전히 보냅니다 — 세계 기록을 보유한 케이블카, 거대한 돌손이 떠받치는 골든브릿지, 해발 1,400미터의 프렌치 빌리지까지 둘러봅니다. 크리스마스이브를 맞아 도시에 불이 켜지는 동안, 해변으로 돌아와 특별한 저녁 식사를 즐깁니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1611854064186-d8dccbccb031?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 6,
    location: { EN: "Đà Nẵng & Hội An", ES: "Đà Nẵng y Hội An", ZH: "岘港与会安", KO: "다낭 & 호이안" },
    title: { EN: "Beach morning, lantern-lit afternoon", ES: "Mañana de playa, tarde iluminada por farolillos", ZH: "海滩之晨，灯笼之午", KO: "해변의 아침, 등불의 오후" },
    note: { EN: "Christmas morning is unhurried — Mỹ Khê beach right outside the hotel — before a scenic coastal drive to Hội An in the early afternoon. We walk the Ancient Town in the best light of the day, release lanterns on the Thu Bồn at dusk, and eat at Bánh Mì Phượng before heading back to Đà Nẵng for the night. — Tuấn Anh", ES: "La mañana de Navidad transcurre sin prisa — la playa de Mỹ Khê justo afuera del hotel — antes de un paseo escénico por la costa hasta Hội An a primera hora de la tarde. Caminamos por el Casco Antiguo con la mejor luz del día, soltamos farolillos en el Thu Bồn al atardecer, y comemos en Bánh Mì Phượng antes de regresar a Đà Nẵng para pasar la noche. — Tuấn Anh", ZH: "圣诞节的早晨从容不迫——酒店门口就是美溪海滩——早下午沿海岸风景公路前往会安。趁着一天中光线最美的时候漫步古镇，黄昏时在秋盆河放河灯，并在Bánh Mì Phượng用餐，随后返回岘港过夜。——Tuấn Anh", KO: "크리스마스 아침은 여유롭게 — 호텔 바로 앞 미케 해변에서 시작해 — 이른 오후에는 아름다운 해안 도로를 따라 호이안으로 이동합니다. 하루 중 빛이 가장 좋은 시간에 올드타운을 거닐고, 해 질 무렵 투본강에 등불을 띄운 뒤 반미프엉에서 식사를 합니다. 이후 다낭으로 돌아와 하룻밤을 보냅니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1708776480405-7ae14fe1d4c4?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 7,
    location: { EN: "Scenic train to Huế", ES: "Tren panorámico a Huế", ZH: "风景火车前往顺化", KO: "후에행 경관 열차" },
    title: { EN: "Over Hải Vân Pass by rail", ES: "Cruzando el Paso de Hải Vân en tren", ZH: "乘火车翻越海云关", KO: "기차로 넘는 하이반 고개" },
    note: { EN: "One of the great train rides in the country — Đà Nẵng to Huế via Hải Vân Pass, coastal cliffs and jungle the whole way. In Huế, the afternoon is the Imperial City: the Citadel, the Forbidden Purple City, the Flag Tower and Noon Gate, then a proper Huế royal-cuisine dinner to match the history. — Tuấn Anh", ES: "Uno de los grandes recorridos en tren del país — de Đà Nẵng a Huế vía el Paso de Hải Vân, acantilados costeros y selva todo el camino. En Huế, la tarde es la Ciudad Imperial: la Ciudadela, la Ciudad Púrpura Prohibida, la Torre de la Bandera y la Puerta del Mediodía, seguido de una auténtica cena de cocina imperial de Huế a la altura de la historia. — Tuấn Anh", ZH: "这是越南最著名的火车之旅之一——从岘港经海云关前往顺化，沿途尽是海岸悬崖与丛林景观。抵达顺化后，下午探访皇城：紫禁城、旗台与午门，随后享用一顿与历史相衬的正宗顺化宫廷料理晚餐。——Tuấn Anh", KO: "베트남 최고의 기차 여행 중 하나로, 다낭에서 하이반 고개를 넘어 후에까지 해안 절벽과 정글 풍경이 이어집니다. 후에 도착 후 오후에는 황성을 둘러봅니다 — 시타델, 자금성, 국기탑, 오문까지 — 이후 역사에 걸맞은 정통 후에 궁중 요리로 저녁을 마무리합니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1751842839568-285b1ffdbd15?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 8,
    location: { EN: "Huế", ES: "Huế", ZH: "Huế", KO: "Huế" },
    title: { EN: "Royal tombs and the Perfume River", ES: "Tumbas reales y el río Perfume", ZH: "皇陵与香江", KO: "왕릉과 흐엉강" },
    note: { EN: "A private tour of the tombs of Khải Định and Minh Mạng — one all ornament, the other all quiet garden — then a boat along the Perfume River to Thiên Mụ Pagoda. The afternoon is free for Đông Ba Market and Huế souvenirs before a farewell dinner served the traditional way, in many small courses. — Tuấn Anh", ES: "Un tour privado por las tumbas de Khải Định y Minh Mạng — una toda ornamento, la otra todo jardín tranquilo — luego un paseo en barco por el río Perfume hasta la Pagoda Thiên Mụ. La tarde es libre para el mercado Đông Ba y los recuerdos de Huế antes de una cena de despedida servida al estilo tradicional, en muchos platos pequeños. — Tuấn Anh", ZH: "私人游览启定陵与明命陵——一座极尽雕饰之美，一座静谧幽然如园林——随后乘船沿香江前往天姥寺。下午自由活动，可前往东巴市场选购顺化特产纪念品，晚上则以传统方式呈上多道小菜的告别晚宴收尾。——Tuấn Anh", KO: "카이딘 황릉과 민망 황릉을 둘러보는 프라이빗 투어입니다 — 하나는 화려한 장식이, 다른 하나는 고요한 정원이 인상적입니다 — 이후 흐엉강에서 배를 타고 티엔무 사원으로 이동합니다. 오후는 자유 시간으로 동바 시장에서 후에 기념품을 둘러보시고, 저녁에는 전통 방식대로 여러 작은 코스 요리로 구성된 송별 만찬을 즐깁니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1568775791746-bcc117bcb312?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 9,
    location: { EN: "Fly to Ho Chi Minh City", ES: "Vuelo a Ciudad Ho Chi Minh", ZH: "飞返胡志明市", KO: "호치민시로 비행" },
    title: { EN: "One last night, one last round of shopping", ES: "Una última noche, una última ronda de compras", ZH: "最后一晚，最后一次购物", KO: "마지막 밤, 마지막 쇼핑" },
    note: { EN: "The flight back to Ho Chi Minh City lands you with the afternoon free for last-minute shopping around Đồng Khởi and Bến Thành, then a farewell dinner to close out the trip properly on your final night. — Tuấn Anh", ES: "El vuelo de regreso a Ciudad Ho Chi Minh te deja la tarde libre para las últimas compras por Đồng Khởi y Bến Thành, y luego una cena de despedida para cerrar bien el viaje en tu última noche. — Tuấn Anh", ZH: "返回胡志明市的航班抵达后，下午自由活动，可在同起街与滨城市场进行最后一次购物，晚上则以一顿告别晚宴，为旅程画上圆满的句号。——Tuấn Anh", KO: "호치민시로 돌아가는 비행기 도착 후 오후는 자유 시간으로 동커이 거리와 벤타인 시장에서 마지막 쇼핑을 즐기시고, 여행의 마지막 밤을 마무리하는 송별 만찬을 갖습니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 10,
    location: { EN: "Departure", ES: "Salida", ZH: "启程返程", KO: "출국" },
    title: { EN: "Fast-track to the airport, and home", ES: "Vía rápida al aeropuerto, y a casa", ZH: "快速通道直达机场，踏上归途", KO: "패스트트랙으로 공항까지, 그리고 귀국" },
    note: { EN: "An early breakfast, then our fast-track service meets you at the hotel lobby for stress-free check-in, security and immigration. Ten days across four cities — thank you for having us along for it. — Tuấn Anh", ES: "Un desayuno temprano, luego nuestro servicio de vía rápida te recibe en el lobby del hotel para un check-in, seguridad e inmigración sin estrés. Diez días por cuatro ciudades — gracias por dejarnos acompañarte. — Tuấn Anh", ZH: "享用早餐后，我们的快速通道服务将在酒店大堂迎接您，全程协助办理值机、安检与出境手续，轻松无忧。十天四座城市的旅程——感谢您让我们一路相伴。——Tuấn Anh", KO: "이른 아침 식사 후, 저희 패스트트랙 서비스 담당자가 호텔 로비에서 만나 체크인, 보안 검색, 출국 수속까지 편안하게 도와드립니다. 4개 도시를 아우른 열흘간의 여정 — 함께해 주셔서 감사합니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1748271151446-0013c0bc7061?w=400&h=400&fit=crop&auto=format",
  },
];

const ITINERARY_HAGIANG = [
  {
    day: 1,
    location: { EN: "Hanoi", ES: "Hanói", ZH: "河内", KO: "하노이" },
    title: { EN: "Arrival & a slow introduction to the Old Quarter", ES: "Llegada e introducción tranquila al Casco Antiguo", ZH: "抵达河内，悠闲初探老城区", KO: "도착 및 여유로운 구시가지 첫걸음" },
    note: { EN: "Airport pick-up straight to a small hotel in the Old Quarter — time to rest and shower after the flight before anything starts. Late afternoon is a walk through the tube houses and trades that still name the streets, an egg coffee break at a working local café, and sunset by Hoan Kiem Lake. A welcome dinner of northern home cooking closes out the day, one short walk from the hotel. — Tuấn Anh", ES: "Recogida en el aeropuerto directo a un pequeño hotel en el Casco Antiguo — tiempo para descansar y ducharte tras el vuelo antes de que empiece nada. A última hora de la tarde, un paseo por las casas tubo y los oficios que aún dan nombre a las calles, una pausa para café de huevo en una cafetería local en funcionamiento, y el atardecer junto al Lago Hoan Kiem. Una cena de bienvenida de cocina casera del norte cierra el día, a un corto paseo del hotel. — Tuấn Anh", ZH: "机场接机后直接前往老城区一家小型酒店——先休息、冲个澡，缓解飞行疲劳，然后再开始行程。傍晚漫步穿梭于仍以传统行业命名街道的筒屋之间，在一家老牌本地咖啡馆稍作停留品尝鸡蛋咖啡，并在还剑湖畔欣赏日落。当天以一顿北方家常菜欢迎晚宴收尾，距酒店仅几步之遥。——Tuấn Anh", KO: "공항에서 픽업 후 곧바로 구시가지의 작은 호텔로 이동해, 본격적인 일정에 앞서 비행 후 휴식과 샤워로 여유를 갖습니다. 늦은 오후에는 아직도 거리 이름에 옛 업종이 남아 있는 뚜브(관형) 주택들 사이를 걸으며, 실제로 영업 중인 로컬 카페에서 에그커피를 즐기고 호안끼엠 호수에서 노을을 감상합니다. 호텔에서 가까운 곳에서 북부 가정식으로 이루어진 환영 만찬으로 하루를 마무리합니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1611195328596-d8dcf57f5cea?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 2,
    location: { EN: "Hanoi", ES: "Hanói", ZH: "河内", KO: "하노이" },
    title: { EN: "Culture at a gentle pace", ES: "Cultura a un ritmo tranquilo", ZH: "轻松节奏的文化之旅", KO: "여유로운 속도의 문화 탐방" },
    note: { EN: "Morning at the Temple of Literature, early enough to beat the school groups, then coffee in the shade of the courtyard trees. After lunch in Ba Dinh, the Museum of Ethnology gives you real context for the hill communities you'll meet later in Ha Giang. The late afternoon is free — a quiet walk around West Lake, or water puppet theatre if you'd rather have something scheduled. — Tuấn Anh", ES: "Mañana en el Templo de la Literatura, lo suficientemente temprano para evitar los grupos escolares, luego café a la sombra de los árboles del patio. Después del almuerzo en Ba Đình, el Museo de Etnología te da un contexto real sobre las comunidades de las tierras altas que conocerás más adelante en Hà Giang. La tarde es libre — un paseo tranquilo alrededor del Lago del Oeste, o teatro de marionetas de agua si prefieres algo programado. — Tuấn Anh", ZH: "上午前往文庙，趁学生团体到来之前抵达，随后在庭院树荫下享用一杯咖啡。巴亭区午餐后，参观民族学博物馆，为您日后在河江遇见的高地民族社群提供真实背景知识。傍晚自由活动——可以沿西湖悠闲散步，若想要安排具体行程，也可选择观看水上木偶戏。——Tuấn Anh", KO: "오전에는 학생 단체가 몰리기 전 이른 시간에 문묘를 방문한 뒤, 안뜰 나무 그늘 아래에서 커피를 즐깁니다. 바딘 지구에서 점심 식사 후에는 민족학 박물관을 방문해, 이후 하장에서 만나게 될 고산 소수민족 마을에 대한 실제 배경 지식을 얻습니다. 늦은 오후는 자유 시간으로, 서호를 조용히 산책하시거나 정해진 일정을 원하시면 수상 인형극을 관람하셔도 좋습니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1611195328596-d8dcf57f5cea?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 3,
    location: { EN: "Transfer to Ninh Bình & Tràng An", ES: "Traslado a Ninh Bình y Tràng An", ZH: "转往宁平与长安", KO: "닌빈 및 짱안으로 이동" },
    title: { EN: "Into the rice fields and limestone valleys", ES: "Hacia los arrozales y los valles de piedra caliza", ZH: "走进稻田与石灰岩峡谷", KO: "논과 석회암 계곡 속으로" },
    note: { EN: "About two hours by private car to a garden homestay among the rice fields, with mountain views from the room. In the afternoon, a rower takes you through Tràng An's flooded caves and between limestone karsts — roughly two and a half hours, all of it seated. Dinner is local goat, river fish, and rice grown in the field you can see from the terrace. — Tuấn Anh", ES: "Unas dos horas en auto privado hasta un homestay tipo jardín entre los arrozales, con vistas a las montañas desde la habitación. Por la tarde, un remero te lleva por las cuevas inundadas de Tràng An y entre los karsts de piedra caliza — unas dos horas y media, todo sentado. La cena es cabra local, pescado de río y arroz cultivado en el mismo campo que se ve desde la terraza. — Tuấn Anh", ZH: "乘私人轿车约两小时抵达稻田间一处花园式民宿，房间即可眺望群山。下午由船夫摇橹带您穿行长安的水淹溶洞与石灰岩喀斯特地貌之间——全程约两个半小时，全程坐船，轻松惬意。晚餐享用本地山羊肉、河鱼，以及露台边稻田里现产的稻米。——Tuấn Anh", KO: "전용 차량으로 약 두 시간 이동해 논 한가운데 자리한 정원형 홈스테이에 도착하며, 객실에서 산 전망을 감상할 수 있습니다. 오후에는 뱃사공이 노를 저어 짱안의 물에 잠긴 동굴과 석회암 카르스트 사이를 약 두 시간 반 동안 안내합니다 — 내내 앉아서 편안히 즐기시면 됩니다. 저녁은 현지 염소고기, 민물고기, 그리고 테라스에서 보이는 바로 그 논에서 재배한 쌀로 준비됩니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1626743656249-5d8fa287b941?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 4,
    location: { EN: "Ninh Bình countryside & Hoa Lư", ES: "Zona rural de Ninh Bình y Hoa Lư", ZH: "宁平乡间与华闾", KO: "닌빈 근교와 호아루" },
    title: { EN: "The ancient capital, then a quieter lagoon", ES: "La antigua capital, luego una laguna más tranquila", ZH: "古都之后的静谧潟湖", KO: "고대 수도, 그리고 더 조용한 라군" },
    note: { EN: "Morning at Hoa Lư, the tenth-century capital of Vietnam, followed by a gentle bike ride or short drive through Bích Động and the back lanes between the paddies — flat ground, entirely optional. The afternoon boat ride on Vân Long lagoon is shallower and far less visited than Tràng An, with a good chance of spotting the endangered Delacour's langur on the cliffs. Climbing the roughly 500 steps of Hang Múa for the valley view is there if you want it, and just as easy to skip. — Tuấn Anh", ES: "Mañana en Hoa Lư, la capital de Vietnam en el siglo X, seguida de un paseo tranquilo en bicicleta o un corto trayecto en auto por Bích Động y los caminos entre los arrozales — terreno plano, totalmente opcional. El paseo en barco de la tarde por la laguna de Vân Long es más superficial y mucho menos visitado que Tràng An, con buenas probabilidades de ver el langur de Delacour, en peligro de extinción, en los acantilados. Subir los cerca de 500 escalones de Hang Múa para la vista del valle está ahí si lo quieres, y es igual de fácil de omitir. — Tuấn Anh", ZH: "上午参观华闾——越南十世纪的古都，随后可选择轻松骑行或短途乘车游览碧洞及田埂间的小路——地势平坦，完全自愿参加。下午的云隆潟湖泛舟比长安更浅、游客也少得多，有很大机会在悬崖上看到濒危的黑腿蒙面叶猴。若想俯瞰山谷，也可攀登约500级台阶前往舞洞，不想爬也完全没问题。——Tuấn Anh", KO: "오전에는 베트남 10세기 수도였던 호아루를 방문한 뒤, 비엔동 사원과 논 사이 오솔길을 가볍게 자전거로 돌거나 짧게 차로 둘러봅니다 — 평지라 참여는 완전히 선택 사항입니다. 오후에 즐기는 반롱 라군 뱃놀이는 짱안보다 수심이 얕고 관광객도 훨씬 적으며, 절벽에서 멸종위기종인 들라쿠르랑구르를 볼 가능성도 높습니다. 계곡 전망을 원하시면 약 500개의 계단을 올라 항무아에 다녀오실 수 있고, 원치 않으시면 생략하셔도 무방합니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1503539680555-732099a55a56?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 5,
    location: { EN: "North to Hà Giang city", ES: "Hacia el norte, ciudad de Hà Giang", ZH: "北上河江市", KO: "북쪽 하장시로 이동" },
    title: { EN: "The long transfer day", ES: "El día del traslado largo", ZH: "长途转移日", KO: "긴 이동의 날" },
    note: { EN: "Seven to eight hours on the road from Ninh Bình to Hà Giang city, broken up with generous stops for coffee, lunch and legs. The route runs through the tea country of Tuyên Quang, with a lunch stop at a riverside restaurant we use regularly. After checking in, an early dinner in town and a short briefing on what the mountain days need from you — border-area registration, what to pack, what the weather is doing. — Tuấn Anh", ES: "Siete a ocho horas en carretera desde Ninh Bình hasta la ciudad de Hà Giang, con paradas generosas para café, almuerzo y estirar las piernas. La ruta atraviesa la región del té de Tuyên Quang, con una parada para almorzar en un restaurante junto al río que usamos habitualmente. Tras el check-in, una cena temprana en la ciudad y una breve orientación sobre lo que necesitarás para los días de montaña — registro de zona fronteriza, qué empacar, cómo viene el clima. — Tuấn Anh", ZH: "从宁平到河江市需在路上行驶七到八个小时，途中会安排充裕的休息时间，供咖啡、午餐及活动腿脚使用。途经宣光茶乡，会在我们常去的一家江边餐厅停留用午餐。抵达并办理入住后，在市区享用一顿早晚餐，并简要介绍接下来山区行程所需注意事项——边境地区登记、行李准备、天气情况等。——Tuấn Anh", KO: "닌빈에서 하장시까지 7~8시간이 소요되는 이동일로, 커피와 점심, 스트레칭을 위한 충분한 휴식이 마련되어 있습니다. 뚜옌꽝의 차 재배 지역을 지나며, 저희가 자주 이용하는 강변 식당에서 점심을 먹습니다. 체크인 후에는 시내에서 이른 저녁 식사를 하고, 이어질 산악 일정에 필요한 사항—국경 지역 등록, 준비물, 날씨 상황—을 간단히 안내해 드립니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1670654534716-91f59fe06a26?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 6,
    location: { EN: "Quản Bạ, Yên Minh & the road to Đồng Văn", ES: "Quản Bạ, Yên Minh y la carretera a Đồng Văn", ZH: "管簿、安明与前往同文的公路", KO: "꽌바, 옌민, 그리고 동반으로 가는 길" },
    title: { EN: "A driving day made of viewpoints, not distance", ES: "Un día de carretera hecho de miradores, no de distancia", ZH: "以观景点而非里程为主的驾车日", KO: "거리보다 전망대 중심의 드라이브 데이" },
    note: { EN: "A relaxed 9am start to Heaven's Gate at Quản Bạ and the Twin Mountains below, then a hillside coffee stop looking down the valley. After lunch in Yên Minh, the drive climbs through pine ridges into Đồng Văn, stopping wherever the light is good. You check into a restored stone house or a comfortable local hotel by late afternoon, then dinner and a walk through Đồng Văn's old quarter, quiet and lamplit after dark. — Tuấn Anh", ES: "Un inicio relajado a las 9am hacia la Puerta del Cielo en Quản Bạ y las Montañas Gemelas debajo, luego una parada para café en la ladera con vistas al valle. Después del almuerzo en Yên Minh, la carretera sube por crestas de pinos hasta Đồng Văn, deteniéndose donde la luz sea buena. Te registras en una casa de piedra restaurada o un cómodo hotel local a última hora de la tarde, luego cena y un paseo por el casco antiguo de Đồng Văn, tranquilo e iluminado con faroles tras el anochecer. — Tuấn Anh", ZH: "上午9点从容出发，前往管簿天门及脚下的双子山，随后在山坡咖啡馆稍作停留，俯瞰山谷美景。安明午餐后，公路穿越松树山脊直抵同文，途中随时可停下拍照留念。傍晚入住一栋修复的石屋或舒适的当地酒店，晚餐后可漫步同文老城区，入夜后灯火摇曳，宁静怡人。——Tuấn Anh", KO: "오전 9시, 여유롭게 출발해 꽌바의 천국의 문과 그 아래 쌍둥이 산을 둘러보고, 이어 산비탈 카페에서 계곡을 내려다보며 커피를 즐깁니다. 옌민에서 점심 식사 후, 도로는 소나무 능선을 따라 동반까지 이어지며 경치가 좋은 곳마다 자유롭게 정차합니다. 늦은 오후에는 복원된 돌집이나 편안한 현지 호텔에 체크인한 뒤, 저녁 식사 후 해가 진 뒤 등불이 켜진 조용한 동반 구시가지를 산책합니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1685584280839-a51ba5a1908d?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 7,
    location: { EN: "Lũng Cú, Mã Pí Lèng & the Nho Quế river", ES: "Lũng Cú, Mã Pí Lèng y el río Nho Quế", ZH: "龙姑、马皮楞与奶河", KO: "룽꾸, 마피렝, 그리고 뇨꾸에 강" },
    title: { EN: "The most dramatic day of the trip", ES: "El día más espectacular del viaje", ZH: "本次旅程中最震撼的一天", KO: "여행 중 가장 극적인 하루" },
    note: { EN: "Morning at Lũng Cú, the northernmost point of Vietnam, and its flag tower. After lunch back in Đồng Văn, the afternoon covers Mã Pí Lèng — the most dramatic stretch of road in the country — with a boat trip on the Nho Quế river through Tu Sản canyon: an hour on flat green water beneath the highest cliffs in Vietnam, and the calmest part of the whole trip. You return to the same hotel in Đồng Văn for a second night — no packing, no moving on. — Tuấn Anh", ES: "Mañana en Lũng Cú, el punto más septentrional de Vietnam, y su torre de la bandera. Después del almuerzo de vuelta en Đồng Văn, la tarde cubre Mã Pí Lèng — el tramo de carretera más espectacular del país — con un paseo en barco por el río Nho Quế a través del cañón Tu Sản: una hora sobre agua verde y plana bajo los acantilados más altos de Vietnam, y la parte más tranquila de todo el viaje. Regresas al mismo hotel en Đồng Văn para una segunda noche — sin empacar, sin moverte. — Tuấn Anh", ZH: "上午前往越南最北端的龙姑及其国旗塔。返回同文用午餐后，下午探访马皮楞——越南最惊险壮观的一段公路——并乘船沿奶河穿越图桑峡谷：在越南最高峭壁之下、平静碧绿的水面上航行约一小时，是整趟旅程中最宁静的时刻。当晚返回同文同一家酒店住宿——无需打包，无需奔波。——Tuấn Anh", KO: "오전에는 베트남 최북단인 룽꾸와 그곳의 국기탑을 방문합니다. 동반으로 돌아와 점심을 먹은 뒤, 오후에는 베트남에서 가장 극적인 도로 구간인 마피렝을 지나 뇨꾸에 강에서 뚜산 협곡을 가로지르는 뱃놀이를 즐깁니다 — 베트남에서 가장 높은 절벽 아래, 잔잔한 초록빛 물 위에서 보내는 한 시간으로, 여행 전체에서 가장 평온한 순간입니다. 저녁에는 다시 동반의 같은 호텔로 돌아가 이틀째 밤을 보냅니다 — 짐을 쌀 필요도, 이동할 필요도 없습니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1686755660203-55781dbc2f24?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 8,
    location: { EN: "Market morning & return to Hà Giang", ES: "Mañana de mercado y regreso a Hà Giang", ZH: "赶集清晨与返回河江", KO: "장터 아침과 하장으로의 귀환" },
    title: { EN: "Hill markets, then back down the mountain", ES: "Mercados de montaña, luego de vuelta por la carretera", ZH: "山地集市，随后下山返程", KO: "산악 시장, 그리고 산을 내려가는 길" },
    note: { EN: "If your dates land on a Sunday, this morning is built around the Đồng Văn or Mèo Vạc market — hill communities arriving on foot from the surrounding valleys from around 6am. From there it's the drive back down through Mèo Vạc and Mậu Duệ to Hà Giang city, with stops along the way and lunch on the road. A farewell dinner in town closes out the mountain leg of the trip. — Tuấn Anh", ES: "Si tus fechas caen en domingo, esta mañana gira en torno al mercado de Đồng Văn o Mèo Vạc — las comunidades de las montañas llegan a pie desde los valles cercanos desde alrededor de las 6am. Desde ahí es la carretera de vuelta a través de Mèo Vạc y Mậu Duệ hasta la ciudad de Hà Giang, con paradas en el camino y almuerzo en la carretera. Una cena de despedida en la ciudad cierra el tramo de montaña del viaje. — Tuấn Anh", ZH: "如果您的行程日期恰逢周日，这个清晨会以同文或猫王集市为主——高山各族社群从清晨6点左右就已徒步从周边山谷赶来赴集。随后沿路经猫王与Mậu Duệ返回河江市，途中会有休息停靠及路餐午饭。当晚市区的告别晚宴，为本次山区行程画上句号。——Tuấn Anh", KO: "일정이 일요일과 겹친다면, 이날 아침은 동반 또는 메오박 장터를 중심으로 진행됩니다 — 산악 소수민족들이 오전 6시경부터 인근 계곡에서 걸어 내려와 장을 이룹니다. 이후 메오박과 머우주에를 거쳐 하장시로 돌아가며, 도중에 정차와 길에서의 점심 식사가 이어집니다. 시내에서의 송별 만찬으로 이번 산악 일정을 마무리합니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1761985747469-64dfba0906c0?w=400&h=400&fit=crop&auto=format",
  },
  {
    day: 9,
    location: { EN: "Return to Hanoi & departure", ES: "Regreso a Hanói y salida", ZH: "返回河内与离境", KO: "하노이 귀환 및 출국" },
    title: { EN: "The long way back, at the same relaxed pace", ES: "El largo camino de regreso, al mismo ritmo relajado", ZH: "漫长归途，同样从容不迫", KO: "긴 귀환길, 여전히 여유로운 속도로" },
    note: { EN: "A relaxed departure and around six hours by private car back to Hanoi, with stops along the way — including an optional village stop for lunch and a walk. Drop-off is at your Hanoi hotel, the airport, or onward to your next stop in Vietnam. A late room and shower before a night flight can be arranged on request. — Tuấn Anh", ES: "Una salida tranquila y unas seis horas en auto privado de regreso a Hanói, con paradas en el camino — incluyendo una parada opcional en un pueblo para almorzar y caminar. El punto de entrega es tu hotel en Hanói, el aeropuerto, o hacia tu próxima parada en Vietnam. Se puede organizar una habitación hasta tarde y una ducha antes de un vuelo nocturno si lo solicitas. — Tuấn Anh", ZH: "从容出发，乘私人轿车约六小时返回河内，途中设有休息站——包括一个可自由选择的乡村停留点，供午餐与散步。送达地点可为您在河内的酒店、机场，或前往越南下一站的地点。如需要，也可安排延时退房与冲凉，方便您搭乘夜间航班。——Tuấn Anh", KO: "여유롭게 출발해 전용 차량으로 약 여섯 시간 동안 하노이로 돌아가며, 도중에 마을에 들러 점심 식사와 산책을 즐기는 선택적 코스도 포함됩니다. 하노이 호텔, 공항, 혹은 베트남 내 다음 목적지까지 원하시는 곳으로 모셔다드립니다. 야간 항공편을 이용하실 경우 늦은 시간까지 객실 이용과 샤워가 가능하도록 요청 시 준비해 드립니다. — Tuấn Anh" },
    photo: "https://images.unsplash.com/photo-1611195328596-d8dcf57f5cea?w=400&h=400&fit=crop&auto=format",
  },
];

const TRIPS = [
  {
    id: "mekong-condao",
    zones: ["south"],
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
      { label: { EN: "Hotel & homestay", ES: "Hotel y homestay", ZH: "酒店与民宿", KO: "호텔 및 홈스테이" }, detail: { EN: "Y Hotel Cần Thơ and Ngân Long Home & Camp on Cồn Sơn, booked in your name.", ES: "Y Hotel Cần Thơ y Ngân Long Home & Camp en Cồn Sơn, reservados a tu nombre.", ZH: "以您本人名义预订的芹苴Y酒店及Cồn Sơn的Ngân Long Home & Camp。", KO: "본인 명의로 예약되는 껀터 Y 호텔과 Cồn Sơn의 Ngân Long Home & Camp." } },
      { label: { EN: "Domestic flight", ES: "Vuelo doméstico", ZH: "国内航班", KO: "국내선 항공편" }, detail: { EN: "Cần Thơ → Côn Đảo, ticketed once your dates are confirmed.", ES: "Cần Thơ → Côn Đảo, emitido una vez confirmadas tus fechas.", ZH: "芹苴 → 昆岛，行程日期确认后即出票。", KO: "껀터 → 꼰다오, 일정 확정 후 항공권이 발권됩니다." } },
      { label: { EN: "Turtle conservation night", ES: "Noche de conservación de tortugas", ZH: "护龟之夜", KO: "바다거북 보호의 밤" }, detail: { EN: "Park ranger guide, entrance, speedboat, tent, dinner and breakfast on Hòn Bảy Cạnh, plus travel insurance for that night.", ES: "Guía guardabosques, entrada, lancha rápida, tienda de campaña, cena y desayuno en Hòn Bảy Cạnh, además de seguro de viaje para esa noche.", ZH: "包含护林员向导、门票、快艇、帐篷，以及在Hòn Bảy Cạnh的晚餐与早餐，另附当晚的旅行保险。", KO: "국립공원 레인저 가이드, 입장료, 스피드보트, 텐트, Hòn Bảy Cạnh에서의 저녁 및 아침 식사, 그리고 해당 밤의 여행자 보험이 포함됩니다." } },
      { label: { EN: "Local planner support", ES: "Soporte de un planificador local", ZH: "本地策划人支持", KO: "현지 플래너 지원" }, detail: { EN: "Tuấn Anh reachable by WhatsApp for the full trip, plus a mid-trip check-in call.", ES: "Tuấn Anh disponible por WhatsApp durante todo el viaje, además de una llamada de seguimiento a mitad del viaje.", ZH: "全程可通过WhatsApp联系Tuấn Anh，行程中段还会安排一次电话回访。", KO: "여행 전체 기간 동안 WhatsApp으로 Tuấn Anh와 연락 가능하며, 여행 중간에 안부 확인 전화도 진행됩니다." } },
      { label: { EN: "One cooking class", ES: "Una clase de cocina", ZH: "一堂烹饪课", KO: "요리 수업 1회" }, detail: { EN: "Chả giò, bánh xèo and bún thịt xào on Cồn Sơn — what you cook is your lunch.", ES: "Chả giò, bánh xèo y bún thịt xào en Cồn Sơn — lo que cocines será tu almuerzo.", ZH: "在Cồn Sơn学习制作炸春卷、越式煎饼与炒肉米线——您亲手做的菜就是您的午餐。", KO: "Cồn Sơn에서 짜조, 반쎄오, 분팃싸오를 직접 만들며 — 완성한 요리가 곧 점심이 됩니다." } },
    ],
    notIncluded: { EN: "Not included: the Grab from Ho Chi Minh City to Mùa Xuân, international flights, travel insurance outside the turtle night, meals unless noted, visa fees, and tips.", ES: "No incluido: el Grab desde Ciudad Ho Chi Minh hasta Mùa Xuân, vuelos internacionales, seguro de viaje fuera de la noche de las tortugas, comidas salvo que se indique, tasas de visa y propinas.", ZH: "不包含：从胡志明市到穆春的Grab打车费用、国际机票、护龟之夜以外的旅行保险、未特别注明的餐食、签证费及小费。", KO: "포함되지 않는 사항: 호치민시에서 무아쑤언까지의 그랩(Grab) 차량비, 국제선 항공권, 바다거북의 밤 이외의 여행자 보험, 별도 표기가 없는 식사, 비자 비용 및 팁." },
  },
  {
    id: "dalat-nature",
    zones: ["central"],
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
      { label: { EN: "Farmhouse homestay", ES: "Homestay en granja", ZH: "农家民宿", KO: "농가 홈스테이" }, detail: { EN: "A quiet farmhouse homestay for both nights, booked in your name.", ES: "Un tranquilo homestay tipo granja para ambas noches, reservado a tu nombre.", ZH: "两晚均入住一处安静的农家民宿，以您本人名义预订。", KO: "이틀 밤 모두 본인 명의로 예약되는 조용한 농가형 홈스테이에서 머무릅니다." } },
      { label: { EN: "Private driver", ES: "Conductor privado", ZH: "私人司机", KO: "전용 기사" }, detail: { EN: "A private driver for the coffee farm, Tuyền Lâm Lake and market visits.", ES: "Un conductor privado para las visitas a la finca de café, el lago Tuyền Lâm y el mercado.", ZH: "配备私人司机，接送前往咖啡庄园、绥林湖及市场参观。", KO: "커피 농장, 뚜옌럼 호수, 시장 방문을 위한 전용 기사가 제공됩니다." } },
      { label: { EN: "Coffee farm tasting", ES: "Cata en finca de café", ZH: "咖啡庄园品鉴", KO: "커피 농장 시음" }, detail: { EN: "A full tasting session at a highland coffee farm — how Arabica is grown at altitude.", ES: "Una sesión completa de cata en una finca de café de las tierras altas — cómo se cultiva el Arábica en altitud.", ZH: "在高原咖啡庄园参加完整的品鉴活动，了解高海拔阿拉比卡咖啡的种植方式。", KO: "고원 커피 농장에서의 전체 시음 세션 — 고지대에서 아라비카가 어떻게 재배되는지 알아봅니다." } },
      { label: { EN: "Boat on Tuyền Lâm Lake", ES: "Paseo en barco por el lago Tuyền Lâm", ZH: "绥林湖泛舟", KO: "뚜옌럼 호수 보트 투어" }, detail: { EN: "A slow afternoon on the water, no schedule pushing you along.", ES: "Una tarde tranquila sobre el agua, sin ningún horario que te apure.", ZH: "在湖面上悠闲度过一个下午，没有任何日程催促您。", KO: "서두를 일정 없이 물 위에서 느긋한 오후를 보냅니다." } },
      { label: { EN: "Local planner support", ES: "Soporte de un planificador local", ZH: "本地策划人支持", KO: "현지 플래너 지원" }, detail: { EN: "Di Thạch reachable by WhatsApp for the full trip.", ES: "Di Thạch disponible por WhatsApp durante todo el viaje.", ZH: "全程可通过WhatsApp联系Di Thạch。", KO: "여행 전체 기간 동안 WhatsApp으로 Di Thạch와 연락 가능합니다." } },
    ],
    notIncluded: { EN: "Not included: the sleeper bus to and from Đà Lạt, international flights, meals unless noted, visa fees, and tips.", ES: "No incluido: el bus nocturno de ida y vuelta a Đà Lạt, vuelos internacionales, comidas salvo que se indique, tasas de visa y propinas.", ZH: "不包含：往返大叻的夜间大巴、国际机票、未特别注明的餐食、签证费及小费。", KO: "포함되지 않는 사항: 달랏 왕복 슬리핑 버스, 국제선 항공권, 별도 표기가 없는 식사, 비자 비용 및 팁." },
  },
  {
    id: "food-journey",
    zones: ["south", "central"],
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
      { label: { EN: "Hotels & homestay", ES: "Hoteles y homestay", ZH: "酒店与民宿", KO: "호텔 및 홈스테이" }, detail: { EN: "Boutique hotels in Saigon and Đà Nẵng, plus the Mekong homestay on Cồn Sơn, booked in your name.", ES: "Hoteles boutique en Saigón y Đà Nẵng, además del homestay del Mekong en Cồn Sơn, reservados a tu nombre.", ZH: "以您本人名义预订西贡与岘港的精品酒店，以及Cồn Sơn的湄公河民宿。", KO: "사이공과 다낭의 부티크 호텔, 그리고 Cồn Sơn의 메콩 홈스테이가 본인 명의로 예약됩니다." } },
      { label: { EN: "Domestic flight", ES: "Vuelo doméstico", ZH: "国内航班", KO: "국내선 항공편" }, detail: { EN: "Cần Thơ → Đà Nẵng, ticketed once your dates are confirmed.", ES: "Cần Thơ → Đà Nẵng, emitido una vez confirmadas tus fechas.", ZH: "芹苴 → 岘港，行程日期确认后即出票。", KO: "껀터 → 다낭, 일정 확정 후 항공권이 발권됩니다." } },
      { label: { EN: "Hội An cooking class", ES: "Clase de cocina en Hội An", ZH: "会安烹饪课", KO: "호이안 요리 수업" }, detail: { EN: "Morning market visit with a local chef, Trà Quế herb garden, and a hands-on class covering four or five dishes.", ES: "Visita matutina al mercado con un chef local, jardín de hierbas de Trà Quế, y una clase práctica que cubre cuatro o cinco platos.", ZH: "与本地厨师一同参观清晨市场，游览茶桂香草园，并参加涵盖四到五道菜的实操课程。", KO: "현지 셰프와 함께하는 아침 시장 방문, 짜꾸에 허브 마을, 그리고 네다섯 가지 요리를 배우는 실습 수업이 포함됩니다." } },
      { label: { EN: "Saigon scooter food crawl", ES: "Recorrido gastronómico en scooter por Saigón", ZH: "西贡摩托车美食之旅", KO: "사이공 스쿠터 미식 투어" }, detail: { EN: "A guided xe ôm tour through Saigon's backstreets after dark.", ES: "Un tour guiado en xe ôm por los callejones de Saigón después del anochecer.", ZH: "入夜后由向导带领，乘坐摩托车穿梭西贡的大街小巷。", KO: "해가 진 뒤 가이드와 함께하는 쎄옴(오토바이) 투어로 사이공의 뒷골목을 둘러봅니다." } },
      { label: { EN: "Local planner support", ES: "Soporte de un planificador local", ZH: "本地策划人支持", KO: "현지 플래너 지원" }, detail: { EN: "Tuấn Anh reachable by WhatsApp for the full trip.", ES: "Tuấn Anh disponible por WhatsApp durante todo el viaje.", ZH: "全程可通过WhatsApp联系Tuấn Anh。", KO: "여행 전체 기간 동안 WhatsApp으로 Tuấn Anh와 연락 가능합니다." } },
    ],
    notIncluded: { EN: "Not included: international flights, meals unless noted, visa fees, and tips.", ES: "No incluido: vuelos internacionales, comidas salvo que se indique, tasas de visa y propinas.", ZH: "不包含：国际机票、未特别注明的餐食、签证费及小费。", KO: "포함되지 않는 사항: 국제선 항공권, 별도 표기가 없는 식사, 비자 비용 및 팁." },
  },
  {
    id: "grand-tour",
    zones: ["south", "central"],
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
      { label: { EN: "Domestic flights", ES: "Vuelos domésticos", ZH: "国内航班", KO: "국내선 항공편" }, detail: { EN: "Saigon → Đà Lạt → Đà Nẵng, ticketed once your dates are confirmed.", ES: "Saigón → Đà Lạt → Đà Nẵng, emitidos una vez confirmadas tus fechas.", ZH: "西贡 → 大叻 → 岘港，行程日期确认后即出票。", KO: "사이공 → 달랏 → 다낭, 일정 확정 후 항공권이 발권됩니다." } },
      { label: { EN: "Hotels", ES: "Hoteles", ZH: "酒店", KO: "호텔" }, detail: { EN: "Boutique hotels in Ho Chi Minh City, Đà Lạt, Đà Nẵng and Huế, booked in your name.", ES: "Hoteles boutique en Ciudad Ho Chi Minh, Đà Lạt, Đà Nẵng y Huế, reservados a tu nombre.", ZH: "以您本人名义预订胡志明市、大叻、岘港与顺化的精品酒店。", KO: "호치민시, 달랏, 다낭, 후에의 부티크 호텔이 본인 명의로 예약됩니다." } },
      { label: { EN: "Bà Nà Hills", ES: "Bà Nà Hills", ZH: "巴拿山", KO: "바나힐" }, detail: { EN: "Cable car, Golden Bridge and French Village entrance.", ES: "Teleférico, Puente Dorado y entrada al Pueblo Francés.", ZH: "缆车、金桥及法式小镇门票。", KO: "케이블카, 골든브릿지, 프렌치 빌리지 입장료가 포함됩니다." } },
      { label: { EN: "Scenic train to Huế", ES: "Tren panorámico a Huế", ZH: "风景火车前往顺化", KO: "후에행 경관 열차" }, detail: { EN: "Đà Nẵng to Huế by rail, over Hải Vân Pass.", ES: "De Đà Nẵng a Huế en tren, cruzando el Paso de Hải Vân.", ZH: "乘火车从岘港经海云关前往顺化。", KO: "다낭에서 하이반 고개를 넘어 후에까지 기차로 이동합니다." } },
      { label: { EN: "Local planner support", ES: "Soporte de un planificador local", ZH: "本地策划人支持", KO: "현지 플래너 지원" }, detail: { EN: "Tuấn Anh reachable by WhatsApp for the full trip.", ES: "Tuấn Anh disponible por WhatsApp durante todo el viaje.", ZH: "全程可通过WhatsApp联系Tuấn Anh。", KO: "여행 전체 기간 동안 WhatsApp으로 Tuấn Anh와 연락 가능합니다." } },
    ],
    notIncluded: { EN: "Not included: international flights, meals unless noted, visa fees, and tips.", ES: "No incluido: vuelos internacionales, comidas salvo que se indique, tasas de visa y propinas.", ZH: "不包含：国际机票、未特别注明的餐食、签证费及小费。", KO: "포함되지 않는 사항: 국제선 항공권, 별도 표기가 없는 식사, 비자 비용 및 팁." },
  },
  {
    id: "north-vietnam-hagiang",
    zones: ["north"],
    name: "Hanoi, Ninh Bình & Hà Giang",
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
      { label: { EN: "Private car & driver", ES: "Auto privado con conductor", ZH: "私人轿车与司机", KO: "전용 차량 및 기사" }, detail: { EN: "An experienced mountain driver for the full route, from Hanoi airport to the final drop-off — including fuel, tolls and parking. No motorbikes, no shared minibuses.", ES: "Un conductor experimentado en carreteras de montaña para toda la ruta, desde el aeropuerto de Hanói hasta el destino final — incluye combustible, peajes y estacionamiento. Sin motos, sin minibuses compartidos.", ZH: "全程配备经验丰富的山区司机，从河内机场接机直至行程结束送达——包含燃油、过路费及停车费。全程不含摩托车或拼车小巴。", KO: "하노이 공항부터 최종 하차지까지 전체 구간을 담당하는 숙련된 산악 운전기사가 제공되며, 연료비·통행료·주차비가 포함됩니다. 오토바이나 합승 미니버스는 이용하지 않습니다." } },
      { label: { EN: "English-speaking guide", ES: "Guía de habla inglesa", ZH: "英语向导", KO: "영어 가이드" }, detail: { EN: "A guide for the full itinerary, from Hanoi through to Hà Giang.", ES: "Un guía para todo el itinerario, desde Hanói hasta Hà Giang.", ZH: "全程配备向导，从河内一路陪同至河江。", KO: "하노이부터 하장까지 전체 일정에 동행하는 가이드가 제공됩니다." } },
      { label: { EN: "Accommodation", ES: "Alojamiento", ZH: "住宿", KO: "숙박" }, detail: { EN: "Hotels, homestay and eco-lodge across Hanoi, Ninh Bình and Hà Giang, in properties our team has stayed in.", ES: "Hoteles, homestay y eco-lodge en Hanói, Ninh Bình y Hà Giang, en propiedades donde nuestro equipo se ha alojado.", ZH: "涵盖河内、宁平与河江的酒店、民宿与生态旅舍，均为我们团队亲自入住体验过的住宿。", KO: "하노이, 닌빈, 하장 전역의 호텔, 홈스테이, 에코로지에 머무르며, 모두 저희 팀이 직접 숙박해 본 곳입니다." } },
      { label: { EN: "Border-area permits", ES: "Permisos de zona fronteriza", ZH: "边境地区通行证", KO: "국경 지역 허가" }, detail: { EN: "Registration for the Đồng Văn and Lũng Cú districts, handled in advance.", ES: "Registro para los distritos de Đồng Văn y Lũng Cú, gestionado con antelación.", ZH: "提前为您办理同文与龙姑地区的登记手续。", KO: "동반 및 룽꾸 지역 등록을 사전에 처리해 드립니다." } },
      { label: { EN: "Boat trips & entrance fees", ES: "Paseos en barco y entradas", ZH: "船票与门票费用", KO: "보트 투어 및 입장료" }, detail: { EN: "Tràng An, Vân Long and the Nho Quế river, plus welcome and farewell dinners.", ES: "Tràng An, Vân Long y el río Nho Quế, además de las cenas de bienvenida y despedida.", ZH: "长安、云隆及奶河的船票与门票，另含欢迎晚宴与告别晚宴。", KO: "짱안, 반롱, 뇨꾸에 강 관련 비용, 그리고 환영 만찬과 송별 만찬이 포함됩니다." } },
    ],
    notIncluded: { EN: "Not included: international and domestic flights, travel insurance, most meals and drinks, personal expenses and tips, and visa fees.", ES: "No incluido: vuelos internacionales y domésticos, seguro de viaje, la mayoría de las comidas y bebidas, gastos personales y propinas, y tasas de visa.", ZH: "不包含：国际及国内机票、旅行保险、大部分餐饮费用、个人消费与小费，以及签证费。", KO: "포함되지 않는 사항: 국제선 및 국내선 항공권, 여행자 보험, 대부분의 식사 및 음료, 개인 경비 및 팁, 그리고 비자 비용." },
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
    question: {
      EN: "What's included in the price?",
      ES: "¿Qué incluye el precio?",
      ZH: "价格包含哪些内容？",
      KO: "가격에 포함된 것은 무엇인가요?",
    },
    answer: {
      EN: "The price shown is our planning fee — it covers vetting, itinerary design, and concierge booking support from a named planner by WhatsApp for the duration of your trip. We don't sell packages: accommodation, transport and tours are booked directly with our verified suppliers, in your name, and you pay them directly. Some suppliers pay us a standard referral commission — we're transparent about that, and it's how we keep the planning fee low.",
      ES: "El precio mostrado es nuestra tarifa de planificación — cubre la verificación, el diseño del itinerario y el apoyo de reservas tipo concierge de un planificador con nombre por WhatsApp durante todo tu viaje. No vendemos paquetes: el alojamiento, el transporte y los tours se reservan directamente con nuestros proveedores verificados, a tu nombre, y tú les pagas directamente. Algunos proveedores nos pagan una comisión de referencia estándar — somos transparentes al respecto, y así es como mantenemos baja la tarifa de planificación.",
      ZH: "页面显示的价格是我们的规划服务费——涵盖实地审核、行程设计，以及在您整个行程期间由一位实名策划人通过WhatsApp提供的礼宾式预订支持。我们不出售旅行套餐：住宿、交通和游览项目均直接以您本人名义向我们审核过的供应商预订，费用由您直接支付给对方。部分供应商会向我们支付标准的推荐佣金——我们对此完全透明，这也是我们能将规划服务费维持在较低水平的原因。",
      KO: "표시된 가격은 저희의 기획 수수료입니다 — 현장 검증, 일정 설계, 그리고 여행 기간 내내 실명 플래너가 WhatsApp을 통해 제공하는 예약 지원 서비스가 포함되어 있습니다. 저희는 패키지 상품을 판매하지 않습니다: 숙박, 교통, 투어는 고객님 본인 명의로 저희가 검증한 공급업체와 직접 예약하시며, 비용도 해당 업체에 직접 지불하십니다. 일부 공급업체는 저희에게 표준 소개 수수료를 지급하며, 이 부분은 투명하게 공개하고 있고, 덕분에 기획 수수료를 낮게 유지할 수 있습니다.",
    },
  },
  {
    question: {
      EN: "Can I customise the itinerary?",
      ES: "¿Puedo personalizar el itinerario?",
      ZH: "可以定制行程吗？",
      KO: "일정을 맞춤 조정할 수 있나요?",
    },
    answer: {
      EN: "Yes — this is the point. The trip as listed is a starting framework. Every enquiry we receive gets a response from a named planner who will adjust dates, add or remove stops, and find accommodation that suits the way you actually travel.",
      ES: "Sí — de eso se trata. El viaje tal como se muestra es un marco de partida. Cada consulta que recibimos obtiene una respuesta de un planificador con nombre que ajustará las fechas, añadirá o quitará paradas, y encontrará alojamiento que se adapte a la forma en que realmente viajas.",
      ZH: "当然可以——这正是我们的初衷。页面上展示的行程只是一个起点框架。您发来的每一次咨询，都会有一位实名策划人亲自回复，帮您调整日期、增减行程站点，并找到真正符合您旅行方式的住宿。",
      KO: "물론입니다 — 바로 그것이 핵심입니다. 게시된 일정은 시작을 위한 기본 틀일 뿐입니다. 문의해 주시면 실명 플래너가 직접 답변드리며, 날짜 조정, 방문지 추가·삭제, 그리고 실제 여행 스타일에 맞는 숙소를 찾아드립니다.",
    },
  },
  {
    question: {
      EN: "What's your cancellation policy?",
      ES: "¿Cuál es su política de cancelación?",
      ZH: "取消政策是怎样的？",
      KO: "취소 정책은 어떻게 되나요?",
    },
    answer: {
      EN: "Full refund up to 60 days before departure. 50% refund between 30–60 days. No refund inside 30 days, but we will always work to rebook or transfer your dates if something comes up. We've never refused a reasonable request.",
      ES: "Reembolso completo hasta 60 días antes de la salida. Reembolso del 50% entre 30 y 60 días antes. Sin reembolso dentro de los 30 días, pero siempre trabajaremos para reprogramar o transferir tus fechas si surge algún imprevisto. Nunca hemos rechazado una solicitud razonable.",
      ZH: "出发前60天以上取消可全额退款；30至60天之间取消可退款50%；30天以内取消不予退款，但如遇突发情况，我们会尽力协助您改期或转让行程日期。我们从未拒绝过任何合理的请求。",
      KO: "출발 60일 전까지 취소 시 전액 환불됩니다. 30~60일 전 취소 시 50% 환불됩니다. 30일 이내 취소 시 환불은 어렵지만, 사정이 생기시면 언제든 일정 변경이나 양도를 위해 최선을 다해 도와드립니다. 합리적인 요청을 거절한 적은 한 번도 없습니다.",
    },
  },
  {
    question: {
      EN: "Is this suitable for solo travellers?",
      ES: "¿Es apto para viajeros solos?",
      ZH: "适合单人旅行者吗？",
      KO: "혼자 여행하기에도 적합한가요?",
    },
    answer: {
      EN: "We have sent solo travellers on every trip we offer. Many of our best enquiries come from people travelling alone. The per-person price is slightly higher for solo travel (single supplement on accommodation) but we'll be transparent about the exact figure upfront.",
      ES: "Hemos enviado a viajeros solos en cada uno de los viajes que ofrecemos. Muchas de nuestras mejores consultas vienen de personas que viajan solas. El precio por persona es ligeramente más alto para viajes en solitario (suplemento individual en el alojamiento), pero seremos transparentes sobre la cifra exacta desde el principio.",
      ZH: "我们提供的每一条行程都曾有单人旅行者参加过。事实上，我们收到的许多优质咨询正是来自独自出行的旅客。单人旅行的人均价格会略高一些（住宿单人差价），但我们会提前明确告知具体金额，绝不含糊。",
      KO: "저희가 제공하는 모든 여행에 혼자 여행하시는 분들을 보내드린 경험이 있습니다. 실제로 가장 좋은 문의 중 상당수가 혼자 여행하시는 분들에게서 옵니다. 1인 여행의 경우 인당 가격이 다소 높아질 수 있으나(숙박 싱글 추가 요금), 정확한 금액은 사전에 투명하게 안내해 드립니다.",
    },
  },
  {
    question: {
      EN: "Do I need a visa for Vietnam?",
      ES: "¿Necesito visa para Vietnam?",
      ZH: "去越南需要签证吗？",
      KO: "베트남 여행 시 비자가 필요한가요?",
    },
    answer: {
      EN: "Citizens of most Western countries can enter Vietnam visa-free for up to 45 days. We'll send you the current entry requirements for your passport when you enquire — they change periodically and we check them at time of booking, not at time of website update.",
      ES: "Los ciudadanos de la mayoría de los países occidentales pueden entrar a Vietnam sin visa por hasta 45 días. Te enviaremos los requisitos de entrada actuales para tu pasaporte cuando hagas tu consulta — cambian periódicamente y los verificamos en el momento de la reserva, no en el momento de actualizar el sitio web.",
      ZH: "大多数西方国家公民可免签入境越南，停留期限最长45天。您咨询时，我们会为您发送与您护照对应的最新入境要求——这些规定会不定期变化，我们会在您预订时进行核实，而非仅依据网站更新时间。",
      KO: "대부분의 서구권 국가 국민은 최대 45일간 무비자로 베트남에 입국할 수 있습니다. 문의해 주시면 여권 기준 최신 입국 요건을 안내해 드립니다 — 이 규정은 수시로 변경될 수 있어 웹사이트 업데이트 시점이 아닌 예약 시점을 기준으로 확인해 드립니다.",
    },
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
  { code: "ES", label: "Español", flag: "🇪🇸" },
  { code: "ZH", label: "中文", flag: "🇨🇳" },
  { code: "KO", label: "한국어", flag: "🇰🇷" },
];

// URL path prefix per language, for SEO — e.g. vietnamesehangout.com/es. English is the default, unprefixed URL.
const LANG_URL_PREFIX: Record<string, string> = { EN: "", ES: "es", ZH: "zh", KO: "ko" };
const URL_PREFIX_LANG: Record<string, string> = { es: "ES", zh: "ZH", ko: "KO" };

function getLanguageFromPath(pathname: string): typeof LANGUAGES[0] {
  const segment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  const code = segment ? URL_PREFIX_LANG[segment] : undefined;
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

// Maps the site's language switcher to a BCP-47 tag for the Web Speech API.
const SPEECH_LANG_MAP: Record<string, string> = {
  EN: "en-US",
  ES: "es-ES",
  ZH: "zh-CN",
  KO: "ko-KR",
};

// Site-wide translations — English, Español, 中文. Covers header, footer and the
// homepage. Trip detail pages, FAQs and vetting content stay English for now.
const TRANSLATIONS: Record<string, Record<string, string>> = {
  navCurrencyLabel: { EN: "Currency", ES: "Moneda", ZH: "货币", KO: "통화" },
  navLanguageLabel: { EN: "Language", ES: "Idioma", ZH: "语言", KO: "언어" },
  navTempLabel: { EN: "Temperature", ES: "Temperatura", ZH: "温度", KO: "온도" },
  navLogin: { EN: "Log in", ES: "Iniciar sesión", ZH: "登录", KO: "로그인" },
  navSignup: { EN: "Sign up", ES: "Registrarse", ZH: "注册", KO: "회원가입" },

  footerTagline: { EN: "In Vietnamese Hangout, you can trust.", ES: "En Vietnamese Hangout, puedes confiar.", ZH: "信赖 Vietnamese Hangout。", KO: "Vietnamese Hangout, 믿으셔도 좋습니다." },
  footerDescription: {
    EN: "Trip planning rooted in ground truth. Every place visited by a named person on our team. Based in Hồ Chí Minh City since 2017.",
    ES: "Planificación de viajes basada en la realidad. Cada lugar visitado por una persona identificada de nuestro equipo. Con sede en Ciudad Ho Chi Minh desde 2017.",
    ZH: "扎根实地的行程规划。每一个地点都由我们团队中的真实人员亲自到访。自2017年起总部设在胡志明市。", KO: "실제 현장에 기반한 여행 설계. 모든 장소는 저희 팀의 실명 담당자가 직접 방문했습니다. 2017년부터 호치민시에 본사를 두고 있습니다.",
  },
  footerContact: { EN: "Contact", ES: "Contacto", ZH: "联系方式", KO: "연락처" },
  footerNavigate: { EN: "Navigate", ES: "Navegación", ZH: "导航", KO: "메뉴" },
  footerOurTrips: { EN: "Our trips", ES: "Nuestros viajes", ZH: "我们的行程", KO: "우리의 여행" },
  footerHowWeVet: { EN: "How we vet", ES: "Cómo verificamos", ZH: "我们如何审核", KO: "검증 방법" },
  footerOurPeople: { EN: "Our people", ES: "Nuestro equipo", ZH: "我们的团队", KO: "우리 팀" },
  footerLocation: { EN: "Hồ Chí Minh City, Vietnam", ES: "Ciudad Ho Chi Minh, Vietnam", ZH: "越南胡志明市", KO: "베트남 호치민시" },

  seoTitle: {
    EN: "Vietnamese Hangout — Vietnam, planned by people who live it.",
    ES: "Vietnamese Hangout — Vietnam, planeado por quienes lo viven.",
    ZH: "Vietnamese Hangout — 由真正生活在越南的人为您规划旅程。",
    KO: "Vietnamese Hangout — 베트남에 사는 사람들이 직접 설계하는 여행.",
  },
  seoDescription: {
    EN: "Vietnam, planned by people who live it. Every place recommended by Vietnamese Hangout has been physically checked by a named member of our Saigon-based team.",
    ES: "Vietnam, planeado por quienes lo viven. Cada lugar recomendado por Vietnamese Hangout ha sido verificado en persona por un miembro con nombre de nuestro equipo con base en Saigón.",
    ZH: "越南旅程，由真正生活在这里的人为您规划。Vietnamese Hangout 推荐的每一个地点，均由我们西贡团队中的实名成员亲自实地核实。",
    KO: "베트남에 사는 사람들이 직접 설계하는 여행. Vietnamese Hangout이 추천하는 모든 장소는 사이공에 있는 저희 팀의 실명 멤버가 직접 방문해 확인한 곳입니다.",
  },
  heroTrustBadge: { EN: "In Vietnamese Hangout, you can trust", ES: "En Vietnamese Hangout, puedes confiar", ZH: "信赖 Vietnamese Hangout", KO: "Vietnamese Hangout, 믿으셔도 좋습니다" },
  heroHeadline: { EN: "Uncover unique trips in Vietnam,|tailored just for you", ES: "Descubre viajes únicos en Vietnam,|hechos a tu medida", ZH: "探索独一无二的越南之旅，|专为您量身打造", KO: "베트남에서만 만날 수 있는 특별한 여행,|당신만을 위해 맞춤 설계합니다" },
  heroSubtitle: {
    EN: "We build every itinerary around what you actually want — then a named local checks it before you pay.",
    ES: "Creamos cada itinerario según lo que realmente quieres — luego un local con nombre lo revisa antes de que pagues.",
    ZH: "我们根据您的真实需求量身定制每一份行程——付款前，会有一位实名当地人亲自把关。", KO: "고객님이 진짜 원하는 것을 중심으로 모든 일정을 설계합니다 — 결제 전, 실명의 현지인이 직접 확인합니다.",
  },
  messagePlaceholderListening: { EN: "Listening… speak your trip idea", ES: "Escuchando… cuéntanos tu idea de viaje", ZH: "正在聆听…说出你的行程想法", KO: "듣고 있습니다… 여행 아이디어를 말씀해 주세요" },
  startPlanning: { EN: "Start planning", ES: "Empezar a planear", ZH: "开始规划", KO: "계획 시작하기" },
  micErrorUnsupported: { EN: "Voice input isn't supported in this browser — try Chrome, Edge or Safari.", ES: "La entrada de voz no es compatible con este navegador — prueba con Chrome, Edge o Safari.", ZH: "此浏览器不支持语音输入——请尝试使用 Chrome、Edge 或 Safari。", KO: "이 브라우저에서는 음성 입력이 지원되지 않습니다 — Chrome, Edge 또는 Safari를 이용해 주세요." },
  micErrorDenied: { EN: "Microphone access denied — check your browser permissions.", ES: "Acceso al micrófono denegado — revisa los permisos del navegador.", ZH: "麦克风访问被拒绝——请检查浏览器权限设置。", KO: "마이크 접근이 거부되었습니다 — 브라우저 권한을 확인해 주세요." },
  micErrorGeneric: { EN: "Couldn't hear that — try again.", ES: "No pudimos escucharte — inténtalo de nuevo.", ZH: "没有听清——请再试一次。", KO: "잘 들리지 않았습니다 — 다시 시도해 주세요." },
  statLocalPlanners: { EN: "Local planners on the ground", ES: "Planificadores locales sobre el terreno", ZH: "当地策划人员", KO: "현지 플래너" },
  statRealTrips: { EN: "Real trips & reviews", ES: "Viajes y reseñas reales", ZH: "真实行程与评价", KO: "실제 여행 & 후기" },
  statVetted: { EN: "Vetted in person", ES: "Verificado en persona", ZH: "亲自实地审核", KO: "직접 현장 검증" },

  tripsHeading: {
    EN: "Trips shaped around Vietnam, with every spot personally vetted by us before it's shown in your plan.",
    ES: "Viajes diseñados en torno a Vietnam, con cada lugar verificado personalmente por nosotros antes de aparecer en tu plan.",
    ZH: "围绕越南量身打造的行程，每个地点在纳入您的计划前都经过我们亲自审核。", KO: "베트남을 중심으로 설계된 여행, 일정에 포함되기 전 저희가 직접 모든 장소를 검증합니다.",
  },
  madeFor: { EN: "Made for", ES: "Hecho para", ZH: "为...量身打造", KO: "다음을 위한 여행" },
  seeMoreTrips: { EN: "See more trips", ES: "Ver más viajes", ZH: "查看更多行程", KO: "더 많은 여행 보기" },

  stepEasyToReach: { EN: "Easy to reach", ES: "Fácil de contactar", ZH: "轻松联系", KO: "쉬운 연락" },
  stepTellIdea: { EN: "Tell us your idea", ES: "Cuéntanos tu idea", ZH: "告诉我们你的想法", KO: "아이디어 공유" },
  stepShapeTrip: { EN: "Shape your trip", ES: "Diseña tu viaje", ZH: "打造你的行程", KO: "여행 완성" },
  vhBrandName: { EN: "Vietnamese Hangout", ES: "Vietnamese Hangout", ZH: "Vietnamese Hangout", KO: "Vietnamese Hangout" },
  vhMessagePlain: { EN: "Message us anytime — ", ES: "Escríbenos cuando quieras — ", ZH: "随时给我们留言——", KO: "언제든 메시지를 남겨주세요 — " },
  vhMessageBold: { EN: "we usually reply within a few hours", ES: "normalmente respondemos en pocas horas", ZH: "我们通常在几小时内回复", KO: "보통 몇 시간 내로 답장드립니다" },
  founderSuffix: { EN: ", founder", ES: ", fundador", ZH: "，创始人", KO: ", 창업자" },
  founderMsgPlain1: { EN: "A named planner replies personally — not a bot. ", ES: "Un planificador con nombre te responde en persona — no un bot. ", ZH: "由实名策划人亲自回复——绝非机器人。", KO: "실명의 플래너가 직접 답변합니다 — 챗봇이 아닙니다. " },
  founderMsgBold: { EN: "You'll have my number the whole trip.", ES: "Tendrás mi número durante todo el viaje.", ZH: "整趟旅程你都会有我的联系方式。", KO: "여행 내내 제 연락처를 알려드립니다." },
  founderMsgPlain2: {
    EN: " Plus local contacts in the cities you're visiting, so if something goes wrong, someone nearby can actually get to you.",
    ES: " Además, contactos locales en las ciudades que visitas, para que si algo sale mal, alguien cercano pueda ayudarte de verdad.",
    ZH: "此外，您所到城市还配有当地联系人，万一出现问题，附近真的有人能第一时间赶到帮您处理。", KO: " 방문하시는 도시마다 현지 연락처도 함께 안내해 드리니, 문제가 생기면 가까운 곳에서 실제로 도와드릴 수 있습니다.",
  },

  realPeopleHeading: { EN: "Real people who really know Vietnam", ES: "Personas reales que realmente conocen Vietnam", ZH: "真正了解越南的真实团队", KO: "베트남을 진짜로 잘 아는 사람들" },
  findNextTrip: { EN: "Find your next trip in Vietnam", ES: "Encuentra tu próximo viaje en Vietnam", ZH: "寻找你的下一场越南之旅", KO: "베트남에서 다음 여행지 찾기" },
  howPlanningWorks: { EN: "How planning works", ES: "Cómo funciona la planificación", ZH: "规划流程如何运作", KO: "여행 계획은 이렇게 진행됩니다" },
  fourSteps: { EN: "Four steps, no ticket queue.", ES: "Cuatro pasos, sin filas de tickets.", ZH: "四个步骤，无需排队等候。", KO: "네 단계, 대기표는 없습니다." },

  step1Title: { EN: "Tell us your wish list", ES: "Cuéntanos tu lista de deseos", ZH: "告诉我们您的心愿清单", KO: "원하시는 여행을 말씀해 주세요" },
  step1Body: { EN: "A 7-question brief — takes 4 minutes, no account required. Dates, who's coming, what you'd rather avoid.", ES: "Un breve de 7 preguntas — toma 4 minutos, sin necesidad de cuenta. Fechas, quién viene, qué prefieres evitar.", ZH: "一份包含7个问题的简介——只需4分钟，无需注册账户。包括日期、同行人数、想要避开的事项。", KO: "7개 질문으로 구성된 간단한 설문 — 4분이면 충분하고 계정도 필요 없습니다. 날짜, 동행자, 피하고 싶은 것들을 알려주세요." },
  step2Title: { EN: "A named planner replies", ES: "Un planificador con nombre responde", ZH: "实名策划人亲自回复", KO: "실명의 플래너가 답변합니다" },
  step2Body: { EN: "Same day. You'll know their name, their region, and how many places they've personally checked.", ES: "El mismo día. Sabrás su nombre, su región y cuántos lugares ha verificado personalmente.", ZH: "当天回复。您将知道对方的姓名、所在地区，以及他们亲自审核过多少个地点。", KO: "당일 답변드립니다. 담당자의 이름, 지역, 직접 검증한 장소 수까지 알려드립니다." },
  step3Title: { EN: "We build it together", ES: "Lo construimos juntos", ZH: "我们一起打造行程", KO: "함께 일정을 완성합니다" },
  step3Body: { EN: "Two or three exchanges by WhatsApp — we refine the route and source places we've stayed in ourselves.", ES: "Dos o tres intercambios por WhatsApp — refinamos la ruta y buscamos lugares donde nosotros mismos nos hemos alojado.", ZH: "通过WhatsApp往返两三次沟通——我们会完善路线，并推荐我们亲自住过的地方。", KO: "WhatsApp으로 두세 번 대화하며 경로를 다듬고, 저희가 직접 묵어본 장소들로 채워갑니다." },
  step4Title: { EN: "You travel, we're reachable", ES: "Tú viajas, nosotros estamos disponibles", ZH: "您出行，我们随时在线", KO: "여행 중에도 언제든 연락 가능" },
  step4Body: { EN: "A local number and a mid-trip check-in. If something changes on the ground, we're the ones who fix it.", ES: "Un número local y un seguimiento a mitad de viaje. Si algo cambia sobre el terreno, somos nosotros quienes lo solucionamos.", ZH: "提供当地联系电话，并在行程中途主动跟进。如果实地情况有变，由我们负责解决。", KO: "현지 연락처와 여행 중간 점검을 제공합니다. 현장 상황이 바뀌면 저희가 직접 해결합니다." },

  aiComingDecember: { EN: "Coming this December", ES: "Próximamente en diciembre", ZH: "今年12月上线", KO: "올해 12월 출시 예정" },
  aiHeadline: { EN: "AI-human trip planning is on its way", ES: "La planificación de viajes con IA y humanos está en camino", ZH: "AI + 真人行程规划即将上线", KO: "AI와 사람이 함께하는 여행 설계, 곧 시작됩니다" },
  aiBody: {
    EN: "A faster way to start your plan with AI — with every spot still checked in person by a named local before it reaches you.",
    ES: "Una forma más rápida de comenzar tu plan con IA — con cada lugar todavía verificado en persona por un local con nombre antes de llegar a ti.",
    ZH: "借助AI更快开始规划行程——每个地点在送达您手中前，仍会由实名当地人亲自把关。", KO: "AI로 더 빠르게 일정을 시작하고, 고객님께 전달되기 전 실명의 현지인이 직접 모든 장소를 확인합니다.",
  },
  getNotified: { EN: "Get notified", ES: "Notificarme", ZH: "获取通知", KO: "알림 받기" },

  whyHeadline: { EN: "A package tour hides the markup. We don't sell packages.", ES: "Un tour todo incluido esconde el margen. Nosotros no vendemos paquetes.", ZH: "打包旅行团隐藏了加价。我们不卖打包套餐。", KO: "패키지 투어는 마진을 숨깁니다. 저희는 패키지를 팔지 않습니다." },
  whyBody: {
    EN: "Most agencies fold planning, vetting and their margin into one all-in number you can't see inside. We split it on purpose.",
    ES: "La mayoría de las agencias combinan la planificación, la verificación y su margen en un solo número todo incluido que no puedes ver por dentro. Nosotros lo separamos a propósito.",
    ZH: "大多数旅行社把规划、审核和利润都揉进一个看不透的总价里。我们特意把它们拆开。", KO: "대부분의 여행사는 기획, 검증, 마진을 하나의 금액에 뭉뚱그려 안에서 무슨 일이 일어나는지 볼 수 없게 만듭니다. 저희는 일부러 이를 분리했습니다.",
  },
  typicalAgency: { EN: "Typical agency", ES: "Agencia típica", ZH: "常规旅行社", KO: "일반적인 여행사" },
  oneBundledPrice: { EN: "One bundled price", ES: "Un precio combinado", ZH: "统一打包价", KO: "하나로 묶인 가격" },
  agencyBullet1: { EN: "Planning, vetting and margin folded together", ES: "Planificación, verificación y margen combinados", ZH: "规划、审核和利润混在一起", KO: "기획, 검증, 마진이 한데 뒤섞여 있음" },
  agencyBullet2: { EN: "You can't see what's a fee vs. a kickback", ES: "No puedes ver qué es una tarifa y qué es una comisión", ZH: "你分不清哪些是服务费，哪些是回扣", KO: "수수료인지 리베이트인지 알 수 없음" },
  agencyBullet3: { EN: "No named person accountable for the plan", ES: "Ninguna persona con nombre responsable del plan", ZH: "没有实名负责人对行程负责", KO: "일정에 책임지는 실명 담당자가 없음" },
  planningFeeFlat: { EN: "planning fee, flat", ES: "tarifa de planificación, fija", ZH: "规划服务费（固定）", KO: "고정 기획 수수료" },
  vhBullet1: { EN: "The whole cost of a named planner building & vetting your trip", ES: "El costo completo de un planificador con nombre creando y verificando tu viaje", ZH: "涵盖实名策划人为您打造并审核行程的全部费用", KO: "실명 플래너가 여행을 설계하고 검증하는 데 드는 전체 비용" },
  vhBullet2: { EN: "Hotels, drivers, tours — booked directly, in your own name", ES: "Hoteles, conductores, tours — reservados directamente, a tu propio nombre", ZH: "酒店、司机、行程——均以您本人名义直接预订", KO: "호텔, 기사, 투어 — 고객님 명의로 직접 예약" },
  vhBullet3: { EN: "Usually less than what's already hidden in a bundled price", ES: "Generalmente menos de lo que ya está oculto en un precio combinado", ZH: "通常比打包价里隐藏的费用还要低", KO: "보통 묶음 가격 안에 숨겨진 비용보다 저렴함" },

  filterDestinations: { EN: "Destinations", ES: "Destinos", ZH: "目的地", KO: "여행지" },
  filterTopPicks: { EN: "Top picks", ES: "Los más elegidos", ZH: "精选推荐", KO: "인기 코스" },
  filterNorth: { EN: "North", ES: "Norte", ZH: "北部", KO: "북부" },
  filterCentral: { EN: "Central", ES: "Centro", ZH: "中部", KO: "중부" },
  filterSouth: { EN: "South", ES: "Sur", ZH: "南部", KO: "남부" },

  tdReviews: { EN: "Reviews & real trips on Instagram", ES: "Reseñas y viajes reales en Instagram", ZH: "Instagram 上的真实评价与行程", KO: "인스타그램에서 실제 후기와 여행 보기" },
  tdShare: { EN: "Share", ES: "Compartir", ZH: "分享", KO: "공유" },
  tdSave: { EN: "Save", ES: "Guardar", ZH: "收藏", KO: "저장" },
  tdLastVetted: { EN: "Last vetted", ES: "Última verificación", ZH: "最近审核", KO: "최근 검증" },
  tdTravellers: { EN: "Travellers", ES: "Viajeros", ZH: "旅客人数", KO: "여행 인원" },
  tdTraveller: { EN: "traveller", ES: "viajero", ZH: "位旅客", KO: "명" },
  tdTravellersPlural: { EN: "travellers", ES: "viajeros", ZH: "位旅客", KO: "명" },
  tdTripCost: { EN: "Trip cost", ES: "Costo del viaje", ZH: "行程费用", KO: "여행 비용" },
  tdPlanningFee: { EN: "Planning fee", ES: "Tarifa de planificación", ZH: "规划服务费", KO: "기획 수수료" },
  tdFrom: { EN: "From", ES: "Desde", ZH: "起价", KO: "시작가" },
  tdPerPerson: { EN: "per person", ES: "por persona", ZH: "/人", KO: "인당" },
  tdBookingNow: { EN: "Booking Now", ES: "Reservar ahora", ZH: "立即预订", KO: "지금 예약하기" },
  tdPaymentNote: {
    EN: "No payment now. A planner replies within 24 hours. Trip cost is paid directly to suppliers, in your name.",
    ES: "Sin pago ahora. Un planificador responde en 24 horas. El costo del viaje se paga directamente a los proveedores, a tu nombre.",
    ZH: "现在无需付款。策划人员将在24小时内回复。行程费用将以您本人名义直接支付给供应商。",
    KO: "지금 결제하지 않습니다. 플래너가 24시간 이내에 답변드립니다. 여행 비용은 고객님 명의로 공급업체에 직접 지불됩니다.",
  },
  tdDescriptionLabel: { EN: "[Description]", ES: "[Descripción]", ZH: "[行程介绍]", KO: "[여행 소개]" },
  tdTravelPlansLabel: { EN: "[Travel plans]", ES: "[Plan de viaje]", ZH: "[行程安排]", KO: "[여행 일정]" },
  tdYourItinerary: { EN: "Your Travel Itinerary", ES: "Tu Itinerario de Viaje", ZH: "您的旅行行程", KO: "여행 일정표" },
  tdWhatsIncludedLabel: { EN: "[What's included]", ES: "[Qué incluye]", ZH: "[费用包含]", KO: "[포함 사항]" },
  tdWhatsCovered: { EN: "What's Covered in Your Experience", ES: "Qué Incluye Tu Experiencia", ZH: "行程包含内容", KO: "여행에 포함된 내용" },
  tdExploreMore: { EN: "Explore More Trips", ES: "Explora Más Viajes", ZH: "探索更多行程", KO: "다른 여행 둘러보기" },
  tdExploreMoreSub: {
    EN: "Whether it's coast, highlands or the city — every trip is vetted the same way.",
    ES: "Ya sea costa, tierras altas o ciudad — cada viaje se verifica de la misma manera.",
    ZH: "无论是海岸、高原还是城市——每一趟行程都经过同样严格的审核。",
    KO: "해안이든 고원이든 도시든 — 모든 여행은 동일한 방식으로 검증됩니다.",
  },
  tdFrequentlyAsked: { EN: "Frequently asked", ES: "Preguntas frecuentes", ZH: "常见问题", KO: "자주 묻는 질문" },
  tdClosingHeadline: { EN: "Uncover unique trips, tailored just for you", ES: "Descubre viajes únicos, hechos a tu medida", ZH: "探索独一无二的旅程，为您量身打造", KO: "특별한 여행을 만나보세요, 당신만을 위한 맞춤 설계" },
  tdClosingSub: {
    EN: "We build every itinerary around what you actually want — then a named local checks it before you pay.",
    ES: "Construimos cada itinerario según lo que realmente quieres — luego un local con nombre lo revisa antes de que pagues.",
    ZH: "我们根据您的真实需求量身定制每一条行程——付款前，会有一位署名当地人为您把关核实。",
    KO: "고객님이 진짜 원하는 것을 중심으로 모든 일정을 설계합니다 — 결제 전, 실명의 현지 팀원이 직접 확인합니다.",
  },
  tdGetStarted: { EN: "Get Started", ES: "Comenzar", ZH: "立即开始", KO: "시작하기" },

  tagline_mekong_condao: { EN: "Floating markets before sunrise, then a night on a national park beach watching sea turtles nest.", ES: "Mercados flotantes antes del amanecer, luego una noche en una playa de parque nacional viendo anidar a las tortugas marinas.", ZH: "日出前的水上市场，夜晚在国家公园海滩观赏海龟产卵。", KO: "해 뜨기 전 수상시장을 둘러보고, 국립공원 해변에서 바다거북 산란을 지켜보는 밤을 보냅니다." },
  desc_mekong_condao: {
    EN: "This is a real itinerary we planned and ran — five days built around two things that don't wait for anyone: the floating market at Cái Răng, busiest in the first hour of light, and the sea turtles nesting on Hòn Bảy Cạnh, which come ashore on the tide's schedule, not ours. Everything in between — the homestay on Cồn Sơn, the flight out to Côn Đảo — is built around getting you to those two moments at the right time.",
    ES: "Este es un itinerario real que planificamos y realizamos — cinco días construidos en torno a dos cosas que no esperan a nadie: el mercado flotante de Cái Răng, más concurrido en la primera hora de luz, y las tortugas marinas anidando en Hòn Bảy Cạnh, que llegan a la orilla según el horario de la marea, no el nuestro. Todo lo demás — el homestay en Cồn Sơn, el vuelo a Côn Đảo — está construido para llevarte a esos dos momentos en el momento justo.",
    ZH: "这是我们真实规划并亲自执行过的行程——五天时间围绕两件不等人的事展开：清晨最热闹时刻的 Cái Răng 水上市场，以及按潮汐时间（而非我们的时间表）上岸产卵的海龟，地点在 Hòn Bảy Cạnh。中间的所有安排——Cồn Sơn 的民宿、飞往 Côn Đảo 的航班——都是为了让您准时抵达这两个关键时刻。",
    KO: "저희가 직접 기획하고 실제로 운영한 진짜 일정입니다 — 아무도 기다려주지 않는 두 가지를 중심으로 짜인 5일: 이른 아침이 가장 붐비는 Cái Răng 수상시장, 그리고 저희 일정이 아닌 조수 시간에 맞춰 해변으로 올라오는 Hòn Bảy Cạnh의 바다거북 산란입니다. Cồn Sơn 홈스테이, Côn Đảo행 항공편 등 그 사이의 모든 일정은 이 두 순간에 정확한 타이밍으로 도착할 수 있도록 설계되었습니다.",
  },

  tagline_dalat_nature: { EN: "A relaxed pace built for a couple who don't want to rush — coffee farms, a lake, pine forest.", ES: "Un ritmo relajado pensado para una pareja que no quiere apresurarse — fincas de café, un lago, bosque de pinos.", ZH: "为不想匆忙赶行程的情侣打造的悠闲节奏——咖啡庄园、湖泊、松林。", KO: "서두르고 싶지 않은 커플을 위한 여유로운 여행 — 커피 농장, 호수, 소나무 숲." },
  desc_dalat_nature: {
    EN: "Three unhurried days built for a couple who don't want to be marched between sights — a quiet farmhouse homestay, a coffee farm tasting to see how highland Arabica is actually grown, and an afternoon on Tuyền Lâm Lake with nothing scheduled. The pace is the point.",
    ES: "Tres días sin prisas pensados para una pareja que no quiere ser arrastrada entre atracciones — un tranquilo homestay en una granja, una cata en una finca de café para ver cómo se cultiva realmente el Arábica de altura, y una tarde en el lago Tuyền Lâm sin nada programado. El ritmo es lo importante.",
    ZH: "为不想被赶场式观光的情侣打造的三天悠闲行程——宁静的农庄民宿、亲眼见证高原阿拉比卡咖啡真实种植过程的庄园品鉴，以及在 Tuyền Lâm 湖畔无任何安排的一个下午。慢节奏才是重点。",
    KO: "이곳저곳 끌려다니고 싶지 않은 커플을 위한 여유로운 3일 — 조용한 농가 홈스테이, 고원 아라비카 커피가 실제로 어떻게 재배되는지 보는 커피 농장 시음, 그리고 아무 일정 없이 보내는 Tuyền Lâm 호수의 오후. 느긋한 속도 자체가 이 여행의 핵심입니다.",
  },

  tagline_food_journey: { EN: "A night scooter food crawl through Saigon, sunrise at Cái Răng, a full day cooking in Hội An.", ES: "Un recorrido gastronómico en scooter por Saigón de noche, amanecer en Cái Răng, un día completo cocinando en Hội An.", ZH: "夜游西贡的摩托车美食之旅，清晨探访 Cái Răng 水上市场，在会安度过一整天的烹饪体验。", KO: "사이공 밤거리를 스쿠터로 누비는 야식 투어, Cái Răng의 일출, 그리고 Hội An에서 보내는 하루 종일 요리 체험." },
  desc_food_journey: {
    EN: "Eight days built around eating the way locals eat — a scooter food crawl through Saigon's backstreets after dark, the floating market at Cái Răng before the traders leave, and a full day cooking in Hội An with what you bought that morning at the market. The coast road over Hải Vân Pass closes it out.",
    ES: "Ocho días construidos en torno a comer como lo hacen los locales — un recorrido gastronómico en scooter por los callejones de Saigón después del anochecer, el mercado flotante de Cái Răng antes de que los comerciantes se vayan, y un día completo cocinando en Hội An con lo que compraste esa mañana en el mercado. La carretera costera sobre el paso de Hải Vân lo cierra.",
    ZH: "八天行程围绕当地人真正的饮食方式展开——夜幕降临后穿梭于西贡后巷的摩托车美食之旅，赶在商贩收摊前造访 Cái Răng 水上市场，以及在会安用当天早市买来的食材度过整整一天的烹饪体验。最后以穿越海云关的沿海公路收尾。",
    KO: "현지인처럼 먹는 것을 중심으로 짜인 8일 — 해가 진 후 사이공 뒷골목을 스쿠터로 누비는 야식 투어, 상인들이 떠나기 전 Cái Răng 수상시장 방문, 그리고 그날 아침 시장에서 산 재료로 Hội An에서 보내는 하루 종일의 요리 체험까지. Hải Vân 고개를 넘는 해안 도로로 마무리됩니다.",
  },

  tagline_grand_tour: { EN: "Christmas Eve on My Khe Beach, the Hải Vân Pass by scenic train, four cities in ten days.", ES: "Nochebuena en la playa My Khe, el paso de Hải Vân en tren panorámico, cuatro ciudades en diez días.", ZH: "圣诞夜在美溪海滩，乘观光列车穿越海云关，十天畅游四座城市。", KO: "My Khe 해변에서 보내는 크리스마스 이브, 전망 열차로 넘는 Hải Vân 고개, 10일간 4개 도시 여행." },
  desc_grand_tour: {
    EN: "Ten days across four cities, built around a family Christmas — Bà Nà Hills and the Golden Bridge on Christmas Eve, a scenic train over Hải Vân Pass, and the Imperial City in Huế. Enough movement to see the country, enough downtime that nobody comes home exhausted.",
    ES: "Diez días por cuatro ciudades, construidos en torno a una Navidad familiar — las colinas de Bà Nà y el Puente Dorado en Nochebuena, un tren panorámico sobre el paso de Hải Vân, y la Ciudad Imperial en Huế. Suficiente movimiento para ver el país, suficiente tiempo libre para que nadie llegue agotado a casa.",
    ZH: "十天穿越四座城市，围绕一次家庭圣诞节展开——平安夜的巴拿山与金桥、穿越海云关的观光列车，以及顺化的皇城。行程紧凑到足以领略全国风光，又留有充分的休息时间，不会让任何人疲惫而归。",
    KO: "네 개 도시를 도는 10일, 가족과 함께하는 크리스마스를 중심으로 구성했습니다 — 크리스마스 이브의 Bà Nà 언덕과 골든브릿지, Hải Vân 고개를 넘는 전망 열차, 그리고 후에의 황성까지. 나라 곳곳을 둘러볼 만큼 알차면서도, 아무도 지쳐서 돌아오지 않을 만큼 여유도 충분합니다.",
  },

  tagline_north_vietnam_hagiang: { EN: "Two easy days in Hanoi, quiet limestone valleys in Ninh Bình, then four days on the Hà Giang loop by private car — built for a relaxed pace, not a rush.", ES: "Dos días tranquilos en Hanói, valles de piedra caliza en Ninh Bình, y cuatro días en el circuito de Hà Giang en auto privado — pensado para un ritmo relajado, no para correr.", ZH: "两天悠闲的河内漫游，宁静的宁平石灰岩山谷，再加四天专车游览河江环线——为悠闲节奏而设计，而非匆忙赶路。", KO: "하노이에서의 여유로운 이틀, 닌빈의 고요한 석회암 계곡, 그리고 전용 차량으로 도는 하장 루프 4일 — 서두르지 않는 여유로운 여행을 위해 설계되었습니다." },
  desc_north_vietnam_hagiang: {
    EN: "Nine days built for travellers who want to see the north without rushing: two easy days in Hanoi, two days in the rice fields and limestone valleys of Ninh Bình, and four days on the Hà Giang mountain loop with a private driver instead of a motorbike. Every day leaves room to sit down, drink coffee, and watch the place go by. The mountain roads are spectacular and genuinely winding — we build in short driving legs of two to three hours maximum between stops, front-seat rotation, and unhurried stops. Can be shortened to 7 days or extended to 11.",
    ES: "Nueve días pensados para viajeros que quieren ver el norte sin prisas: dos días tranquilos en Hanói, dos días en los arrozales y valles de piedra caliza de Ninh Bình, y cuatro días en el circuito montañoso de Hà Giang con un conductor privado en lugar de una moto. Cada día deja espacio para sentarse, tomar un café y ver pasar el lugar. Las carreteras de montaña son espectaculares y verdaderamente sinuosas — organizamos tramos cortos de conducción de un máximo de dos a tres horas entre paradas, rotación en el asiento delantero y paradas sin prisas. Se puede acortar a 7 días o extender a 11.",
    ZH: "为想要不慌不忙游览北部的旅行者打造的九天行程：两天悠闲的河内漫游，两天漫步宁平的稻田与石灰岩山谷，再加四天由专职司机（而非摩托车）带领的河江山路环线。每一天都留有余地，让您坐下来喝杯咖啡，静静看着风景流过。山路景色壮观且真正蜿蜒曲折——我们将每段车程控制在两到三小时以内，安排前排轮换座位，并留出充裕的停留时间。行程可缩短为7天，也可延长至11天。",
    KO: "서두르지 않고 북부를 둘러보고 싶은 여행자를 위한 9일 일정입니다: 하노이에서의 여유로운 이틀, 닌빈의 논과 석회암 계곡에서의 이틀, 그리고 오토바이 대신 전용 기사와 함께하는 하장 산악 루프 4일. 매일 여유롭게 앉아 커피를 마시며 풍경을 바라볼 시간이 있습니다. 산길은 놀라울 만큼 아름답고 실제로 구불구불합니다 — 정류장 사이 최대 2~3시간의 짧은 구간으로 나누고, 앞좌석 교대, 여유로운 정차를 계획에 포함합니다. 7일로 단축하거나 11일로 연장할 수 있습니다.",
  },
};

const t = (key: string, language: { code: string }): string => {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[language.code] || entry.EN || key;
};

// Looks up a language variant on an inline translation object, e.g. an itinerary day's { EN, ES, ZH, KO } title.
const tr = (entry: Record<string, string>, language: { code: string }): string =>
  entry[language.code] || entry.EN;

const formatDayLabel = (day: number, language: { code: string }): string => {
  switch (language.code) {
    case "ES": return `Día ${day}`;
    case "ZH": return `第${day}天`;
    case "KO": return `${day}일차`;
    default: return `Day ${day}`;
  }
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
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-[76px] flex items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center">
            <img src={logo} alt="Vietnamese Hangout" className="w-14 h-14 object-contain" />
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
                  <button onClick={() => setOpenMenu(null)} className="w-full text-left px-3.5 py-2 text-[13px] text-[#191713] hover:bg-[#F5F2EC] font-semibold">{t("navLogin", language)}</button>
                  <button onClick={() => setOpenMenu(null)} className="w-full text-left px-3.5 py-2 text-[13px] text-[#6B6457] hover:bg-[#F5F2EC]">{t("navSignup", language)}</button>
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
                <p className="text-[10px] uppercase tracking-wider text-[#6B6457] mb-2">{t("navCurrencyLabel", language)}</p>
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
                <p className="text-[10px] uppercase tracking-wider text-[#6B6457] mb-2">{t("navLanguageLabel", language)}</p>
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
                <p className="text-[10px] uppercase tracking-wider text-[#6B6457] mb-2">{t("navTempLabel", language)}</p>
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
                  {t("navLogin", language)}
                </button>
              </div>
            </div>
            <div className="mt-auto pt-10 border-t border-[rgba(25,23,19,0.15)]">
              <p style={{ fontFamily: S }} className="text-xs text-[#6B6457]">info@vietnamesehangout.com</p>
              <p style={{ fontFamily: S }} className="text-xs text-[#6B6457] mt-1">+84 772 751 430</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ setPage, language }: { setPage: (p: string) => void; language: typeof LANGUAGES[0] }) {
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
            <p style={{ fontFamily: S }} className="text-sm italic text-[rgba(245,242,236,0.7)] mb-3">
              {t("footerTagline", language)}
            </p>
            <p style={{ fontFamily: S }} className="text-sm text-[rgba(245,242,236,0.55)] leading-relaxed max-w-xs">
              {t("footerDescription", language)}
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            <div>
              <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[rgba(245,242,236,0.4)] mb-4">{t("footerContact", language)}</p>
              <div className="space-y-2.5">
                <a href="mailto:info@vietnamesehangout.com" style={{ fontFamily: S }} className="flex items-center gap-2.5 text-sm text-[rgba(245,242,236,0.75)] hover:text-[#F5F2EC] transition-colors">
                  <Mail size={13} className="flex-shrink-0" />
                  info@vietnamesehangout.com
                </a>
                <a href="tel:+84772751430" style={{ fontFamily: S }} className="flex items-center gap-2.5 text-sm text-[rgba(245,242,236,0.75)] hover:text-[#F5F2EC] transition-colors">
                  <Phone size={13} className="flex-shrink-0" />
                  +84 772 751 430
                </a>
                <p style={{ fontFamily: S }} className="flex items-center gap-2.5 text-sm text-[rgba(245,242,236,0.55)]">
                  <MapPin size={13} className="flex-shrink-0" />
                  {t("footerLocation", language)}
                </p>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[rgba(245,242,236,0.4)] mb-4">{t("footerNavigate", language)}</p>
              <div className="space-y-2.5">
                {[
                  { label: t("footerOurTrips", language), page: "home" },
                  { label: t("footerHowWeVet", language), page: "vetting" },
                  { label: t("footerOurPeople", language), page: "people" },
                ].map((l) => (
                  <button
                    key={l.page}
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

        <div className="flex items-center">
          <button onClick={openInstagramProfile} style={{ fontFamily: S }} className="flex items-center gap-1.5 text-xs text-[rgba(245,242,236,0.55)] hover:text-[#F5F2EC] transition-colors">
            <Instagram size={13} />
            @vietnamesehangout
          </button>
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
  const [regionFilter, setRegionFilter] = useState<"top" | "north" | "central" | "south">("top");
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
      setMicError(t("micErrorUnsupported", language));
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
      setMicError(event.error === "not-allowed" ? t("micErrorDenied", language) : t("micErrorGeneric", language));
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
          <span style={{ fontFamily: S }} className="inline-block text-[11px] uppercase tracking-[0.15em] font-semibold text-[#004226] bg-[#004226]/10 px-3 py-1.5 rounded-full mb-5">
            {t("heroTrustBadge", language)}
          </span>
          <h1
            style={{ fontFamily: F, lineHeight: 1.05 }}
            className="text-[clamp(22px,3.4vw,40px)] font-extrabold text-[#191713] mb-6 tracking-[-0.02em]"
          >
            {t("heroHeadline", language).split("|")[0]}<br />{t("heroHeadline", language).split("|")[1]}
          </h1>

          {/* WhatsApp message box */}
          <div className="max-w-2xl mx-auto mb-3">
            <div className="bg-white rounded-[28px] shadow-lg p-4 flex flex-col gap-3 min-h-[130px]">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder={isListening ? t("messagePlaceholderListening", language) : (typedPlaceholder || " ")}
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
                  {t("startPlanning", language)} <Send size={15} />
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
            {t("heroSubtitle", language)}
          </p>

          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {[
              { label: t("statLocalPlanners", language), value: "5" },
              { label: t("statRealTrips", language), value: "instagram" },
              { label: t("statVetted", language), value: "100%" },
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
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 style={{ fontFamily: F }} className="text-lg font-bold text-[#191713]">{t("tripsHeading", language)}</h2>
          </div>
          <div className="overflow-hidden -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-5 pb-4 w-max animate-marquee">
              {["a", "b"].map((copy) => (
                <React.Fragment key={copy}>
                  {TRIPS.map((trip) => (
                    <button
                      key={`${copy}-${trip.id}`}
                      onClick={() => { setSelectedTripId(trip.id); setPage("trip"); window.scrollTo({ top: 0 }); }}
                      className="relative flex-shrink-0 w-[240px] md:w-[270px] rounded-3xl overflow-hidden text-left group"
                      style={{ height: 340 }}
                    >
                      <img src={trip.photo} alt={trip.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <span style={{ fontFamily: S }} className="absolute top-4 right-4 bg-white/90 text-[#191713] text-[11px] font-semibold px-3 py-1 rounded-full">
                        {trip.duration}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p style={{ fontFamily: F }} className="text-white font-bold text-lg leading-snug mb-1">{trip.name}</p>
                        <p style={{ fontFamily: S }} className="text-white/70 text-xs">{t("madeFor", language)} {trip.madeFor}</p>
                      </div>
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => { setSelectedTripId(TRIPS[0].id); setPage("trip"); window.scrollTo({ top: 0 }); }}
              style={{ fontFamily: S }}
              className="bg-[#004226] text-white rounded-full px-6 py-3 text-sm font-bold hover:bg-[#00331E] transition-colors"
            >
              {t("seeMoreTrips", language)}
            </button>
          </div>
        </div>
      </section>
      </div>

      {/* WhatsApp + human duo */}
      <section className="relative overflow-hidden px-6 md:px-16 pt-2 pb-20 md:pt-3 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#E4EFE9]" />
        <div className="relative max-w-[1440px] mx-auto">
          <div className="text-center max-w-full mx-auto mb-6 px-2">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {[t("stepEasyToReach", language), t("stepTellIdea", language), t("stepShapeTrip", language)].map((step, i) => (
                <React.Fragment key={step}>
                  {i > 0 && <span className="text-[#191713] flex-shrink-0">&middot;</span>}
                  <span
                    style={{ fontFamily: F }}
                    className="text-center text-[clamp(1.75rem,3.13vw,3.25rem)] leading-none font-bold text-[#191713]"
                  >
                    {step}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="max-w-[900px] mx-auto relative" style={{ paddingTop: 28, paddingBottom: 28 }}>
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[20px] min-[900px]:!aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1609412058473-c199497c3c5d?w=1600&auto=format&fit=max"
                alt="Rice terraces in the northern highlands"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="absolute top-4 left-2 md:-left-8 max-w-[85%] sm:max-w-none">
              <div className="relative bg-white border border-[rgba(25,23,19,0.08)] rounded-[20px] shadow-[-4px_4px_4px_0px_#FFFFFF29] px-5 pt-4 pb-9 min-[900px]:!px-[clamp(18px,2.6cqw,26px)] min-[900px]:!pt-[clamp(14px,2.1cqw,19px)] min-[900px]:!pb-[clamp(30px,4cqw,38px)] max-w-[280px]">
                <p style={{ fontFamily: S }} className="text-sm font-semibold text-[#004226] mb-1">{t("vhBrandName", language)}</p>
                <p style={{ fontFamily: S }} className="text-sm text-[#191713] leading-snug">
                  {t("vhMessagePlain", language)}<span className="font-semibold">{t("vhMessageBold", language)}</span>.
                </p>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-[#004226] text-white flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white">
                  <MessageCircle size={19} />
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-2 md:-right-8 max-w-[85%] sm:max-w-none">
              <div className="relative bg-white border border-[rgba(25,23,19,0.08)] rounded-[20px] shadow-[-4px_4px_4px_0px_#FFFFFF29] px-5 pt-4 pb-9 min-[900px]:!px-[clamp(18px,2.6cqw,26px)] min-[900px]:!pt-[clamp(14px,2.1cqw,19px)] min-[900px]:!pb-[clamp(30px,4cqw,38px)] max-w-[280px]">
                <p style={{ fontFamily: S }} className="text-sm font-semibold text-[#004226] mb-1">{TEAM[0].name}{t("founderSuffix", language)}</p>
                <p style={{ fontFamily: S }} className="text-sm text-[#191713] leading-snug">
                  {t("founderMsgPlain1", language)}<span className="font-semibold">{t("founderMsgBold", language)}</span>{t("founderMsgPlain2", language)}
                </p>
                <img src={TEAM[0].photo} alt={TEAM[0].name} className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full object-cover bg-[#E5E0D6] flex-shrink-0 shadow-lg ring-2 ring-white" />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => openWhatsApp()}
              style={{ fontFamily: S }}
              className="bg-[#004226] text-white rounded-full px-6 py-3 text-sm font-bold inline-flex items-center gap-2 hover:bg-[#00331E] transition-colors"
            >
              <MessageCircle size={16} /> {t("startPlanning", language)}
            </button>
          </div>
        </div>
      </section>

      {/* Real people grid */}
      <section className="bg-[#004226] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <h2 style={{ fontFamily: F }} className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {t("realPeopleHeading", language)}
          </h2>
          <div className="overflow-hidden mb-12">
            <div className="flex gap-5 w-max animate-marquee">
              {["a", "b"].map((copy) => (
                <React.Fragment key={copy}>
                  {TEAM.map((m) => (
                    <button
                      key={`${copy}-${m.name}`}
                      onClick={() => { setPage("people"); window.scrollTo({ top: 0 }); }}
                      className="relative flex-shrink-0 w-[220px] rounded-3xl overflow-hidden text-left"
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
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => openWhatsApp()}
              style={{ fontFamily: S }}
              className="bg-white text-[#191713] rounded-full px-6 py-3 text-sm font-bold hover:bg-[#F5F2EC] transition-colors"
            >
              {t("startPlanning", language)}
            </button>
          </div>
        </div>
      </section>

      {/* Find your next trip */}
      <section className="px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <h2 style={{ fontFamily: F }} className="text-3xl md:text-4xl font-bold text-[#191713] text-center mb-6">
            {t("findNextTrip", language)}
          </h2>
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {([
              { key: "top", label: t("filterTopPicks", language) },
              { key: "north", label: t("filterNorth", language) },
              { key: "central", label: t("filterCentral", language) },
              { key: "south", label: t("filterSouth", language) },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setRegionFilter(f.key)}
                style={{ fontFamily: S }}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${regionFilter === f.key ? "bg-[#004226] text-white border-[#004226]" : "bg-white text-[#191713] border-[rgba(25,23,19,0.15)] hover:border-[#004226]/40"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {(regionFilter === "top" ? TRIPS.slice(0, 4) : TRIPS.filter((trip) => trip.zones.includes(regionFilter))).map((trip) => (
              <button
                key={trip.id}
                onClick={() => { setSelectedTripId(trip.id); setPage("trip"); window.scrollTo({ top: 0 }); }}
                className="text-left group"
              >
                <div className="rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: "4/3" }}>
                  <img src={trip.photo} alt={trip.region} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p style={{ fontFamily: F }} className="font-bold text-[#191713] mb-0.5">{trip.region}</p>
                <p style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{trip.tagline}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-16 py-20 md:py-28 bg-[#FAF9F7]">
        <div className="max-w-[1440px] mx-auto">
          <h2 style={{ fontFamily: F }} className="text-3xl md:text-4xl font-bold text-[#191713] text-center mb-2">
            {t("howPlanningWorks", language)}
          </h2>
          <p style={{ fontFamily: S }} className="text-sm text-[#6B6457] text-center mb-12">{t("fourSteps", language)}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: t("step1Title", language), body: t("step1Body", language) },
              { title: t("step2Title", language), body: t("step2Body", language) },
              { title: t("step3Title", language), body: t("step3Body", language) },
              { title: t("step4Title", language), body: t("step4Body", language) },
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
                {t("aiComingDecember", language)}
              </span>
              <h2 style={{ fontFamily: F }} className="text-2xl md:text-[32px] font-bold text-white leading-snug mb-2">
                {t("aiHeadline", language)}
              </h2>
              <p style={{ fontFamily: S }} className="text-[15px] text-[rgba(245,242,236,0.75)] max-w-xl">
                {t("aiBody", language)}
              </p>
            </div>
            <button
              onClick={() => openWhatsApp()}
              style={{ fontFamily: S }}
              className="bg-white text-[#191713] rounded-full px-6 py-3 text-sm font-bold hover:bg-[#F5F2EC] transition-colors flex-shrink-0"
            >
              {t("getNotified", language)}
            </button>
          </div>
        </div>
      </section>

      {/* Why $199 */}
      <section id="why-price" className="bg-[#004226] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <h2 style={{ fontFamily: F }} className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
            {t("whyHeadline", language)}
          </h2>
          <p style={{ fontFamily: S }} className="text-[15px] text-[rgba(245,242,236,0.7)] text-center max-w-xl mx-auto mb-12">
            {t("whyBody", language)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <p style={{ fontFamily: S }} className="text-[11px] uppercase tracking-wider text-[rgba(245,242,236,0.5)] font-semibold mb-3">{t("typicalAgency", language)}</p>
              <p style={{ fontFamily: F }} className="text-2xl font-bold text-white mb-4">{t("oneBundledPrice", language)}</p>
              <ul className="space-y-2.5">
                {[t("agencyBullet1", language), t("agencyBullet2", language), t("agencyBullet3", language)].map((item) => (
                  <li key={item} style={{ fontFamily: S }} className="text-[13px] text-[rgba(245,242,236,0.65)] flex items-start gap-2.5">
                    <span className="w-3 h-px bg-white/30 flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-7">
              <p style={{ fontFamily: S }} className="text-[11px] uppercase tracking-wider text-[#004226] font-semibold mb-3">{t("vhBrandName", language)}</p>
              <p style={{ fontFamily: F }} className="text-2xl font-bold text-[#191713] mb-4">{formatPrice(PLANNING_FEE, currency)} {t("planningFeeFlat", language)}</p>
              <ul className="space-y-2.5">
                {[t("vhBullet1", language), t("vhBullet2", language), t("vhBullet3", language)].map((item) => (
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
    <div className="pt-[76px]">
      <div className="bg-[#004226] px-6 md:px-16 py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto">
          <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.2em] text-[rgba(245,242,236,0.45)] mb-4">Our people</p>
          <h1 style={{ fontFamily: F }} className="text-[clamp(32px,4.5vw,56px)] font-bold text-[#F5F2EC] max-w-2xl">
            Vetted by a person, not an algorithm.
          </h1>
          <p style={{ fontFamily: S }} className="text-sm italic text-[rgba(245,242,236,0.7)] mt-4">
            In Vietnamese Hangout, you can trust.
          </p>
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

function TripDetailPage({ tripId, setSelectedTripId, currency, language }: { tripId: string; setSelectedTripId: (id: string) => void; currency: "VND" | "USD"; language: typeof LANGUAGES[0] }) {
  const trip = TRIPS.find((t) => t.id === tripId) ?? TRIPS[0];
  const [groupSize, setGroupSize] = useState(2);
  const [activeDay, setActiveDay] = useState(0);
  const otherTrips = TRIPS.filter((t) => t.id !== trip.id);
  const tripKey = trip.id.replace(/-/g, "_");
  const localizedTagline = t(`tagline_${tripKey}`, language);
  const localizedDescription = t(`desc_${tripKey}`, language);
  const daysCountText = ({
    EN: `${trip.itinerary.length} days · tap a day to see the plan.`,
    ES: `${trip.itinerary.length} días · toca un día para ver el plan.`,
    ZH: `共${trip.itinerary.length}天 · 点击查看每日安排。`,
    KO: `총 ${trip.itinerary.length}일 · 날짜를 눌러 일정을 확인하세요.`,
  } as Record<string, string>)[language.code] || `${trip.itinerary.length} days · tap a day to see the plan.`;

  useEffect(() => {
    setActiveDay(0);
  }, [tripId]);

  return (
    <div className="pt-[76px] bg-[#F5F2EC]">
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
                <Instagram size={14} />{t("tdReviews", language)}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button style={{ fontFamily: S }} className="flex items-center gap-2 text-sm text-[#191713] border border-[rgba(25,23,19,0.15)] rounded-full px-4 py-2 hover:bg-white transition-colors">
              {t("tdShare", language)}
            </button>
            <button style={{ fontFamily: S }} className="flex items-center gap-2 text-sm text-[#191713] border border-[rgba(25,23,19,0.15)] rounded-full px-4 py-2 hover:bg-white transition-colors">
              {t("tdSave", language)}
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
              {t("tdLastVetted", language)} {trip.vettedDate}
            </p>
            <h2 style={{ fontFamily: F }} className="text-xl font-semibold text-[#191713] leading-snug mb-3">
              {localizedTagline}
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 py-4 my-1 border-y border-[rgba(25,23,19,0.1)]">
              <VetterChip vetter={trip.vetter} small />
              <span style={{ fontFamily: S }} className="text-xs text-[#6B6457] flex items-center gap-1.5"><Clock size={13} />{trip.duration}</span>
              <span style={{ fontFamily: S }} className="text-xs text-[#6B6457] flex items-center gap-1.5"><MapPin size={13} />{trip.region}</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <label style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{t("tdTravellers", language)}</label>
              <button onClick={() => setGroupSize((g) => Math.max(1, g - 1))} className="w-7 h-7 rounded-full border border-[rgba(25,23,19,0.2)] flex items-center justify-center text-[#191713] hover:bg-[#F5F2EC]">−</button>
              <span style={{ fontFamily: F }} className="text-base font-semibold text-[#191713] w-5 text-center tabular-nums">{groupSize}</span>
              <button onClick={() => setGroupSize((g) => Math.min(12, g + 1))} className="w-7 h-7 rounded-full border border-[rgba(25,23,19,0.2)] flex items-center justify-center text-[#191713] hover:bg-[#F5F2EC]">+</button>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{t("tdTripCost", language)} ({groupSize} {groupSize === 1 ? t("tdTraveller", language) : t("tdTravellersPlural", language)})</span>
                <span style={{ fontFamily: F }} className="text-sm font-medium text-[#191713]">{formatPrice(trip.priceFrom * groupSize, currency)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{t("tdPlanningFee", language)}</span>
                <span style={{ fontFamily: F }} className="text-sm font-medium text-[#191713]">{formatPrice(PLANNING_FEE, currency)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[rgba(25,23,19,0.1)]">
              <div>
                <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-wider text-[#6B6457]">{t("tdFrom", language)}</p>
                <p><span style={{ fontFamily: F }} className="text-2xl font-bold text-[#191713]">{formatPrice(trip.priceFrom, currency)}</span> <span style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{t("tdPerPerson", language)}</span></p>
              </div>
              <button
                onClick={() => openWhatsApp()}
                style={{ fontFamily: S }}
                className="bg-[#004226] text-white rounded-full px-6 py-3 text-[15px] font-bold hover:bg-[#00331E] transition-colors"
              >
                {t("tdBookingNow", language)}
              </button>
            </div>
            <p style={{ fontFamily: S }} className="text-[10px] text-[#6B6457] mt-3">
              {t("tdPaymentNote", language)}
            </p>
          </div>

          <div>
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-4">{t("tdDescriptionLabel", language)}</p>
            <p style={{ fontFamily: S }} className="text-[15px] text-[#191713] leading-[1.8] mb-12">
              {localizedDescription}
            </p>

            {/* Itinerary — sits alongside the quick facts card, in the same column */}
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-2">{t("tdTravelPlansLabel", language)}</p>
            <h2 style={{ fontFamily: F }} className="text-3xl font-bold text-[#191713] mb-1">{t("tdYourItinerary", language)}</h2>
            <p style={{ fontFamily: S }} className="text-sm text-[#6B6457] mb-8">{daysCountText}</p>

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
                          alt={tr(item.location, language)}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p style={{ fontFamily: S }} className="text-[11px] text-[#6B6457] flex items-center gap-1 mb-1">
                            <MapPin size={11} className="flex-shrink-0" /> {formatDayLabel(item.day, language)} &middot; {tr(item.location, language)}
                          </p>
                          <p style={{ fontFamily: F }} className="text-[15px] font-semibold text-[#191713] leading-snug truncate">
                            {tr(item.title, language)}
                          </p>
                        </div>
                        {open
                          ? <ChevronUp size={16} className="flex-shrink-0 text-[#6B6457]" />
                          : <ChevronDown size={16} className="flex-shrink-0 text-[#6B6457]" />}
                      </button>

                      {open && (
                        <p style={{ fontFamily: S }} className="text-[14px] text-[#6B6457] leading-relaxed mt-4 px-1">
                          {tr(item.note, language)}
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
            <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-2">{t("tdWhatsIncludedLabel", language)}</p>
            <h2 style={{ fontFamily: F }} className="text-3xl font-bold text-[#191713] mb-8">{t("tdWhatsCovered", language)}</h2>
            <div>
              {trip.included.map((item) => (
                <Accordion key={item.label.EN} question={tr(item.label, language)} answer={tr(item.detail, language)} />
              ))}
              <p style={{ fontFamily: S }} className="text-[12px] text-[#6B6457] mt-4">
                {tr(trip.notIncluded, language)}
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
          <h2 style={{ fontFamily: F }} className="text-3xl font-bold text-[#191713] mb-1">{t("tdExploreMore", language)}</h2>
          <p style={{ fontFamily: S }} className="text-sm text-[#6B6457] mb-8">{t("tdExploreMoreSub", language)}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherTrips.map((trip) => (
              <button key={trip.id} onClick={() => { setSelectedTripId(trip.id); window.scrollTo({ top: 0 }); }} className="text-left group">
                <div className="rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: "4/3" }}>
                  <img src={trip.photo} alt={trip.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <p style={{ fontFamily: F }} className="text-base font-semibold text-[#191713] mb-1">{trip.name}</p>
                <p style={{ fontFamily: S }} className="text-xs text-[#6B6457]">{trip.region} &middot; {trip.duration}</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.18em] text-[#6B6457] mb-6">
            {t("tdFrequentlyAsked", language)}
          </p>
          {FAQS.map((f) => <Accordion key={f.question.EN} question={tr(f.question, language)} answer={tr(f.answer, language)} />)}
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
              {t("tdClosingHeadline", language)}
            </h2>
            <p style={{ fontFamily: S }} className="text-sm text-[rgba(255,255,255,0.8)] mb-6 max-w-md">
              {t("tdClosingSub", language)}
            </p>
            <button
              onClick={() => openWhatsApp()}
              style={{ fontFamily: S }}
              className="bg-white text-[#191713] rounded-full px-6 py-3 text-[15px] font-bold hover:bg-[#F5F2EC] transition-colors inline-flex items-center gap-2"
            >
              {t("tdGetStarted", language)} <ArrowRight size={14} />
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
    <div className="pt-[76px]">
      {/* Header */}
      <div className="bg-[#004226] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <p style={{ fontFamily: S }} className="text-[10px] uppercase tracking-[0.2em] text-[rgba(245,242,236,0.4)] mb-6">Our standard</p>
          <h1 style={{ fontFamily: F, lineHeight: 1.08 }} className="text-[clamp(40px,6vw,80px)] font-bold text-[#F5F2EC] max-w-3xl tracking-[-0.02em]">
            How we vet<br />every place<br />on this site.
          </h1>
          <p style={{ fontFamily: S }} className="text-sm italic text-[rgba(245,242,236,0.7)] mt-6">
            In Vietnamese Hangout, you can trust.
          </p>
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
  const [language, setLanguageState] = useState(() => getLanguageFromPath(window.location.pathname));
  const [currency, setCurrency] = useState<"VND" | "USD">("USD");

  const setLanguage = (lang: typeof LANGUAGES[0]) => {
    setLanguageState(lang);
    const prefix = LANG_URL_PREFIX[lang.code];
    const newPath = prefix ? `/${prefix}` : "/";
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, "", newPath);
    }
  };

  useEffect(() => {
    const onPopState = () => setLanguageState(getLanguageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language.code.toLowerCase();

    const title = t("seoTitle", language);
    const description = t("seoDescription", language);
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);

    const prefix = LANG_URL_PREFIX[language.code];
    const canonicalUrl = `https://vietnamesehangout.com${prefix ? `/${prefix}` : "/"}`;
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
  }, [language]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  return (
    <div className="bg-[#F5F2EC] min-h-screen">
      <Toaster position="top-center" richColors />
      <Nav setPage={setPage} language={language} setLanguage={setLanguage} currency={currency} setCurrency={setCurrency} />

      <main>
        {page === "home" && <HomePage setPage={setPage} setSelectedTripId={setSelectedTripId} language={language} currency={currency} />}
        {page === "trip" && <TripDetailPage tripId={selectedTripId} setSelectedTripId={setSelectedTripId} currency={currency} language={language} />}
        {page === "vetting" && <VettingPage />}
        {page === "people" && <OurPeoplePage />}
      </main>

      <Footer setPage={setPage} language={language} />
    </div>
  );
}
