class CreateSales < ActiveRecord::Migration[6.0]
  def change
    create_table :sales do |t|
      t.foreign_key :user_id
      t.foreign_key :client_id
      t.foreign_key :vehicle_id

      t.timestamps
    end
  end
end
