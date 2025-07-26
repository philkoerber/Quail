-- Create the database user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'quail_user') THEN
        CREATE USER quail_user WITH PASSWORD 'quail_password';
    END IF;
END
$$;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE quail_db TO quail_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO quail_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO quail_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO quail_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO quail_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO quail_user; 