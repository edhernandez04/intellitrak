class CreateClients < ActiveRecord::Migration[6.0]
  def change
    create_table :clients do |t|
      t.string :fullname
      t.string :phone_number
      t.string :email
      t.string :address

      t.timestamps
    end
  end
end
