import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { keys } = req.query;

    let query = supabase
      .from("system_config")
      .select("config_key, config_value")
      .eq("is_public", true);

    // Filter by specific keys if provided
    if (keys && typeof keys === "string") {
      const keyArray = keys.split(",").map((k) => k.trim());
      query = query.in("config_key", keyArray);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching system config:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch system configuration" });
    }

    res.json(data || []);
  } catch (error) {
    console.error("System config API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
