-- Baseline reference data for a fresh neartar_app_db.
-- Applied manually (psql -f database/seed.sql) or via a seed script, after `alembic upgrade head`.

INSERT INTO roles (name) VALUES ('user'), ('business_owner'), ('admin')
ON CONFLICT (name) DO NOTHING;

INSERT INTO categories (name, slug, icon, is_active) VALUES
    ('Bike Dealers', 'bike-dealers', 'FaMotorcycle', true),
    ('Car Dealers', 'car-dealers', 'FaCarSide', true),
    ('Grocery', 'grocery', 'FaShoppingCart', true),
    ('Electronics', 'electronics', 'FaLaptop', true),
    ('Real Estate', 'real-estate', 'FaHome', true),
    ('Restaurants', 'restaurants', 'FaUtensils', true),
    ('Plumbing', 'plumbing', 'FaWrench', true),
    ('Electrician', 'electrician', 'FaBolt', true)
ON CONFLICT (slug) DO NOTHING;
