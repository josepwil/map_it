class CreateMarkers < ActiveRecord::Migration[6.1]
  def change
    create_table :markers do |t|
      t.references :map, null: false, foreign_key: true
      t.string :coords
      t.string :popup

      t.timestamps
    end
  end
end
