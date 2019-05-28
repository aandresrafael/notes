class CreateFileNodes < ActiveRecord::Migration[5.1]
  def change
    create_table :file_nodes do |t|
      t.string :name
      t.string :file_node_type
      t.timestamps
    end
  end
end
