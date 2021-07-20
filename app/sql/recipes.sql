CREATE TABLE IF NOT EXISTS RECIPES (
    recipe_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_name VARCHAR(255) NOT NULL,
    recipe_description VARCHAR(255) NOT NULL,
    recipe_ingredients JSON NOT NULL,
    recipe_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    recipe_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    recipe_user_id UUID NOT NULL,
    FOREIGN KEY (recipe_user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);