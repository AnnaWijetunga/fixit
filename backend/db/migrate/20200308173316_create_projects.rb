class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string "name"
      t.string "condition"
      t.integer "family_id"
      t.index ["family_id"], name: "index_projects_on_family_id"
      t.timestamps
    end
  end
end
