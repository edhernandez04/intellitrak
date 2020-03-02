# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_27_200338) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.string "fullname"
    t.string "phone_number"
    t.string "email"
    t.string "address"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "leads", force: :cascade do |t|
    t.integer "client_id"
    t.integer "user_id"
    t.string "note"
    t.boolean "closed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "sales", force: :cascade do |t|
    t.integer "user_id"
    t.integer "client_id"
    t.integer "vehicle_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.integer "total_sales"
    t.integer "cars_sold"
    t.string "team_name"
    t.string "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "vehicles", force: :cascade do |t|
    t.integer "year"
    t.string "make"
    t.string "model"
    t.string "trim"
    t.string "vin"
    t.integer "mileage"
    t.string "color"
    t.date "purchase_date"
    t.integer "purchase_price"
    t.string "description"
    t.integer "buyer_id"
    t.boolean "sold"
    t.integer "sale_price"
    t.string "img_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
