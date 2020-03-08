class CreateFamilies < ActiveRecord::Migration[6.0]
  def change
    create_table :families do |t|
      t.string "name"
      t.text "members"
      t.timestamps
    end
  end
end
