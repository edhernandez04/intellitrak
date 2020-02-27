class CreateSales < ActiveRecord::Migration[6.0]
  def change
    create_table :sales do |t|
      t.integer :user_id
      t.integer :client_id
      t.integer :vehicle_id

      t.timestamps
    end
  end
end
