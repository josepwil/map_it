class AddUserIdToMaps < ActiveRecord::Migration[6.1]
  def change
    add_reference :maps, :user, index: true
    add_foreign_key :maps, :users
  end
end
