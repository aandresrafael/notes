class FileNode < ApplicationRecord
  validates_uniqueness_of :name
  validates_presence_of :name
  has_ancestry

  def self.json_tree(nodes)
    nodes.map do |node, sub_nodes|
      {
        name: node.name,
        id: node.id,
        parent_id: node.parent_id,
        type: node.file_node_type,
        children: self.json_tree(sub_nodes).compact
      }
    end
  end
end
