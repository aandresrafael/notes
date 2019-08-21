require 'rails_helper'

RSpec.describe FileNode, type: :model do

  let(:parent1) { create(:file_node) }
  let(:parent2) { create(:file_node, name: 'folderB') }

  before do
    create_notes(15, parent1)
  end

  describe '#search' do
    it 'should search' do
      expect(FileNode.count).to eq(166)
      file_node = FileNode.where('lower(name) = ?', 'folder-1').first

      expect(file_node.name).to eq('folder-1')
      expect(file_node.file_node_type).to eq('folder')
    end
  end

  describe '#json_tree' do
    it 'should render correct json data' do
      file_node = FileNode.where('lower(name) = ?', 'folder-1').first
      json_tree = FileNode.json_tree(file_node.subtree.arrange).first

      expect(json_tree[:name]).to eq('folder-1')
      expect(json_tree[:type]).to eq('folder')
      expect(json_tree[:children].size).to eq(10)
    end
  end

end


