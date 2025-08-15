-- Quick fix for the specific enum error
-- This adds the 'injectables' value to the service_subcategory_types enum

-- Add the missing enum value
ALTER TYPE service_subcategory_types ADD VALUE 'injectables';

-- Optional: Verify the enum value was added
SELECT unnest(enum_range(NULL::service_subcategory_types)) as subcategory_types;
