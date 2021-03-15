class CreateMaps < ActiveRecord::Migration[6.1]
  def change
    create_table :maps do |t|
      t.string :title
      t.string :center

      t.timestamps
    end
  end
end
