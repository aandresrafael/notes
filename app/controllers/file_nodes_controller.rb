class FileNodesController < ApplicationController
  def index
    render component: 'Main', props: { tree: FileNode.json_tree(init_tree) }
  end

  def create
    file_node = FileNode.new(file_node_params)

    if file_node.save
      render json: { tree: FileNode.json_tree(init_tree) }
    else
      render json: { errors: file_node.errors.full_messages}, status: 400
    end
  end

  def search
    query = params['query']
    file_node= FileNode.where('lower(name) = ?', query.downcase).first
    render json: {
      tree: file_node ? FileNode.json_tree(file_node.subtree.arrange) : []
    }
  end

  private
  def init_tree
    file_nodes_tree = FileNode.arrange
  end

  def file_node_params
    params.require(:file_node).permit(:name, :parent_id, :file_node_type )
  end
end
