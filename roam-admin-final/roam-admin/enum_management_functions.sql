-- Functions to manage enum types for categories and subcategories
-- This should be run in Supabase SQL Editor

-- Function to add new category types to the enum
CREATE OR REPLACE FUNCTION add_category_type(new_type text)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the value already exists in the enum
    IF NOT EXISTS (
        SELECT 1 
        FROM unnest(enum_range(NULL::service_category_types)) 
        WHERE unnest::text = new_type
    ) THEN
        -- Add the new value to the enum
        EXECUTE format('ALTER TYPE service_category_types ADD VALUE %L', new_type);
        RAISE NOTICE 'Added new category type: %', new_type;
    ELSE
        RAISE NOTICE 'Category type already exists: %', new_type;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- If there's an error (like the value already exists), just return without error
        -- This makes the function idempotent
        RAISE NOTICE 'Exception while adding category type %: %', new_type, SQLERRM;
        RETURN;
END;
$$;

-- Function to add new subcategory types to the enum
CREATE OR REPLACE FUNCTION add_subcategory_type(new_type text)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the value already exists in the enum
    IF NOT EXISTS (
        SELECT 1 
        FROM unnest(enum_range(NULL::service_subcategory_types)) 
        WHERE unnest::text = new_type
    ) THEN
        -- Add the new value to the enum
        EXECUTE format('ALTER TYPE service_subcategory_types ADD VALUE %L', new_type);
        RAISE NOTICE 'Added new subcategory type: %', new_type;
    ELSE
        RAISE NOTICE 'Subcategory type already exists: %', new_type;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- If there's an error (like the value already exists), just return without error
        -- This makes the function idempotent
        RAISE NOTICE 'Exception while adding subcategory type %: %', new_type, SQLERRM;
        RETURN;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION add_category_type(text) TO authenticated;
GRANT EXECUTE ON FUNCTION add_subcategory_type(text) TO authenticated;

-- Optional: Create a function to list all current enum values
CREATE OR REPLACE FUNCTION get_category_types()
RETURNS text[]
LANGUAGE sql
AS $$
    SELECT array_agg(unnest::text ORDER BY unnest::text) 
    FROM unnest(enum_range(NULL::service_category_types));
$$;

CREATE OR REPLACE FUNCTION get_subcategory_types()
RETURNS text[]
LANGUAGE sql
AS $$
    SELECT array_agg(unnest::text ORDER BY unnest::text) 
    FROM unnest(enum_range(NULL::service_subcategory_types));
$$;

-- Grant execute permissions for the getter functions
GRANT EXECUTE ON FUNCTION get_category_types() TO authenticated;
GRANT EXECUTE ON FUNCTION get_subcategory_types() TO authenticated;
