import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// In-memory + persistent fallback lead storage
interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  amount?: string;
  city?: string;
  notes?: string;
  createdAt: string;
  source?: string;
}

const LEADS_FILE = path.join(__dirname, 'data', 'leads.json');

function ensureDataDirectory() {
  const dir = path.join(__dirname, 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadLeads(): Lead[] {
  try {
    ensureDataDirectory();
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading leads file:', err);
  }
  return [];
}

function saveLeads(leads: Lead[]) {
  try {
    ensureDataDirectory();
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving leads file:', err);
  }
}

const memoryLeads: Lead[] = loadLeads();

// Duplicate submission tracking (prevents spam clicking within 30 seconds)
const recentSubmissions = new Map<string, number>();

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Phoenix Financial Services Lead Management API',
    timestamp: new Date().toISOString(),
    configuredConnectors: {
      supabase: Boolean(process.env.SUPABASE_URL),
      firebase: Boolean(process.env.FIREBASE_PROJECT_ID),
      webhookCrm: Boolean(process.env.CRM_WEBHOOK_URL),
      googleSheets: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL)
    }
  });
});

// API endpoint for lead submission
app.post('/api/leads', (req: Request, res: Response): any => {
  const { name, phone, email, service, amount, city, notes, source } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid full name (minimum 2 characters).'
    });
  }

  // Clean phone number (remove spaces, hyphens, +91)
  const cleanPhone = (phone || '').replace(/[\s\-\(\)\+]/g, '').replace(/^91/, '');
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!cleanPhone || !indianPhoneRegex.test(cleanPhone)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid 10-digit Indian mobile number.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.'
    });
  }

  // Duplicate prevention check (same phone within 30 seconds)
  const now = Date.now();
  const lastTime = recentSubmissions.get(cleanPhone);
  if (lastTime && now - lastTime < 30000) {
    return res.status(429).json({
      success: false,
      error: 'We have already received your submission. A financial advisor will connect with you shortly.'
    });
  }
  recentSubmissions.set(cleanPhone, now);

  const newLead: Lead = {
    id: `PHX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: name.trim(),
    phone: cleanPhone,
    email: email.trim().toLowerCase(),
    service: service || 'General Financial Enquiry',
    amount: amount ? String(amount).trim() : undefined,
    city: city ? String(city).trim() : undefined,
    notes: notes ? String(notes).trim() : undefined,
    source: source || 'Website',
    createdAt: new Date().toISOString()
  };

  memoryLeads.unshift(newLead);
  saveLeads(memoryLeads);

  // Modular Webhook / CRM Forwarder Hook (Ready for Supabase/Firebase/CRM)
  const crmWebhookUrl = process.env.CRM_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (crmWebhookUrl) {
    fetch(crmWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    }).catch(err => console.error('Failed to dispatch webhook lead:', err));
  }

  return res.status(201).json({
    success: true,
    message: 'Thank you! Our team will contact you shortly.',
    leadId: newLead.id
  });
});

// GET /api/leads (Retrieve recent leads)
app.get('/api/leads', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: memoryLeads.length,
    leads: memoryLeads.slice(0, 50)
  });
});

// Setup Vite middleware in dev or serve static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Phoenix Financial Services server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
