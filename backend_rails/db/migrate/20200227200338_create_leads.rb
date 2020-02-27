class CreateLeads < ActiveRecord::Migration[6.0]
  def change
    create_table :leads do |t|
      t.integer :client_id
      t.integer :user_id
      t.string :note
      t.boolean :closed

      t.timestamps
    end
  end
end
