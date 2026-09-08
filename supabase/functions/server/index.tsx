import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// ---------- SEED INITIAL DATA ----------
const SEED_KEY = "kv_seeded_v3";
async function seedInitialData() {
  const alreadySeeded = await kv.get(SEED_KEY);
  if (alreadySeeded) return;

  const initialPosts = [
    {
      id: "seed-001",
      title: "Hidden coffee roastery in Da Lat 🌿",
      location: "Da Lat, Lam Dong",
      content:
        "Found this incredible family-run coffee roastery tucked in a pine forest. Mr. Duc has been roasting Arabica beans from their own farm since 1987. The egg coffee here is absolutely transcendent — creamy, smoky, and unlike anything in the city. Only 15 tables, cash only. A true hidden gem!",
      rating: 4.9,
      cost: "50,000 VND",
      category: "Food",
      imageUrl:
        "https://images.unsplash.com/photo-1762390201500-88b79a867ea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      userId: "seed-user-1",
      userName: "Linh Nguyen",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linh",
      likes: 247,
      likedBy: [],
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    },
    {
      id: "seed-002",
      title: "Sunrise at Mu Cang Chai rice terraces ✨",
      location: "Mu Cang Chai, Yen Bai",
      content:
        "Woke up at 4:30am to catch the sunrise over the terraces. Absolutely worth it. The golden light hitting the water-filled fields in September is something you have to see in person. Stayed with a local H'Mong family for 200k/night including dinner. They taught us how to harvest rice the traditional way.",
      rating: 5.0,
      cost: "200,000 VND/night",
      category: "Nature",
      imageUrl:
        "https://images.unsplash.com/photo-1697015556006-9e767c7187dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      userId: "seed-user-2",
      userName: "Tom Erikson",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
      likes: 389,
      likedBy: [],
      createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    },
    {
      id: "seed-003",
      title: "Best Bún Bò Huế I've ever had 🍜",
      location: "Hue, Thua Thien-Hue",
      content:
        "An 80-year-old grandmother runs this tiny shop from her living room near Dong Ba market. No sign outside, you just have to know. The broth has been simmering for 12 hours with lemongrass, shrimp paste, and chili. Line starts forming at 6am and she usually sells out by 9am. Pure magic.",
      rating: 4.8,
      cost: "35,000 VND",
      category: "Food",
      imageUrl:
        "https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      userId: "seed-user-3",
      userName: "Mai Phuong",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai",
      likes: 156,
      likedBy: [],
      createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    },
    {
      id: "seed-004",
      title: "Lantern boat ride in Hoi An — skip the tourist traps",
      location: "Hoi An, Quang Nam",
      content:
        "Instead of the crowded Hoai River tours, ask locals about the Thu Bon river at dusk. A fisherman named Anh Van takes small groups for 80k/person. His family has been fishing here for generations. The silence, the floating lanterns, the stars — completely different from the noisy tourist version.",
      rating: 4.9,
      cost: "80,000 VND",
      category: "Culture",
      imageUrl:
        "https://images.unsplash.com/photo-1694925232363-ebd99f29cc19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      userId: "seed-user-4",
      userName: "Sophie Martin",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      likes: 312,
      likedBy: [],
      createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    },
    {
      id: "seed-005",
      title: "Motorbike through the Ha Giang Loop 🏍️",
      location: "Ha Giang Province",
      content:
        "Four days through the most spectacular roads I've ever ridden. The Ma Pi Leng Pass overlooks a 1,600m deep canyon — absolutely terrifying and beautiful. Rented a semi-automatic Honda from a local hostel for 150k/day. Stayed in H'Mong homestays each night. Vietnam at its most raw and authentic.",
      rating: 5.0,
      cost: "150,000 VND/day",
      category: "Adventure",
      imageUrl:
        "https://images.unsplash.com/photo-1625794182920-440d719c2606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      userId: "seed-user-5",
      userName: "Minh Tran",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
      likes: 521,
      likedBy: [],
      createdAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
    },
    {
      id: "seed-006",
      title: "Secret waterfall near Sapa — locals only",
      location: "Sapa, Lao Cai",
      content:
        "Off the tourist trail, 4km hike through terraced fields. A local Red Dao guide showed us this waterfall that doesn't appear on any app. The pool at the base is crystal clear, perfect temperature. Brings lunch (bánh mì from the village market) and swimming clothes. Absolutely no tourists!",
      rating: 4.7,
      cost: "Free (guide tip: 100,000 VND)",
      category: "Hidden Gem",
      imageUrl:
        "https://images.unsplash.com/photo-1565834009162-792910c3b46a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      userId: "seed-user-6",
      userName: "Anna Kowalski",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
      likes: 198,
      likedBy: [],
      createdAt: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
    },
  ];

  for (const post of initialPosts) {
    await kv.set(`kv_post:${post.id}`, post);
  }
  await kv.set(SEED_KEY, true);
  console.log("✅ Initial data seeded successfully");
}

seedInitialData().catch(console.error);

// ---------- HEALTH ----------
app.get("/make-server-5aabed8c/health", (c) => {
  return c.json({ status: "ok" });
});

// ---------- AUTH ----------
app.post("/make-server-5aabed8c/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields: email, password, name" }, 400);
    }
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });
    if (error) {
      console.log("Signup error:", error.message);
      return c.json({ error: `Sign up failed: ${error.message}` }, 400);
    }
    return c.json({ user: data.user });
  } catch (e) {
    console.log("Signup exception:", e);
    return c.json({ error: `Sign up exception: ${e}` }, 500);
  }
});

// ---------- POSTS ----------
app.get("/make-server-5aabed8c/posts", async (c) => {
  try {
    const posts = await kv.getByPrefix("kv_post:");
    const sorted = posts
      .filter(Boolean)
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    return c.json({ posts: sorted });
  } catch (e) {
    console.log("Fetch posts error:", e);
    return c.json({ error: `Error fetching posts: ${e}` }, 500);
  }
});

app.post("/make-server-5aabed8c/posts", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: "Unauthorized: invalid or missing token" }, 401);
    }
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const post = {
      id,
      ...body,
      userId: user.id,
      userName: user.user_metadata?.name || user.email,
      userAvatar:
        user.user_metadata?.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
    };
    await kv.set(`kv_post:${id}`, post);
    return c.json({ post });
  } catch (e) {
    console.log("Create post error:", e);
    return c.json({ error: `Error creating post: ${e}` }, 500);
  }
});

app.post("/make-server-5aabed8c/posts/:id/like", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const id = c.req.param("id");
    const post = await kv.get(`kv_post:${id}`);
    if (!post) return c.json({ error: "Post not found" }, 404);

    const likedBy: string[] = post.likedBy || [];
    const hasLiked = likedBy.includes(user.id);
    const updatedPost = {
      ...post,
      likes: hasLiked ? post.likes - 1 : post.likes + 1,
      likedBy: hasLiked
        ? likedBy.filter((uid: string) => uid !== user.id)
        : [...likedBy, user.id],
    };
    await kv.set(`kv_post:${id}`, updatedPost);
    return c.json({ post: updatedPost });
  } catch (e) {
    console.log("Like post error:", e);
    return c.json({ error: `Error liking post: ${e}` }, 500);
  }
});

// ---------- COMMENTS ----------
app.get("/make-server-5aabed8c/posts/:id/comments", async (c) => {
  try {
    const postId = c.req.param("id");
    const comments = await kv.getByPrefix(`kv_comment:${postId}:`);
    const sorted = comments
      .filter(Boolean)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    return c.json({ comments: sorted });
  } catch (e) {
    console.log("Fetch comments error:", e);
    return c.json({ error: `Error fetching comments: ${e}` }, 500);
  }
});

app.post("/make-server-5aabed8c/posts/:id/comments", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const postId = c.req.param("id");
    const { content } = await c.req.json();
    if (!content?.trim()) return c.json({ error: "Comment content required" }, 400);

    const id = crypto.randomUUID();
    const comment = {
      id,
      postId,
      content: content.trim(),
      userId: user.id,
      userName: user.user_metadata?.name || user.email,
      userAvatar:
        user.user_metadata?.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      createdAt: new Date().toISOString(),
    };
    await kv.set(`kv_comment:${postId}:${id}`, comment);
    return c.json({ comment });
  } catch (e) {
    console.log("Add comment error:", e);
    return c.json({ error: `Error adding comment: ${e}` }, 500);
  }
});

Deno.serve(app.fetch);
