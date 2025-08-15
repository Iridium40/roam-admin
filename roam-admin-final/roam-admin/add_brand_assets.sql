-- Add favicon URL to system config
INSERT INTO system_config (config_key, config_value, description, data_type, is_public, config_group, is_encrypted, created_at, updated_at)
VALUES (
  'site_favicon',
  'https://vssomyuyhicaxsgiaupo.supabase.co/storage/v1/object/public/roam-file-storage/system-settings/favicon-1755179083541.png',
  'Site favicon URL',
  'url',
  true,
  'Brand',
  false,
  NOW(),
  NOW()
) ON CONFLICT (config_key) DO UPDATE SET
  config_value = EXCLUDED.config_value,
  updated_at = NOW();

-- Add logo URL to system config
INSERT INTO system_config (config_key, config_value, description, data_type, is_public, config_group, is_encrypted, created_at, updated_at)
VALUES (
  'site_logo',
  'https://vssomyuyhicaxsgiaupo.supabase.co/storage/v1/object/public/roam-file-storage/system-settings/roam_logo-1755179170027.png',
  'Site logo URL',
  'url',
  true,
  'Brand',
  false,
  NOW(),
  NOW()
) ON CONFLICT (config_key) DO UPDATE SET
  config_value = EXCLUDED.config_value,
  updated_at = NOW();
