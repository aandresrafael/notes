class AddAncestryToFileNodes < ActiveRecord::Migration[5.1]
  def change
    add_column :file_nodes, :ancestry, :string
    add_index :file_nodes, :ancestry
  end
end
