class CreateLeads < ActiveRecord::Migration[6.0]
  def change
    create_table :leads do |t|
      t.foreign_key :client_id
      t.foreign_key :user_id
      t.string :note
      t.boolean :closed

      t.timestamps
    end
  end
end
