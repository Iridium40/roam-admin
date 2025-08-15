import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    const [fields, files] = await form.parse(req);
    
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const providerId = Array.isArray(fields.providerId) ? fields.providerId[0] : fields.providerId;
    const documentType = Array.isArray(fields.documentType) ? fields.documentType[0] : fields.documentType;

    if (!file || !providerId || !documentType) {
      return res.status(400).json({ 
        error: 'File, provider ID, and document type are required' 
      });
    }

    // Read file content
    const fileContent = fs.readFileSync(file.filepath);
    const fileName = `${providerId}/${documentType}/${Date.now()}_${file.originalFilename}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('provider-documents')
      .upload(fileName, fileContent, {
        contentType: file.mimetype || 'application/octet-stream',
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return res.status(500).json({ 
        error: 'Failed to upload file',
        details: uploadError.message
      });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('provider-documents')
      .getPublicUrl(fileName);

    return res.status(200).json({
      success: true,
      fileName: fileName,
      publicUrl: urlData.publicUrl,
      uploadPath: uploadData.path,
    });

  } catch (error) {
    console.error('Error processing upload:', error);
    return res.status(500).json({ 
      error: 'Failed to process upload',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
