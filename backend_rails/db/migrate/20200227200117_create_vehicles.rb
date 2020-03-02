class CreateVehicles < ActiveRecord::Migration[6.0]
  def change
    create_table :vehicles do |t|
      t.integer :year
      t.string :make
      t.string :model
      t.string :trim
      t.string :vin
      t.integer :mileage
      t.string :color
      t.date :purchase_date
      t.integer :purchase_price
      t.string :description
      t.integer :buyer_id
      t.boolean :sold
      t.integer :sale_price
      t.string :img_url

      t.timestamps
    end
  end
end
