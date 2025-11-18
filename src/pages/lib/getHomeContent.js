// src/pages/lib/getHomeContent.js
import { supabase } from "./supabase.js";

// Henter og grupperer alt indhold til forsiden
export async function getHomeContent() {
  const { data, error } = await supabase
    .from("soundwheel_items")
    .select("*")
    .eq("page", "home")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Fejl fra Supabase:", error);
    // Returnér tomme arrays så siden ikke crasher
    return {
      hero: [],
      why: [],
      b2b: [],
      microbreaks: [],
      benefits: [],
    };
  }

  console.log("Home data fra Supabase:", data);

  const hero = data.filter((i) => i.section === "hero");
  const why = data.filter((i) => i.section === "why_soundwheel");
  const b2b = data.filter((i) => i.section === "b2b_intro");
  const microbreaks = data.filter((i) => i.section === "microbreaks");
  const benefits = data.filter((i) => i.section === "benefits");

  return { hero, why, b2b, microbreaks, benefits };
}
