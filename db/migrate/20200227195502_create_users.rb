class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :total_sales
      t.integer :cars_sold
      t.string :team_name
      t.string :position

      t.timestamps
    end
  end
end
