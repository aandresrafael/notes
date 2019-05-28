require 'rails_helper'

RSpec.describe FileNodesController, type: :controller do

  let(:parent1) { FileNode.create! name: 'folderA', file_node_type: 'folder' }
  let(:parent2) { FileNode.create! name: 'folderB', file_node_type: 'folder'}

  before do
    create_notes(15, parent1)
  end

  describe '#search' do
    it 'should search' do
      expect(FileNode.count).to eq(166)
      post :search, params: { query: 'folder-1' }
      expect(response.status).to eq(200)
      parsed_body = JSON.parse(response.body)

      expect(parsed_body['tree'].size).to eq(1)
    end
  end


  def create_notes(deep, parent)
    return if deep.zero?
    new_parent = FileNode.create! name: "folder-#{deep}", file_node_type: 'folder', parent: parent
    1.upto(10) do |note_number|
      FileNode.create! name: "note-#{deep}-#{note_number}", file_node_type: 'file', parent: new_parent
    end

    create_notes(deep-1, new_parent)
  end

end
